# Our Vault — Agent Blueprint

## Overview

`our-vault`는 **Yungki & Sua** 부부의 자산을 실시간으로 추적·시각화하는 개인 재무 대시보드입니다.  
단일 HTML 파일(`index.html`) 안에 React, Tailwind CSS, Recharts, Firebase가 모두 포함된 SPA 구조로 동작합니다.

---

## Tech Stack

| Layer | Library / Service | Version |
|---|---|---|
| UI Framework | React (CDN, UMD) | 18.2.0 |
| Transpiler | Babel Standalone | 7.23.5 |
| Styling | Tailwind CSS (CDN) | 3.x |
| Charts | Recharts (CDN) | 2.5.0 |
| Database | Firebase Firestore | 10.x (modular) |
| Auth | Firebase Anonymous Auth | — |
| Fonts | Outfit (body), Space Grotesk (figures) | Google Fonts |

> **중요:** 빌드 도구(Vite, Webpack 등) 없이 CDN으로만 동작합니다. `import` 문 대신 전역 변수(`React`, `ReactDOM`, `Recharts` 등)를 사용합니다.

---

## Architecture

```
index.html  (단일 파일 SPA)
├── <style>         — Glassmorphism CSS, Tailwind 확장
├── <script type="text/babel">
│   ├── 전역 유틸   — formatCurrency, evaluateFormula, getPreviousMonth ...
│   ├── 상수        — ASSET_CATEGORIES, BUDGET_CATEGORIES, LOAN_CATEGORIES ...
│   ├── Firebase    — initFirebase(), 실시간 Firestore 동기화
│   ├── 컴포넌트     — Dashboard, GenericSpreadsheet, RealEstateSheet ...
│   └── App         — 최상위 상태(safeData) 관리, 탭 라우팅
└── <div id="root"> — ReactDOM.render 대상
```

### 상태 관리 패턴
- 최상위 `safeData` 객체가 모든 월별 데이터를 보유합니다.
- 키 형식: `"YYYY-MM"` (월별 데이터), `"meta"` (설정), `"salary"`, `"portfolio"`, `"realEstate"`.
- 하위 컴포넌트는 `onUpdate(newData)` 콜백을 통해 상태를 갱신합니다.
- Firestore와 실시간 양방향 동기화 (기기 연동 키 UUID 기반).

---

## Data Model

### 월별 데이터 (`safeData["YYYY-MM"]`)
```js
{
  assets: [{ id, name, category, value, ... }],
  loans:  [{ id, name, category, amount, ... }],
  budget: [{ id, name, category, amount, ... }],
  stockProfit: [{ id, name, category, category2, amount, ... }]
}
```

### 자산 카테고리 (`ASSET_CATEGORIES`)
| Key | 의미 |
|---|---|
| `SAVINGS` | 예·적금, 현금, 파킹통장 |
| `INVESTMENT` | 주식, 펀드 |
| `COIN` | 가상자산 |
| `REAL_ESTATE` | 부동산 (별도 `realEstate` 배열과 연동) |
| `PENSION` | 연금, IRP |

### 예산 카테고리 (`BUDGET_CATEGORIES`)
`INCOME` / `SAVING` / `INVEST` / `EXPENSE`

### 대출 카테고리 (`LOAN_CATEGORIES`)
`DEBT` (일반 부채) / `LEASE` (전세, 순자산 계산에서 제외)

### 메타 (`safeData.meta`)
```js
{
  sortOrder: {},
  hiddenRows: {},        // 항목 숨김 여부
  dashboardMemo: '',
  goals: { loan: 30, invest: 30, netWorth: 1000000000 },
  dashboardLayout: {},
  allocationTargets: {}
}
```

---

## Key Components

| 컴포넌트 | 역할 |
|---|---|
| `Dashboard` | 메인 대시보드. 월 선택, 스코어카드, 자산 흐름 차트. |
| `CompactScoreCard` | 총 자산·순자산·부채·투자 카드. **YoY ↔ MoM 비교 토글** 지원. |
| `CombinedAssetTelemetry` | 총 보유자산 대형 카드. YoY/MoM 토글 + 절대 금액 차이 표시. |
| `GenericSpreadsheet` | 자산·예산·대출·주식손익 데이터를 엑셀형 테이블로 편집. |
| `RealEstateSheet` | 부동산 전용 시트. 매입가·현재가·수익률 관리. |
| `AIAnalysisCard` | 부채비율·저축률 기반 재무 건전성 점수 & 어드바이스. |
| `FinancialGoalCombinedCard` | 대출 상환율·투자 달성률 목표 트래커. |
| `NetWorthGoalCard` | FIRE 목표 진행률 바. |
| `CollapsibleCard` | 접을 수 있는 섹션 카드. `headerExtra` prop으로 우측 커스텀 요소 지원. |
| `SalarySheet` | 연도별 연봉 입력·시각화 (Yungki / Sua). |
| `PortfolioView` | 종목별 보유 현황 및 계좌 관리. |

---

## Dashboard 비교 모드 (YoY / MoM)

```
compareMode: 'yoy' | 'mom'   ← Dashboard useState
toggleCompare()              ← 모든 스코어카드가 공유하는 토글 함수
```

| 모드 | 기준 데이터 |
|---|---|
| **YoY** | `prevYearDate = YYYY-1년의 동일 월` (예: 2025-08 → 2024-08) |
| **MoM** | `prevMonthDate = 직전 달` (예: 2025-08 → 2025-07) |

> ⚠️ `getPreviousMonth()` 함수는 **전월**을 반환합니다. YoY 비교에는 절대 사용하지 마세요.

---

## 자산 흐름 차트 줌

```
chartZoom: '1Y' | '3Y' | '5Y' | 'ALL'   ← Dashboard useState
```
`fullGrowthData`를 `chartZoom`에 따라 슬라이싱해서 렌더링합니다.  
`CollapsibleCard`의 `headerExtra`에 줌 버튼이 위치합니다.

---

## 핵심 유틸 함수

| 함수 | 설명 |
|---|---|
| `evaluateFormula(val)` | `"=100+200"` 같은 수식 문자열을 숫자로 평가 |
| `formatCurrency(val)` | `₩ 1,234만` 형식으로 포맷 |
| `formatNumberWithCommas(val)` | 천 단위 쉼표 포맷 |
| `getPreviousMonth(ym)` | 전월 키 반환 (YoY에 사용 금지) |
| `normalizeCategory(cat, type)` | 다양한 카테고리 문자열을 표준 키로 정규화 |
| `isItemHidden(item, type, meta)` | `meta.hiddenRows` 기반 숨김 여부 확인 |
| `calcYoY(curr, prev)` | `(curr - prev) / prev * 100` |

---

## 코딩 컨벤션

1. **단일 파일 원칙**: 모든 로직은 `index.html` 안에 유지합니다. 외부 `.js` 파일로 분리하지 않습니다.
2. **React Hooks**: `useState`, `useMemo`, `useEffect`, `useCallback`만 사용합니다 (CDN UMD 빌드 제한).
3. **Tailwind 우선**: 인라인 `style` prop은 동적 값(차트 색상, 퍼센트 등)에만 사용합니다.
4. **수식 평가**: 셀 값 계산 시 항상 `evaluateFormula()` 를 통해 접근합니다.
5. **onUpdate 패턴**: 상태 변경은 반드시 `onUpdate(newData)` 를 통해 최상위로 올리고, Firebase에 자동 동기화합니다.
6. **카테고리 접근**: 카테고리 문자열은 항상 `normalizeCategory()` 를 거칩니다. 하드코딩된 문자열 비교는 지양합니다.

---

## Design Reference

UI 컴포넌트 구현 시 [`DESIGN.md`](./DESIGN.md)의 **Toss Design System** 토큰을 참고합니다.

핵심 토큰:
- Primary: `#3182f6`, On-Primary: `#ffffff`
- Foreground: `#191f28`, Body: `#4e5968`, Muted: `#8b95a1`
- Surface: `#f2f4f6`, Border: `#e5e8eb`
- Danger: `#e42939`
- Font: `Toss Product Sans` (unavailable시 Outfit 대체)

단, 현재 앱은 **Dark Mode Glassmorphism** 테마를 사용합니다. Toss 토큰은 신규 컴포넌트 디자인 결정 시 참고 기준으로 활용하며, 기존 dark 테마와 충돌하지 않도록 조율합니다.

---

## Firebase 구조

```
Firestore
└── users/{syncKey}
    └── data (document)
        └── { ...safeData }   ← 전체 상태가 단일 document로 저장
```

`syncKey`는 UUID v4이며 사용자가 직접 설정합니다. 기기 간 공유 시 동일 키를 입력합니다.

---

## 파일 구조

```
our-vault/
├── index.html          ← 앱 전체 (단일 파일)
├── DESIGN.md           ← Toss 디자인 시스템 레퍼런스
├── blueprint.md        ← 초기 기획 문서
├── Agents.md           ← 이 파일 (AI Agent 가이드)
├── toss-theme.css      ← Toss 테마 CSS 초안
├── concept-*.html      ← UI 컨셉 시안 파일들
└── main.js / style.css ← 실험적 분리 파일 (미사용)
```

---

## 최근 변경 이력 (2026-08)

| 날짜 | 변경 내용 |
|---|---|
| 2026-08-13 | Dashboard YoY ↔ MoM 비교 토글 추가 |
| 2026-08-13 | 자산 흐름 차트 기간 줌 (1Y/3Y/5Y/ALL) 추가 |
| 2026-08-13 | **버그 수정**: YoY 계산에 `getPreviousMonth`(전월) 사용하던 문제를 전년 동월로 수정 |
