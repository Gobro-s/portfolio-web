export type Project = {
  slug: string;
  no: string;
  name: string;
  tagline: string;
  period: string;
  role: string;
  coreSkill: string; // 이 프로젝트에서 돋보이는 핵심 역량 (한 줄 배지)
  color: string; // 프로젝트 시그니처 컬러 (hex)
  why: string;
  stack: { label: string; items: string[] }[];
  highlights: { title: string; body: string }[];
  results: string[];
  images: { src: string; caption: string }[];
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "voda",
    no: "04",
    name: "VODA",
    tagline: "시각장애인을 위한 영상통화 서비스 — VODA로 세상을 보다",
    period: "2023.07 – 2023.08",
    role: "기획 · 1인 Front-End",
    coreSkill: "ACCESSIBILITY-FIRST UX",
    color: "#F2C879",
    why: "빠른 디지털 전환 속에서 소외되는 계층이 분명히 있을 거라 생각했습니다. 설리반+의 사진 분석과 Be My Eyes의 봉사자 매칭을 결합해, 시각장애인이 실시간 영상통화로 도움을 받을 수 있는 서비스를 혼자 프론트엔드로 설계·구현했습니다.",
    stack: [
      { label: "Frontend", items: ["React 16", "Redux", "TypeScript 5.3"] },
      { label: "Backend / DB", items: ["Java 11", "MySQL"] },
      { label: "AI / RTC", items: ["OpenVidu (WebRTC)", "Face-api.js", "OpenCV", "YOLOv5"] },
    ],
    highlights: [
      {
        title: "두 화면, 하나의 코드베이스",
        body: "비장애인용 화면과 시각장애인용 화면을 각각 설계하되, 키보드 스크린 리더기(NVDA)로만 조작하는 사용자를 기준으로 컴포넌트의 Depth를 다시 설계했습니다.",
      },
      {
        title: "WCAG AA를 웃도는 명도 대비",
        body: "저시력자를 위한 KoddiUD 온고딕 서체를 적용하고, Dark-Navy·Dark-Yellow 조합으로 명도 대비율 7.86(WCAG AA 기준 4.5 상회)을 설계했습니다.",
      },
      {
        title: "실사용자 테스트로 검증",
        body: "복지관을 직접 방문해 프로토타입 피드백을 반영했고, TabIndex·Aria-Label로 NVDA가 각 항목을 정확히 읽도록 구현한 뒤 실제 안대를 착용하고 스크린 리더기만으로 사용하며 개선점을 찾았습니다.",
      },
    ],
    results: [
      "SSAFY 특화 프로젝트 베스트 멤버 선정",
      "SSAFY 공통 프로젝트 우수 프로젝트 선정",
      "SSAFY 최우수 UCC 선정",
    ],
    images: [
      { src: "/images/projects/voda-call.png", caption: "영상통화 화면 — 표정 인식(TTS·STT)과 통화 알림" },
      { src: "/images/projects/voda-screenreader.png", caption: "TabIndex·Aria-Label을 적용한 스크린 리더기(NVDA) 사용 화면" },
      { src: "/images/projects/voda-feedback.png", caption: "고객의 소리함 — 사용자 피드백 수렴 페이지" },
    ],
  },
  {
    slug: "open-the-door",
    no: "02",
    name: "Open The Door",
    tagline: "방탈출 카페 정보 제공 및 예약 플랫폼",
    period: "2023.10 – 2023.11",
    role: "기획 · Front-End",
    coreSkill: "FRONTEND ARCHITECTURE",
    color: "#7FD8C6",
    why: "팀원 모두가 방탈출을 즐겼지만, 정보 제공과 예약이 한 번에 되는 서비스가 없었습니다. 그래서 직접 만들었습니다.",
    stack: [
      { label: "Frontend", items: ["React-Native 0.72", "Recoil", "TypeScript 5.3", "Styled-Component"] },
      { label: "Backend / DB", items: ["Java 11", "MySQL", "MongoDB"] },
      { label: "DevOps / API", items: ["GitHub Actions", "Google Maps API"] },
    ],
    highlights: [
      {
        title: "Atomic Design + CDD로 50% 시간 단축",
        body: "Atomic Design과 컴포넌트 주도 개발(CDD)을 채택해 병렬적으로 컴포넌트를 제작, 개발 시간을 약 50% 단축했습니다. MVVM 패턴으로 컴포넌트 확장성도 함께 확보했습니다.",
      },
      {
        title: "리스트 성능 최적화",
        body: "인기 테마 목록에 FlatList를 적용해 화면에 보이는 콘텐츠만 렌더링했고, 이미지 로딩 전 스켈레톤 UI로 레이아웃이 임의로 바뀌는 문제를 방지했습니다. 페이지네이션과 무한스크롤로 메모리·리소스 효율도 함께 챙겼습니다.",
      },
      {
        title: "부족한 RN 패키지, 직접 컴포넌트화",
        body: "React-Native 생태계에 지원 패키지가 많지 않아, 자주 쓰이는 기능을 직접 컴포넌트 패키지처럼 만들어 재사용했습니다. 기획-와이어프레임-기능명세서-프로토타입 단계로 화면을 설계해 PM 없는 팀의 리스크를 줄였습니다.",
      },
    ],
    results: ["SSAFY 자율 프로젝트 우수상 수상"],
    images: [
      { src: "/images/projects/open-the-door-main.png", caption: "메인 화면 — 테마 검색과 내 주변 지도" },
      { src: "/images/projects/open-the-door-popular.png", caption: "인기 테마 목록 — FlatList·스켈레톤 UI 적용" },
      { src: "/images/projects/open-the-door-booking.png", caption: "테마 예약 화면 — 날짜·시간 선택과 예약 확인 모달" },
    ],
  },
  {
    slug: "haruman",
    no: "03",
    name: "HARUMAN",
    tagline: "하루 만 원으로 시작하는 올바른 소비 습관",
    period: "2023.08 – 2023.10",
    role: "기획 · Front-End",
    coreSkill: "PRODUCT × DATA VIZ",
    color: "#E38B6C",
    why: "핀테크 도메인에서, 타국 대비 부족한 경제 교육 문제를 풀고 싶었습니다. '만원의 행복'을 모티브로, 가계부 형태로 올바른 소비 습관을 길러주는 서비스를 기획했습니다.",
    stack: [
      { label: "Frontend", items: ["React 18.2", "Redux", "PWA", "TypeScript 5.3", "SCSS"] },
      { label: "Backend / DB", items: ["Java 11", "MySQL", "Redis"] },
      { label: "Data / API", items: ["D3.js", "Chart.js", "OpenAI API"] },
    ],
    highlights: [
      {
        title: "7주 안에 완성도를 높이는 기술 선택",
        body: "Flutter와 PWA 사이에서, 새 언어(Dart)를 배우기보다 이미 익숙한 TS·JS로 완성도를 높이는 게 낫다고 판단해 React 기반 PWA로 웹뷰 배포를 진행했습니다.",
      },
      {
        title: "선형 보간(lerp)으로 만든 직관적 잔액 시각화",
        body: "물결 애니메이션으로 남은 금액의 비율을 표현하고, 지출을 입력할 때 물결이 줄어드는 움직임을 lerp 함수로 구현해 사용 금액을 직관적으로 체감하게 했습니다.",
      },
      {
        title: "D3 · Chart.js로 소비 패턴 분석",
        body: "카테고리별 소비 패턴은 Chart.js 도넛 차트로, 금액대별 잔액 현황은 D3 버블 차트로 시각화해 경쟁 심리를 자극하는 절약 유도 페이지를 만들었습니다. 각 버블의 사용자는 무한스크롤로 불러와 메모리를 관리했습니다.",
      },
    ],
    results: ["SSAFY 특화 프로젝트 베스트 멤버 선정"],
    images: [
      { src: "/images/projects/haruman-main.png", caption: "메인·로그인 화면 — lerp 애니메이션으로 표현한 남은 금액" },
      { src: "/images/projects/haruman-chart.png", caption: "하루 소비 지출 현황 — Chart.js 도넛 차트" },
      { src: "/images/projects/haruman-stats.png", caption: "통계 화면 — D3 버블 차트로 본 금액대별 잔액 현황" },
    ],
  },
  {
    slug: "raim",
    no: "05",
    name: "RAIM Schedule Manager",
    tagline: "서울로봇인공지능과학관 직원 일정·교육·초과근무 통합 관리",
    period: "2026.06 (약 2주)",
    role: "기획 · 1인 풀스택 (Claude 기반 바이브 코딩)",
    coreSkill: "AI-ASSISTED FULLSTACK",
    color: "#8EA7E8",
    why: "엑셀과 수기로 흩어져 있던 직원 일정·교육 신청 관리가 불편해 직접 만들었습니다. 현장에서 필요한 기능만 담아 실제 운영에 바로 투입했습니다.",
    stack: [
      { label: "Frontend", items: ["Vue 3", "TypeScript", "Tailwind CSS", "v-calendar"] },
      { label: "Infra", items: ["Firebase Firestore", "Firebase Hosting", "Serverless"] },
      { label: "자동화", items: ["Puppeteer"] },
    ],
    highlights: [
      {
        title: "서버 없이 설계한 인증·권한 체계",
        body: "별도 백엔드 없이 Firebase Auth·Firestore만으로 인증과 데이터를 처리해 유지 비용을 최소화했습니다. 관리자 승인 기반 계정 상태(대기/활성/정지)를 두고 Vue Router 가드에서 권한별 접근을 차단했습니다.",
      },
      {
        title: "불규칙한 외부 표 구조를 자동 수집",
        body: "Puppeteer 크롤러로 외부 교육 사이트의 연간 일정을 수집해 Firestore에 저장합니다. 숨겨진 셀·날짜 뭉침 등 불규칙한 표 구조를 파싱 로직으로 보정해 데이터 정확도를 확보했습니다.",
      },
      {
        title: "동시 신청에도 안전한 정원 관리",
        body: "교육 신청 인원은 Firestore 트랜잭션으로 처리해 동시 신청 시 정원 초과를 방지했습니다. AI가 생성한 코드를 그대로 쓰지 않고, 구조와 보안(권한 가드, 키 관리)을 직접 검증하는 과정을 거쳤습니다.",
      },
    ],
    results: ["실제 근무 현장에 배포, 운영 중"],
    images: [
      { src: "/images/projects/raim-calendar.png", caption: "캘린더 일정 관리 — 유형별 색상, 신청중/완료 상태 표시" },
      { src: "/images/projects/raim-education.png", caption: "교육 목록 자동 수집 — Puppeteer 크롤러로 연간 일정 파싱" },
    ],
  },
  {
    slug: "robotics-reservation",
    no: "06",
    name: "Robotics Reservation",
    tagline: "체험관 현장 대기열 관리 시스템",
    period: "2026.04 ~ 진행중",
    role: "기획 · 1인 풀스택 (Claude 기반 바이브 코딩)",
    coreSkill: "SYSTEM DESIGN & PRIVACY",
    color: "#C98BD8",
    why: "수기 대기자 명단 운영으로 인한 호출 누락, 개인정보 노출 문제를 해결하기 위해 2026년 4월부터 만들기 시작해 지금까지 현장 요구에 맞춰 계속 개선하고 있습니다. 방문객 태블릿 등록부터 SMS 호출, 통계까지 운영 전 과정을 자동화했습니다.",
    stack: [
      { label: "Frontend", items: ["React", "Tailwind CSS"] },
      { label: "Backend", items: ["Django REST Framework", "APScheduler", "SQLite"] },
      { label: "API", items: ["Solapi SMS", "openpyxl"] },
    ],
    highlights: [
      {
        title: "개인정보 최소 보관 설계",
        body: "전화번호 수집 동의 절차를 두고, 운영 마감 후 APScheduler가 일일 통계만 이관한 뒤 개인정보 전체를 자동 파기하도록 설계했습니다. 통계는 성별·연령 8분류로만 집계해 개인 식별 없이 방문 데이터를 축적합니다.",
      },
      {
        title: "슬롯 기반 대기열 · 선호출 알고리즘",
        body: "정원(테이블 10석)은 '입장 인원 + 이미 문자를 보내 호출 중인 인원'의 합으로 관리합니다. 자리가 나면 대기열에서 등록 순서(FIFO)대로 다음 팀을 바로 호출해, 실제로 자리가 빌 때까지 기다리지 않고 미리 문자를 보내 이동 시간을 벌어줍니다. 호출 문자에는 11분 입장 기한을 명시하고, 신규 등록·입장 처리·대기자 삭제 세 이벤트 모두에서 같은 재호출 로직이 실행되도록 설계해 빈 자리가 방치되지 않게 했습니다. 단순히 '9번째니까 대기'가 아니라, 언제·누구를·몇 명이나 동시에 호출할지까지 계산하는 구조입니다.",
      },
      {
        title: "배포 없는 내부망 아키텍처",
        body: "관람객 전화번호 등 개인정보를 다루는 공공기관 서비스이기 때문에, 클라우드에 공개 배포하는 대신 처음부터 외부 인터넷과 분리된 내부망(관내 IP)에서만 접근 가능하도록 설계했습니다. 공인 URL이 없어 외부에서는 서비스 자체에 접근할 수 없고, 방문객 등록 태블릿과 직원 대시보드 모두 같은 내부망 안에서만 통신합니다.",
      },
      {
        title: "테이블 배정 & 통계 자동화",
        body: "Solapi API로 호출 문자를 발송하고, 중복 발송 방지 플래그로 같은 팀에게 문자가 두 번 가지 않도록 관리합니다. 배정된 테이블(T1~T10)과 일일 방문 통계는 서식이 적용된 엑셀로 바로 내려받을 수 있습니다.",
      },
    ],
    results: ["2026년 4월부터 현재(7월)까지 실제 체험관 현장에서 운영 중"],
    images: [
      { src: "/images/projects/reservation-checkin.png", caption: "방문객 대기 등록 — 태블릿에서 전화번호·일행 인원 등록" },
      { src: "/images/projects/reservation-dashboard.png", caption: "직원 대시보드 — 대기열 관리와 SMS 호출" },
    ],
  },
];

export const profile = {
  name: "고세훈",
  tagline: "재활용하는 개발자",
  taglineEn: "The developer who recycles.",
  bio: [
    "커뮤니케이션을 기본으로 하고, 재사용성과 확장성에 집중하는 개발자입니다.",
    "컴포넌트 구조화를 통해 반복 작업을 줄이는 걸 좋아하고,",
    "협업 과정을 통해 최선의 목표점을 찾는 것을 좋아합니다.",
  ],
  skills: [
    { name: "React", level: 4 },
    { name: "React Native", level: 4 },
    { name: "Vue.js", level: 3 },
    { name: "Django", level: 3 },
    { name: "TypeScript", level: 3 },
    { name: "JavaScript", level: 3 },
    { name: "Python", level: 3 },
    { name: "Java", level: 1 },
  ],
  tools: ["Jira", "Notion", "Git & GitLab", "Figma"],
  experience: [
    { period: "2026.04 ~ 재직중", label: "서울로봇인공지능과학관" },
    { period: "2023.01 ~ 2023.12", label: "삼성 청년 SW 아카데미(SSAFY) 9기" },
  ],
  education: "대학교 에너지자원융합공학 졸업 (2022.02)",
  awards: [
    "SSAFY 자율 프로젝트 우수상 — Open The Door",
    "SSAFY 공통 프로젝트 우수상 — VODA",
  ],
};
