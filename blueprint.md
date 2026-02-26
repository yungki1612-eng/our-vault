# **Asset Management Dashboard Blueprint (Financial Master)**

## **Overview**
`our-vault`는 React와 Firebase를 기반으로 한 고성능 자산 관리 웹 애플리케이션입니다. 사용자는 실시간으로 자산 상태를 추적하고, 시각화된 데이터를 통해 재무 목표를 효율적으로 관리할 수 있습니다.

## **Tech Stack**
- **Frontend:** React (CDN), Tailwind CSS, Recharts
- **Backend:** Firebase Auth (Anonymous), Firestore (Real-time Sync)
- **Utilities:** Babel Standalone, Lucide-like SVG Icons

## **Key Features**
1. **Interactive Dashboard:** 
   - 총 자산, 순자산, 부채, 주식 평가액 요약 카드.
   - Recharts를 이용한 자산 성장 및 자금 흐름 차트.
   - AI 자산 분석 어드바이저.
2. **Spreadsheet Interface:**
   - 엑셀 형식의 데이터 입력 및 관리.
   - CSV 업로드/다운로드 지원.
   - 드래그 앤 드롭을 통한 항목 순서 변경.
3. **Multi-Category Management:**
   - 자산(예적금, 주식, 코인 등), 예산(수입, 지출, 투자 등), 대출, 주식 손익 관리.
4. **Salary Tracking:** 10년 이상의 연봉 추이 기록 및 시각화.
5. **Real-time Sync:** 기기 간 연동 키(UUID)를 통한 데이터 동기화.

## **Implementation Status**
- [x] React & Tailwind 기반 UI 프레임워크 구축
- [x] Firebase 실시간 데이터 연동
- [x] Recharts 시각화 컴포넌트 통합
- [x] 스프레드시트 데이터 관리 로직 구현
- [x] AI 분석 및 목표 달성 대시보드 구현
