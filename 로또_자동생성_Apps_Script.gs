// ============================================================
//  로또 번호 자동 생성기 - Google Apps Script
//  동행복권 API에서 역대 당첨번호를 가져와 통계 분석 후 예측
// ============================================================

const SHEET_HISTORY   = '당첨번호 데이터';
const SHEET_STATS     = '번호 통계';
const SHEET_PREDICT   = '예측 번호 생성';

// ─────────────────────────────────────────────────────────────
//  메뉴 등록
// ─────────────────────────────────────────────────────────────
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🎱 로또 자동생성기')
    .addItem('① 역대 당첨번호 전체 가져오기',  'fetchAllHistory')
    .addItem('② 통계 분석 시트 업데이트',       'updateStats')
    .addItem('③ 예측 번호 생성 (5세트)',         'generatePredictions')
    .addSeparator()
    .addItem('🔄 전체 자동 실행 (①+②+③)',      'runAll')
    .addToUi();
}

// ─────────────────────────────────────────────────────────────
//  전체 자동 실행
// ─────────────────────────────────────────────────────────────
function runAll() {
  fetchAllHistory();
  updateStats();
  generatePredictions();
  SpreadsheetApp.getUi().alert('✅ 완료! 예측 번호 생성 시트를 확인하세요.');
}

// ─────────────────────────────────────────────────────────────
//  ① 동행복권 API → 역대 당첨번호 시트
// ─────────────────────────────────────────────────────────────
function fetchAllHistory() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  let sheet   = ss.getSheetByName(SHEET_HISTORY);
  if (!sheet) sheet = ss.insertSheet(SHEET_HISTORY);
  sheet.clearContents();

  // 헤더
  const header = ['회차','추첨일','1번','2번','3번','4번','5번','6번','보너스'];
  sheet.getRange(1, 1, 1, header.length).setValues([header]);
  sheet.getRange(1, 1, 1, header.length)
       .setBackground('#1a1a2e').setFontColor('#e8d5b7')
       .setFontWeight('bold').setHorizontalAlignment('center');

  // 최신 회차 번호 먼저 조회
  const latestNo = getLatestRound();
  if (!latestNo) {
    SpreadsheetApp.getUi().alert('최신 회차 조회 실패. 네트워크 연결을 확인하세요.');
    return;
  }

  const rows = [];
  // 한 번에 너무 많으면 느리니 배치(최대 1150회차까지)
  for (let i = 1; i <= latestNo; i++) {
    const data = fetchRound(i);
    if (!data) continue;
    rows.push([
      data.drwNo,
      data.drwNoDate,
      data.drwtNo1,
      data.drwtNo2,
      data.drwtNo3,
      data.drwtNo4,
      data.drwtNo5,
      data.drwtNo6,
      data.bnusNo
    ]);
    // 400개마다 중간 저장 (실행 시간 초과 방지)
    if (rows.length % 400 === 0) {
      const startRow = sheet.getLastRow() + 1;
      sheet.getRange(startRow, 1, rows.length, header.length).setValues(rows);
      rows.length = 0;
      Utilities.sleep(500);
    }
  }
  if (rows.length > 0) {
    const startRow = sheet.getLastRow() + 1;
    sheet.getRange(startRow, 1, rows.length, header.length).setValues(rows);
  }

  // 번호 열 색상 포맷
  applyBallColors(sheet, latestNo + 1);

  // 열 너비 자동 조정
  sheet.autoResizeColumns(1, header.length);

  Logger.log(`✅ ${latestNo}회차 데이터 로드 완료`);
}

// 최신 회차 번호 조회
function getLatestRound() {
  try {
    const url  = 'https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=1';
    const resp = UrlFetchApp.fetch(url, {muteHttpExceptions: true});
    // 최신 회차는 1회차부터 순차 조회가 아닌 별도 방법 필요
    // 현재 날짜 기준 추정 (2002-12-07 이후 매주 토요일)
    const start    = new Date('2002-12-07');
    const now      = new Date();
    const diffWeeks = Math.floor((now - start) / (7 * 24 * 60 * 60 * 1000));
    return Math.min(diffWeeks + 1, 1200); // 안전 상한선
  } catch(e) {
    return 1150; // 기본값
  }
}

// 개별 회차 데이터 조회
function fetchRound(roundNo) {
  try {
    const url  = `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${roundNo}`;
    const resp = UrlFetchApp.fetch(url, {muteHttpExceptions: true});
    const json = JSON.parse(resp.getContentText());
    if (json.returnValue !== 'success') return null;
    return json;
  } catch(e) {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────
//  ② 통계 분석 시트
// ─────────────────────────────────────────────────────────────
function updateStats() {
  const ss      = SpreadsheetApp.getActiveSpreadsheet();
  const histSh  = ss.getSheetByName(SHEET_HISTORY);
  if (!histSh) { SpreadsheetApp.getUi().alert('먼저 ① 번 메뉴를 실행하세요.'); return; }

  let statSh = ss.getSheetByName(SHEET_STATS);
  if (!statSh) statSh = ss.insertSheet(SHEET_STATS);
  statSh.clearContents();
  statSh.clearFormats();

  // 데이터 읽기 (1행 헤더 제외)
  const lastRow = histSh.getLastRow();
  if (lastRow < 2) return;
  const data = histSh.getRange(2, 3, lastRow - 1, 7).getValues(); // 1~6번 + 보너스

  // 1~45 빈도 계산
  const freq   = {};
  const bonusF = {};
  for (let n = 1; n <= 45; n++) { freq[n] = 0; bonusF[n] = 0; }

  const roundCount = data.length;
  for (const row of data) {
    for (let c = 0; c < 6; c++) {
      const num = parseInt(row[c]);
      if (num >= 1 && num <= 45) freq[num]++;
    }
    const bonus = parseInt(row[6]);
    if (bonus >= 1 && bonus <= 45) bonusF[bonus]++;
  }

  // 최근 N회 빈도 (핫/콜드 분석)
  const RECENT = Math.min(100, roundCount);
  const freqRecent = {};
  for (let n = 1; n <= 45; n++) freqRecent[n] = 0;
  for (let r = roundCount - RECENT; r < roundCount; r++) {
    for (let c = 0; c < 6; c++) {
      const num = parseInt(data[r][c]);
      if (num >= 1 && num <= 45) freqRecent[num]++;
    }
  }

  // 마지막 출현 회차 계산
  const lastSeen = {};
  for (let n = 1; n <= 45; n++) lastSeen[n] = 0;
  for (let r = 0; r < roundCount; r++) {
    for (let c = 0; c < 6; c++) {
      const num = parseInt(data[r][c]);
      if (num >= 1 && num <= 45) lastSeen[num] = r + 1; // 1-indexed
    }
  }
  const currentRound = parseInt(histSh.getRange(lastRow, 1).getValue());

  // 시트 작성
  const title = [`📊 번호별 통계 (총 ${roundCount}회차 기준 / 최근 ${RECENT}회 핫/콜드 포함)`];
  statSh.getRange(1, 1).setValue(title[0]);
  statSh.getRange(1, 1, 1, 9).merge()
        .setBackground('#0d0d1a').setFontColor('#ffd700')
        .setFontSize(13).setFontWeight('bold').setHorizontalAlignment('center');

  const header2 = ['번호','전체 출현 횟수','출현 확률(%)','최근100회 출현','마지막 출현 회차',
                   '미출현 회차 수','보너스 출현','핫/콜드 구분','가중치 점수'];
  statSh.getRange(2, 1, 1, header2.length).setValues([header2])
        .setBackground('#1a1a2e').setFontColor('#e8d5b7')
        .setFontWeight('bold').setHorizontalAlignment('center');

  const statRows = [];
  for (let n = 1; n <= 45; n++) {
    const prob      = ((freq[n] / (roundCount * 6)) * 100).toFixed(2);
    const missing   = currentRound - lastSeen[n];
    const hotcold   = freqRecent[n] >= 15 ? '🔥 HOT' : freqRecent[n] <= 5 ? '❄️ COLD' : '⚡ NORMAL';
    // 가중치: 전체 빈도 + 최근 빈도 + 미출현 보정
    const weight    = (freq[n] * 0.4 + freqRecent[n] * 3 + Math.min(missing, 30) * 0.5).toFixed(1);
    statRows.push([n, freq[n], parseFloat(prob), freqRecent[n], lastSeen[n], missing, bonusF[n], hotcold, parseFloat(weight)]);
  }
  statSh.getRange(3, 1, statRows.length, header2.length).setValues(statRows);

  // 번호 열 포맷
  for (let r = 3; r <= 47; r++) {
    const num = statRows[r - 3][0];
    const color = getBallColor(num);
    statSh.getRange(r, 1).setBackground(color).setFontColor('#fff').setFontWeight('bold')
          .setHorizontalAlignment('center');
  }

  // 조건부 색상 (핫/콜드)
  for (let r = 3; r <= 47; r++) {
    const hotcold = statRows[r-3][7];
    let rowColor = r % 2 === 0 ? '#0f0f23' : '#16213e';
    statSh.getRange(r, 2, 1, 8).setBackground(rowColor).setFontColor('#c8d8e8');
    if (hotcold.includes('HOT'))    statSh.getRange(r, 8).setFontColor('#ff6b6b').setFontWeight('bold');
    if (hotcold.includes('COLD'))   statSh.getRange(r, 8).setFontColor('#74b9ff').setFontWeight('bold');
    if (hotcold.includes('NORMAL')) statSh.getRange(r, 8).setFontColor('#55efc4');
  }

  // 가중치 내림차순 정렬 (정보 제공용 TOP 10)
  statSh.getRange(3, 1, 45, header2.length).sort({column: 9, ascending: false});

  statSh.autoResizeColumns(1, header2.length);

  // TOP 10 / BOTTOM 10 요약
  const topData = statSh.getRange(3, 1, 10, 1).getValues().flat();
  const botData = statSh.getRange(38, 1, 10, 1).getValues().flat();
  statSh.getRange(50, 1).setValue('🔥 추천 번호 TOP 10 (가중치 기준)');
  statSh.getRange(50, 1, 1, 10).merge().setBackground('#1e1e3f').setFontColor('#ffd700').setFontWeight('bold');
  statSh.getRange(51, 1, 1, 10).setValues([topData]).setHorizontalAlignment('center');
  statSh.getRange(53, 1).setValue('❄️ 미출현 번호 BOTTOM 10');
  statSh.getRange(53, 1, 1, 10).merge().setBackground('#1e1e3f').setFontColor('#74b9ff').setFontWeight('bold');
  statSh.getRange(54, 1, 1, 10).setValues([botData]).setHorizontalAlignment('center');

  Logger.log('✅ 통계 분석 완료');
}

// ─────────────────────────────────────────────────────────────
//  ③ 예측 번호 생성 (5세트)
// ─────────────────────────────────────────────────────────────
function generatePredictions() {
  const ss      = SpreadsheetApp.getActiveSpreadsheet();
  const statSh  = ss.getSheetByName(SHEET_STATS);
  if (!statSh) { SpreadsheetApp.getUi().alert('먼저 ② 번 메뉴를 실행하세요.'); return; }

  let predSh = ss.getSheetByName(SHEET_PREDICT);
  if (!predSh) predSh = ss.insertSheet(SHEET_PREDICT);
  predSh.clearContents();
  predSh.clearFormats();
  predSh.setTabColor('#ffd700');

  // 통계 시트에서 가중치 읽기 (번호, 가중치)
  const statData = statSh.getRange(3, 1, 45, 9).getValues();
  const weightMap = {};
  for (const row of statData) {
    const num = parseInt(row[0]);
    const wt  = parseFloat(row[8]);
    if (!isNaN(num) && num >= 1 && num <= 45) weightMap[num] = wt;
  }

  // 타이틀
  predSh.setColumnWidth(1, 60);
  const now = new Date();
  const dateStr = Utilities.formatDate(now, 'Asia/Seoul', 'yyyy년 MM월 dd일 HH:mm');
  predSh.getRange(1, 1).setValue(`🎱 로또 예측 번호 - ${dateStr} 생성`);
  predSh.getRange(1, 1, 1, 8).merge()
        .setBackground('#0d0d1a').setFontColor('#ffd700')
        .setFontSize(14).setFontWeight('bold').setHorizontalAlignment('center');

  predSh.getRange(2, 1).setValue('통계 기반 가중치 확률로 생성된 번호입니다. 전략별로 5가지 세트를 제공합니다.');
  predSh.getRange(2, 1, 1, 8).merge().setFontColor('#888').setHorizontalAlignment('center').setFontSize(10);

  // 헤더
  const setHeader = ['전략','1번','2번','3번','4번','5번','6번','전략 설명'];
  predSh.getRange(4, 1, 1, setHeader.length).setValues([setHeader])
        .setBackground('#1a1a2e').setFontColor('#e8d5b7')
        .setFontWeight('bold').setHorizontalAlignment('center');

  // 5가지 전략으로 번호 생성
  const strategies = [
    { name: '🔥 HOT 집중형',   fn: () => pickByStrategy(weightMap, 'hot') },
    { name: '❄️ COLD 균형형',   fn: () => pickByStrategy(weightMap, 'cold') },
    { name: '⚡ 가중치 최적형', fn: () => pickByStrategy(weightMap, 'weighted') },
    { name: '🎲 혼합 랜덤형',   fn: () => pickByStrategy(weightMap, 'mixed') },
    { name: '📊 전 구간 분산형', fn: () => pickByStrategy(weightMap, 'spread') },
  ];

  const descriptions = [
    '최근 100회 고빈도 번호 위주로 선택',
    '미출현 기간이 긴 번호를 포함해 균형 맞춤',
    '전체 가중치 기반 확률적 가중 샘플링',
    'HOT 3개 + COLD 1개 + 랜덤 2개 조합',
    '1~9, 10~19, 20~29, 30~39, 40~45 구간별 분산',
  ];

  const predRows = [];
  for (let i = 0; i < strategies.length; i++) {
    const nums = strategies[i].fn();
    nums.sort((a,b) => a - b);
    predRows.push([strategies[i].name, ...nums, descriptions[i]]);
  }
  predSh.getRange(5, 1, predRows.length, setHeader.length).setValues(predRows);

  // 번호 셀 색상 적용
  for (let r = 5; r <= 9; r++) {
    predSh.getRange(r, 1).setBackground(r % 2 === 0 ? '#0f0f23' : '#16213e')
          .setFontColor('#ffd700').setFontWeight('bold');
    for (let c = 2; c <= 7; c++) {
      const num = parseInt(predSh.getRange(r, c).getValue());
      const color = getBallColor(num);
      predSh.getRange(r, c).setBackground(color).setFontColor('#fff')
            .setFontWeight('bold').setHorizontalAlignment('center')
            .setFontSize(12);
    }
    predSh.getRange(r, 8).setFontColor('#a0aec0').setFontStyle('italic');
  }

  // 다음 회차 자동 계산
  const histSh = ss.getSheetByName(SHEET_HISTORY);
  if (histSh) {
    const lastRound = parseInt(histSh.getRange(histSh.getLastRow(), 1).getValue());
    predSh.getRange(11, 1).setValue(`📌 참고 회차: 다음 회차는 ${lastRound + 1}회로 예상됩니다.`);
    predSh.getRange(11, 1, 1, 8).merge().setFontColor('#ffd700').setFontWeight('bold').setHorizontalAlignment('center');
  }

  // 구간 통계 추가
  addZoneStats(predSh, weightMap);

  predSh.autoResizeColumns(1, 8);
  predSh.setFrozenRows(4);

  Logger.log('✅ 예측 번호 생성 완료');
}

// ─────────────────────────────────────────────────────────────
//  전략별 번호 선택 함수
// ─────────────────────────────────────────────────────────────
function pickByStrategy(weightMap, strategy) {
  const pool = Object.keys(weightMap).map(Number);

  if (strategy === 'hot') {
    // 가중치 상위 18개에서 6개 가중 랜덤
    const sorted = pool.slice().sort((a,b) => weightMap[b] - weightMap[a]).slice(0, 18);
    return weightedSample(sorted, weightMap, 6);
  }

  if (strategy === 'cold') {
    // 가중치 하위 15개 중 2개 + 상위 20개 중 4개
    const sorted = pool.slice().sort((a,b) => weightMap[a] - weightMap[b]);
    const cold2 = weightedSample(sorted.slice(0, 15), weightMap, 2);
    const hotPool = pool.slice().sort((a,b) => weightMap[b] - weightMap[a]).slice(0, 20)
                        .filter(n => !cold2.includes(n));
    const hot4 = weightedSample(hotPool, weightMap, 4);
    return [...cold2, ...hot4];
  }

  if (strategy === 'weighted') {
    return weightedSample(pool, weightMap, 6);
  }

  if (strategy === 'mixed') {
    const sorted = pool.slice().sort((a,b) => weightMap[b] - weightMap[a]);
    const hot3  = weightedSample(sorted.slice(0, 15), weightMap, 3);
    const cold1 = randomSample(sorted.slice(30), 1);
    const rest  = pool.filter(n => !hot3.includes(n) && !cold1.includes(n));
    const rand2 = randomSample(rest, 2);
    return [...hot3, ...cold1, ...rand2];
  }

  if (strategy === 'spread') {
    // 구간별 1개씩 선택 (1~9, 10~19, 20~29, 30~39) + 40~45에서 1개 + 전체에서 1개
    const zones = [
      pool.filter(n => n >= 1  && n <= 9),
      pool.filter(n => n >= 10 && n <= 19),
      pool.filter(n => n >= 20 && n <= 29),
      pool.filter(n => n >= 30 && n <= 39),
      pool.filter(n => n >= 40 && n <= 45),
    ];
    const picks = [];
    for (const zone of zones.slice(0, 5)) {
      if (zone.length > 0) picks.push(...weightedSample(zone, weightMap, 1));
    }
    // 부족하면 나머지에서 채움
    while (picks.length < 6) {
      const extra = weightedSample(pool.filter(n => !picks.includes(n)), weightMap, 1);
      picks.push(...extra);
    }
    return picks.slice(0, 6);
  }

  return randomSample(pool, 6);
}

// 가중치 기반 확률 샘플링
function weightedSample(pool, weightMap, count) {
  const selected = [];
  const remaining = pool.slice();

  for (let i = 0; i < count && remaining.length > 0; i++) {
    const totalWeight = remaining.reduce((sum, n) => sum + (weightMap[n] || 0.1), 0);
    let rand = Math.random() * totalWeight;
    for (let j = 0; j < remaining.length; j++) {
      rand -= (weightMap[remaining[j]] || 0.1);
      if (rand <= 0) {
        selected.push(remaining[j]);
        remaining.splice(j, 1);
        break;
      }
    }
  }
  return selected;
}

// 단순 랜덤 샘플링
function randomSample(pool, count) {
  const shuffled = pool.slice().sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// ─────────────────────────────────────────────────────────────
//  구간 분포 통계 추가 (예측 시트 하단)
// ─────────────────────────────────────────────────────────────
function addZoneStats(sheet, weightMap) {
  sheet.getRange(13, 1).setValue('📊 구간별 가중치 분포');
  sheet.getRange(13, 1, 1, 8).merge()
       .setBackground('#1a1a2e').setFontColor('#ffd700')
       .setFontWeight('bold').setHorizontalAlignment('center');

  const zones = [
    { label: '1~9',   nums: Array.from({length: 9},  (_, i) => i + 1)  },
    { label: '10~19', nums: Array.from({length: 10}, (_, i) => i + 10) },
    { label: '20~29', nums: Array.from({length: 10}, (_, i) => i + 20) },
    { label: '30~39', nums: Array.from({length: 10}, (_, i) => i + 30) },
    { label: '40~45', nums: Array.from({length: 6},  (_, i) => i + 40) },
  ];

  const zoneHeader = ['구간', '번호 수', '평균 가중치', '추천 번호 (상위 3)', '', '', '', ''];
  sheet.getRange(14, 1, 1, 8).setValues([zoneHeader])
       .setBackground('#0d0d1a').setFontColor('#888').setFontWeight('bold');

  let row = 15;
  for (const zone of zones) {
    const weights = zone.nums.map(n => weightMap[n] || 0);
    const avg     = (weights.reduce((a,b) => a+b, 0) / weights.length).toFixed(1);
    const top3    = zone.nums.slice().sort((a,b) => (weightMap[b]||0) - (weightMap[a]||0)).slice(0, 3);
    const rowBg   = row % 2 === 0 ? '#0f0f23' : '#16213e';
    sheet.getRange(row, 1, 1, 4).setValues([[zone.label, zone.nums.length, parseFloat(avg), '']]);
    sheet.getRange(row, 1, 1, 8).setBackground(rowBg).setFontColor('#c8d8e8').setHorizontalAlignment('center');
    for (let k = 0; k < top3.length; k++) {
      sheet.getRange(row, 4 + k).setValue(top3[k])
           .setBackground(getBallColor(top3[k])).setFontColor('#fff').setFontWeight('bold');
    }
    row++;
  }
}

// ─────────────────────────────────────────────────────────────
//  번호별 볼 색상 (실제 로또 색상 체계)
// ─────────────────────────────────────────────────────────────
function getBallColor(num) {
  if (num >= 1  && num <= 10) return '#fbc400'; // 노랑
  if (num >= 11 && num <= 20) return '#69c8f2'; // 파랑
  if (num >= 21 && num <= 30) return '#ff7272'; // 빨강
  if (num >= 31 && num <= 40) return '#aaa';    // 회색
  if (num >= 41 && num <= 45) return '#b0d840'; // 초록
  return '#666';
}

// 당첨번호 시트 전체 색상 적용
function applyBallColors(sheet, dataRows) {
  for (let r = 2; r <= dataRows; r++) {
    for (let c = 3; c <= 9; c++) {
      const num = parseInt(sheet.getRange(r, c).getValue());
      if (isNaN(num)) continue;
      const color = getBallColor(num);
      const textColor = (num >= 31 && num <= 40) ? '#333' : '#fff';
      sheet.getRange(r, c).setBackground(color).setFontColor(textColor)
           .setFontWeight('bold').setHorizontalAlignment('center');
    }
    const rowBg = r % 2 === 0 ? '#0a0a1a' : '#111128';
    sheet.getRange(r, 1, 1, 2).setBackground(rowBg).setFontColor('#a0aec0');
  }
}
