export type Project = {
  slug: string;
  no: string; // 정렬 키. 화면에는 절대 찍지 않는다 — 섹션 번호는 금지 요소다.
  name: string;
  tagline: string;
  period: string;
  role: string;
  phases: Phase[]; // 이 프로젝트에서 내가 커버한 사이클 단계
  coreSkill: string; // 이 프로젝트에서 돋보이는 핵심 역량 (한 줄 배지)
  why: string[]; // 짧고 균형 잡힌 줄 단위 — 문장마다 끊어서 강제 줄바꿈
  architecture: string[]; // 전체 시스템 구조 중 내가 맡은 부분, 문장 단위
  stack: { label: string; items: string[] }[];
  highlights: { title: string; body: string[]; images?: { src: string; caption: string }[] }[];
  challenges: string[]; // 협업 마찰 또는 실제 장애 — 부딪히고 어떻게 풀었는지, 문장 단위
  results: string[];
  images: { src: string; caption: string }[];
  links?: { label: string; href: string }[];
  inProduction?: boolean; // 근무지에서 실제로 운영 중인 시스템인지 (랜딩 숫자의 근거)
};

// 일하는 방식: 현장의 요구에서 시작해 설계·제작을 거쳐 현장에 적용하고,
// 거기서 검증된 구조를 다음 현장에 재활용하는 순환.
export const cycle = ["발견", "기획", "개발", "적용·운영"] as const;
export type Phase = (typeof cycle)[number];

// 배열에 어떤 순서로 적어두든, 화면과 상세 페이지의 다음-프로젝트는 no(01→05) 순서를 따른다.
// 정렬 기준을 바꾸고 싶으면(직무별 강조 등) 여기 sort만 손대면 된다 — 아래 객체는 그대로 둔다.
const projectList: Project[] = [
  {
    slug: "voda",
    no: "05",
    name: "VODA",
    tagline: "VODA로 세상을 보다",
    period: "2023.07 – 2023.08",
    role: "기획 · 1인 Front-End",
    phases: ["기획", "개발"],
    coreSkill: "ACCESSIBILITY-FIRST UX",
    why: [
      "Web-RTC 기술을 활용한 서비스라는 주제에서 출발했습니다.",
      "빠른 디지털 전환 속에서도 소외되는 계층은 분명히 있다고 생각했습니다.",
      "설리반+의 사진 분석과 Be My Eyes의 봉사자 매칭을 결합하고 싶었습니다.",
      "시각장애인이 실시간 영상통화로 도움을 받는 서비스를 혼자 프론트엔드로 설계·구현했습니다.",
    ],
    architecture: [
      "팀은 프론트엔드(본인) · 백엔드(Java/MySQL) · AI-RTC(OpenVidu, 표정·안면 인식) 세 파트로 나뉘어 있었습니다.",
      "비장애인용·시각장애인용 두 화면 체계를 포함한 프론트엔드 전체를 혼자 설계·구현했습니다.",
      "OpenVidu 클라이언트 SDK로 세션 연결과 영상·음성 스트림 처리 등 WebRTC 통화 화면을 직접 구현했습니다.",
      "NVDA 스크린 리더기 사용자 기준으로 포커스 이동 순서(컴포넌트 Depth)를 다시 설계했습니다.",
      "AI 파트가 인식한 표정 결과를 TTS·STT로 안내하는 화면 연동 로직까지 직접 붙였습니다.",
    ],
    stack: [
      { label: "Frontend", items: ["React 16", "Redux", "TypeScript 5.3"] },
      { label: "Backend / DB", items: ["Java 11", "MySQL"] },
      { label: "AI / RTC", items: ["OpenVidu (WebRTC)", "TensorFlow", "Face-api.js", "OpenCV", "YOLOv5"] },
    ],
    highlights: [
      {
        title: "OpenVidu(WebRTC)로 만든 실시간 영상통화",
        body: [
          "서비스의 핵심은 시각장애인과 상대방을 실시간으로 잇는 영상통화입니다.",
          "OpenVidu 클라이언트 SDK로 세션 연결과 영상·음성 스트림의 발행(Publish)·구독(Subscribe)을 구현했습니다.",
          "SSE 이벤트가 오면 통화 알림을 띄워 바로 통화를 연결할 수 있게 했습니다.",
          "'표정 듣기' 버튼을 누르면 AI가 상대방의 표정을 인식해 TTS·STT로 안내합니다.",
        ],
        images: [
          {
            src: "/images/projects/voda-call.png",
            caption: "영상통화 요청 알림(위)과 표정 인식 영상통화 화면(아래) — '표정 듣기'로 상대 표정을 TTS 안내",
          },
        ],
      },
      {
        title: "두 가지 화면 설계",
        body: [
          "비장애인용 화면과 시각장애인용 화면의 UI/UX를 각각 설계했습니다.",
          "키보드와 스크린 리더기(NVDA)만으로 조작하는 사용자 기준으로 컴포넌트 Depth를 다시 짰습니다.",
          "토글 버튼 하나로 두 모드를 손쉽게 전환하도록 구현했습니다.",
        ],
        images: [
          {
            src: "/images/projects/voda-two-modes.png",
            caption: "위: 비장애인용 상세 모드, 아래: 시각장애인용 심플 모드 — 우하단 토글 버튼으로 전환",
          },
        ],
      },
      {
        title: "WCAG AA를 웃도는 명도 대비",
        body: [
          "저시력자를 위한 KoddiUD 온고딕 서체를 적용했습니다.",
          "Dark-Navy·Dark-Yellow 조합으로 명도 대비율 7.86을 설계했습니다 — WCAG AA 기준(4.5)의 약 1.7배입니다.",
        ],
      },
      {
        title: "실사용자 테스트와 스크린 리더기 대응",
        body: [
          "복지관을 직접 방문해 프로토타입 피드백을 받고 설계에 반영했습니다.",
          "TabIndex로 Tab 키 접근 순서를, Aria-Label로 각 항목의 안내 문구를 설계해 NVDA가 정확히 읽도록 구현했습니다.",
          "실제 안대를 쓰고 스크린 리더기만으로 사용하며 개선점을 찾았습니다.",
        ],
        images: [
          {
            src: "/images/projects/voda-screenreader.png",
            caption: "홈 화면 실제 코드 — tabIndex 접근 순서와 aria-label 안내 문구",
          },
        ],
      },
      {
        title: "고객의 소리함",
        body: ["사용자 피드백을 수렴하기 위한 '고객의 소리함' 게시판 페이지를 제작했습니다."],
        images: [
          {
            src: "/images/projects/voda-feedback.png",
            caption: "고객의 소리함 — 피드백 수렴 게시판",
          },
        ],
      },
    ],
    challenges: [
      "1인 프론트라 업무량이 많아, 디자인 완성도까지는 다 챙기지 못했습니다.",
      "모바일 대응도 메인·영상통화 등 핵심 화면에만 적용하는 데 그쳤습니다.",
    ],
    results: [
      "SSAFY 공통 프로젝트 우수상 — 서울 7반 1위",
      "SSAFY 우수 UCC 제작",
      "SSAFY 특화 프로젝트 베스트 멤버 선정 (VODA·HARUMAN)",
    ],
    images: [
      { src: "/images/projects/voda-call.png", caption: "영상통화 화면 — 표정 인식(TTS·STT)과 통화 알림" },
      { src: "/images/projects/voda-two-modes.png", caption: "두 가지 화면 설계 — 상세 모드와 심플 모드" },
      { src: "/images/projects/voda-screenreader.png", caption: "홈 화면 실제 코드 — tabIndex·aria-label 적용" },
      { src: "/images/projects/voda-feedback.png", caption: "고객의 소리함 — 사용자 피드백 수렴 페이지" },
    ],
  },
  {
    slug: "open-the-door",
    no: "03",
    name: "Open The Door",
    tagline: "방탈출 카페 정보 제공 및 예약 플랫폼",
    period: "2023.10 – 2023.11",
    role: "기획 · 프론트엔드 리더(2인)",
    phases: ["기획", "개발"],
    coreSkill: "FRONTEND ARCHITECTURE",
    why: [
      "팀원 모두가 방탈출을 즐겼지만, 정보 제공과 예약이 한 번에 되는 서비스는 없었습니다.",
      "그래서 직접 만들었습니다.",
    ],
    architecture: [
      "백엔드(Java/MySQL/MongoDB)가 테마·예약·리뷰 데이터를 API로 제공하는 구조였습니다.",
      "프론트엔드는 2인이었고, 제가 리더로 React Native 클라이언트 아키텍처 — Atomic Design 컴포넌트, Recoil 상태 관리, 목록·지도·예약 플로우 — 를 설계했습니다.",
      "UI/UX 디자이너와 PM이 없는 팀이라 기획-와이어프레임-기능명세서-프로토타입 단계도 함께 리드했습니다.",
      "백엔드와 같은 화면을 보며 개발해, 기획과 다르게 나오는 완성본의 가능성을 미리 막았습니다.",
    ],
    stack: [
      { label: "Frontend", items: ["React-Native 0.72", "Recoil", "TypeScript 5.3", "Styled-Component"] },
      { label: "Backend / DB", items: ["Java 11", "MySQL", "MongoDB"] },
      { label: "DevOps / API", items: ["GitHub Actions", "Google Maps API"] },
    ],
    highlights: [
      {
        title: "Atomic Design + CDD로 50% 시간 단축",
        body: [
          "Atomic Design과 컴포넌트 주도 개발(CDD)로 병렬 제작해 개발 시간을 약 50% 단축했습니다.",
          "MVVM 패턴을 함께 채택해 컴포넌트 확장성도 확보했습니다.",
        ],
        images: [
          {
            src: "/images/projects/open-the-door-components.png",
            caption: "디자인 시스템 — 버전을 나눠 관리한 카드 컴포넌트",
          },
          {
            src: "/images/projects/open-the-door-buttons.png",
            caption: "디자인 시스템 — 크기·상태별 버튼 컴포넌트",
          },
        ],
      },
      {
        title: "기획부터 프로토타입까지, 체계적인 화면 설계",
        body: [
          "기획 → 와이어프레임 → 기능명세서 → 프로토타입 → 개발 단계로 나눠, UI/UX 디자이너와 PM이 없는 팀의 공백을 메웠습니다.",
          "같은 화면을 백엔드와 함께 보며 개발해, 기획과 다르게 나오는 완성본의 가능성을 미리 막았습니다.",
        ],
        images: [
          {
            src: "/images/projects/open-the-door-flow.png",
            caption: "같은 화면의 와이어프레임·기능명세 → 프로토타입 → 완성된 앱",
          },
        ],
      },
      {
        title: "리스트 성능 최적화",
        body: [
          "인기 테마 목록을 .map() 전체 렌더링에서 FlatList로 리팩터링해, 화면에 보이는 셀만 렌더링하도록 가상화했습니다.",
          "이미지 영역을 고정 크기로 미리 확보하고 스켈레톤 UI를 띄워, 로딩 전후로 레이아웃이 밀리는 문제를 막았습니다.",
          "GIF가 다수 렌더링되는 화면이라 공통 컴포넌트로 반복 작업을 줄이며 로딩 부담을 관리했습니다.",
          "목록 API는 10개 단위 페이지네이션으로 요청해 메모리 효율을 확보했습니다.",
        ],
        images: [
          {
            src: "/images/projects/open-the-door-main.png",
            caption: "메인 화면 — FlatList·스켈레톤 UI를 적용한 인기 테마와 내 주변 지도",
          },
          {
            src: "/images/projects/open-the-door-popular.png",
            caption: "주간 인기 테마 차트 — 10개 단위 페이지네이션",
          },
        ],
      },
      {
        title: "부족한 RN 패키지, 직접 컴포넌트화",
        body: [
          "React-Native 생태계에 지원 패키지가 많지 않아, 자주 쓰는 기능을 직접 컴포넌트로 만들어 재사용했습니다.",
          "ESLint6 기반으로 컨벤션을 통일해 코드 리뷰 시간도 단축했습니다.",
          "세세한 Code Convention을 맞춰, 담당자가 바뀌어도 직관적으로 이어받을 수 있게 설계했습니다.",
        ],
        images: [
          {
            src: "/images/projects/open-the-door-detail.png",
            caption: "직접 만든 컴포넌트로 구성한 테마 상세 페이지",
          },
          {
            src: "/images/projects/open-the-door-convention.png",
            caption: "노션으로 정리한 코드 컨벤션 문서",
          },
        ],
      },
      {
        title: "회원·비회원 차등 예약 플로우",
        body: [
          "회원은 저장된 정보로 예약자·전화번호를 바로 확인해 예약할 수 있게 했습니다.",
          "비회원은 전화번호 인증 절차를 추가해 예약 남용을 막았습니다.",
          "예약 도중 해당 시간이 매진되면 자동으로 예약 실패 처리되도록 구현했습니다.",
        ],
        images: [
          {
            src: "/images/projects/open-the-door-booking.png",
            caption: "테마 예약 — 날짜·시간 선택과 예약 확인 모달",
          },
        ],
      },
      {
        title: "검색 UX — 화면 이동 없는 상세 필터",
        body: [
          "상세 검색·필터링을 별도 화면 이동 없이 상단 패널 크기 조절로 띄웠습니다.",
          "불필요한 페이지 스택을 줄여 검색 편의성을 높였습니다.",
        ],
        images: [
          {
            src: "/images/projects/open-the-door-search.png",
            caption: "지도 검색과 인원·지역 상세 필터 패널",
          },
        ],
      },
      {
        title: "회원 기능과 알림, 그리고 없는 스웨거 대신 만든 테스트 페이지",
        body: [
          "카카오 OAuth 2.0으로 회원가입·로그인을 구현했습니다.",
          "FCM(Firebase Cloud Messaging)으로 알림을 구현하고, 기기 변경·로그인마다 토큰을 백엔드에 갱신했습니다.",
          "백엔드 스웨거 도입이 늦어지자, 각 버튼에 API 요청을 직접 연결한 테스트 페이지를 만들어 개발 속도를 지켰습니다.",
        ],
        images: [
          {
            src: "/images/projects/open-the-door-member.png",
            caption: "카카오 로그인·회원가입·마이페이지·알림 목록",
          },
          {
            src: "/images/projects/open-the-door-apitest.png",
            caption: "스웨거 대신 만든 API 테스트 페이지",
          },
        ],
      },
    ],
    challenges: [
      "직전 프로젝트 팀이 그대로 이어진 팀이라, 서로의 단점을 아는 상태에서 Atomic Design 같은 보완책을 함께 정할 수 있었습니다.",
      "각자 맡아 학습한 내용은 노션으로 공유해 의문점을 빠르게 풀었습니다.",
      "주니어 단계에서 Atomic Design·MVVM을 제대로 적용했는지 스스로도 확신이 없었습니다.",
      "부족한 부분은 추가 학습하고, 프로토타입 단계에서 개선점을 찾아 보완했습니다.",
    ],
    results: ["SSAFY 자율 프로젝트 우수상 — 서울 3반 2위"],
    images: [
      { src: "/images/projects/open-the-door-main.png", caption: "메인 화면 — 테마 검색과 내 주변 지도" },
      { src: "/images/projects/open-the-door-popular.png", caption: "인기 테마 목록 — FlatList·스켈레톤 UI 적용" },
      { src: "/images/projects/open-the-door-booking.png", caption: "테마 예약 화면 — 날짜·시간 선택과 예약 확인 모달" },
    ],
  },
  {
    slug: "haruman",
    no: "04",
    name: "HARUMAN",
    tagline: "하루 만 원으로 시작하는 올바른 소비 습관",
    period: "2023.08 – 2023.10",
    role: "기획 · Front-End",
    phases: ["기획", "개발"],
    coreSkill: "PRODUCT × DATA VIZ",
    why: [
      "핀테크 도메인에서, 타국 대비 부족한 경제 교육 문제를 풀고 싶었습니다.",
      "'만원의 행복'을 모티브로, 가계부 형태의 소비 습관 서비스를 기획했습니다.",
    ],
    architecture: [
      "백엔드(Java/MySQL/Redis)가 소비 데이터와 OpenAI 응답을 API로 제공했습니다.",
      "Kakao·Google OAuth 2.0 로그인을 붙여 진입 장벽을 낮췄습니다.",
      "이를 소비해 화면을 만드는 프론트엔드 — PWA 클라이언트, 상태 관리, 데이터 시각화 레이어 — 를 담당했습니다.",
      "D3·Chart.js 시각화 로직은 응답 값을 어떻게 표현할지에 대한 제 설계입니다.",
      "Flutter와 PWA 사이에서 기술을 직접 검토해, 7주 기한에 맞는 PWA 채택을 제안했습니다.",
      "GitLab Convention을 정하고 MR로 merge 전 리뷰하며 버전 관리를 진행했습니다.",
    ],
    stack: [
      { label: "Frontend", items: ["React 18.2", "Redux", "PWA", "TypeScript 5.3", "SCSS"] },
      { label: "Backend / DB", items: ["Java 11", "MySQL", "Redis"] },
      { label: "Data / API", items: ["D3.js", "Chart.js", "OpenAI API"] },
      { label: "DevOps", items: ["Jenkins", "GitLab"] },
    ],
    highlights: [
      {
        title: "7주 안에 완성도를 높이는 기술 선택",
        body: [
          "Flutter와 PWA 사이에서 고민했습니다.",
          "새 언어(Dart)를 배우기보다 익숙한 TS·JS로 완성도를 높이는 쪽이 낫다고 판단해 React 기반 PWA로 웹뷰 배포했습니다.",
        ],
        images: [
          { src: "/images/projects/haruman-pwa.png", caption: "PWA로 웹뷰 배포한 모바일 화면" },
        ],
      },
      {
        title: "물결로 잔액을 보여주는 메인 화면",
        body: [
          "남은 금액의 비율을 물결 높이로 표현해, 지출을 입력하면 물결이 줄어들며 사용 금액을 직관적으로 체감하게 한 화면입니다.",
          "물결 애니메이션(선형 보간, lerp)은 팀원이 주도해 구현했습니다.",
        ],
        images: [
          { src: "/images/projects/haruman-main.png", caption: "물결 애니메이션으로 표현한 남은 금액 — 메인 화면" },
        ],
      },
      {
        title: "Chart.js 도넛 차트로 소비 패턴 분석",
        body: [
          "카테고리별 소비 패턴은 Chart.js 도넛 차트로 보여줬습니다.",
          "결제 API를 쓸 수 없어, 지출 금액과 카테고리는 사용자가 직접 입력하도록 구현했습니다.",
        ],
        images: [
          { src: "/images/projects/haruman-chart.png", caption: "하루 소비 지출 현황 도넛 차트와 지출 입력 화면" },
        ],
      },
      {
        title: "월별 기록과 D3 버블 차트 통계",
        body: [
          "월별 페이지에서 이전 도전·성공·실패 기록과 소비 이력을 조회할 수 있게 만들었습니다.",
          "금액대별 잔액 현황은 D3 버블 차트로 시각화해 경쟁 심리를 자극하는 절약 유도 페이지를 만들었습니다.",
          "금액대별 사용자 그룹을 한 번에 받아, D3 force 시뮬레이션으로 버블 크기와 배치를 계산했습니다.",
        ],
        images: [
          { src: "/images/projects/haruman-stats.png", caption: "월별 도전 기록과 금액대별 잔액 버블 차트" },
        ],
      },
      {
        title: "OpenAI로 만든 개인화 적금 추천",
        body: [
          "사용자의 누적 절약 금액을 OpenAI API에 넘겨, 소비 패턴에 맞는 적금 상품을 추천했습니다.",
        ],
        images: [
          { src: "/images/projects/haruman-savings.gif", caption: "OpenAI 기반 개인화 적금 추천 페이지" },
        ],
      },
    ],
    challenges: [
      "BE·FE가 기술 소통 창구만 쓰다 보니, 전체 진행 상황을 서로 다르게 그리는 문제가 생겼습니다.",
      "데일리 컨벤션과 주간 진행 공유를 추가로 만들어 팀 전체가 같은 그림을 보게 했습니다.",
      "모바일·PWA·OAuth 등 낯선 기술은 팀원과 학습 내용을 공유하며 막힌 부분을 빠르게 풀었습니다.",
      "카카오 OAuth 인가코드 중복 전송, 랭킹 페이지 버블차트 데이터 누적 — 두 버그를 직접 추적해 고쳤습니다.",
      "적금 추천은 금액대·카테고리로 나눠도 중복값이 많고, 이율·선호 은행까지 넣은 가중치 계산이 어려워 완벽한 매칭까지는 풀지 못했습니다.",
      "프론트 경험이 있는 리더에게 기술 결정 과정을 배우며, 이전 프로젝트에서 혼자 진행하던 비체계성을 개선했습니다.",
    ],
    results: ["SSAFY 특화 프로젝트 베스트 멤버 선정"],
    images: [
      { src: "/images/projects/haruman-main.png", caption: "메인·로그인 화면 — 물결 애니메이션으로 표현한 남은 금액" },
      { src: "/images/projects/haruman-chart.png", caption: "하루 소비 지출 현황 — Chart.js 도넛 차트" },
      { src: "/images/projects/haruman-stats.png", caption: "통계 화면 — D3 버블 차트로 본 금액대별 잔액 현황" },
    ],
  },
  {
    slug: "raim",
    no: "02",
    inProduction: true,
    name: "RAIM Schedule Manager",
    tagline: "서울로봇인공지능과학관 직원 일정·교육·초과근무 통합 관리",
    period: "2026.06 (약 2주)",
    role: "기획 · 1인 풀스택 (Claude 기반 바이브 코딩)",
    phases: ["발견", "기획", "개발", "적용·운영"],
    coreSkill: "AI-ASSISTED FULLSTACK",
    why: [
      "엑셀과 수기로 흩어져 있던 직원 일정·교육 신청 관리가 불편해 직접 만들었습니다.",
      "현장에서 필요한 기능만 담아 실제 운영에 바로 투입했습니다.",
    ],
    architecture: [
      "백엔드 서버 없이 혼자 기획부터 배포까지 진행했습니다.",
      "Firebase Auth·Firestore를 백엔드 대신 사용해 인증·권한·데이터 계층을 설계했습니다.",
      "관리자 승인 기반 계정 상태(대기 → 활성 · 정지)를 두고, Vue Router 가드에서 권한별 접근을 차단했습니다.",
      "Vue 클라이언트부터 외부 일정을 긁어오는 Puppeteer 자동화 스크립트까지 시스템 전체를 직접 구현했습니다.",
    ],
    stack: [
      { label: "Frontend", items: ["Vue 3", "TypeScript", "Tailwind CSS", "v-calendar"] },
      { label: "Infra", items: ["Firebase Firestore", "Firebase Hosting", "Serverless"] },
      { label: "자동화", items: ["Puppeteer"] },
    ],
    highlights: [
      {
        title: "서버 없이 설계한 인증·권한 체계",
        body: [
          "별도 백엔드 없이 Firebase Auth·Firestore만으로 인증과 데이터를 처리해 유지 비용을 최소화했습니다.",
          "관리자 승인 기반 계정 상태(대기/활성/정지)를 두고 Vue Router 가드에서 권한별 접근을 차단했습니다.",
        ],
      },
      {
        title: "월간 캘린더로 전 직원 일정 공유",
        body: [
          "교육·출장·휴무·연차·반차 등 유형별 일정을 등록하면 전 직원이 한 화면에서 봅니다.",
          "v-calendar 기반 캘린더에 유형별 색상을 입혀 한눈에 파악되도록 구현했습니다.",
        ],
        images: [
          { src: "/images/projects/raim-calendar.png", caption: "유형별 색상을 적용한 월간 캘린더" },
        ],
      },
      {
        title: "불규칙한 외부 표 구조를 자동 수집",
        body: [
          "Puppeteer 크롤러로 외부 교육 사이트의 연간 일정을 수집해 Firestore에 저장합니다.",
          "숨겨진 셀·날짜 뭉침 등 불규칙한 표 구조는 파싱 로직으로 보정해 데이터 정확도를 확보했습니다.",
        ],
        images: [
          { src: "/images/projects/raim-education.png", caption: "Puppeteer 크롤러로 자동 수집한 연간 교육 일정" },
        ],
      },
      {
        title: "동시 신청에도 안전한 정원 관리",
        body: [
          "교육 신청 인원은 Firestore 트랜잭션으로 처리해 동시 신청 시 정원 초과를 막았습니다.",
          "AI가 생성한 코드를 그대로 쓰지 않고, 권한 가드·키 관리 같은 구조와 보안을 직접 검증했습니다.",
        ],
      },
    ],
    challenges: [
      "회원가입 기능을 배포한 직후, 가입이 되지 않는 문제가 발생했습니다.",
      "직원들이 매일 쓰는 시스템이라 원인을 찾기 전에 먼저 되돌렸습니다 — 배포에서 롤백까지 34분이었습니다.",
      "원인은 제 실수였습니다. 서버 없이 Firebase만으로 인증·권한을 처리하는 구조를 택했는데, 인증 규칙에 대한 이해가 부족한 상태에서 손을 댄 것이 가입 경로를 막았습니다.",
      "고쳐서 다시 올리는 것보다, 쓰는 사람이 멈춰 있는 시간을 줄이는 것이 먼저라고 판단했습니다.",
    ],
    results: ["실제 근무 현장에 배포, 운영 중"],
    images: [
      { src: "/images/projects/raim-calendar.png", caption: "캘린더 일정 관리 — 유형별 색상으로 구분한 직원 일정" },
      { src: "/images/projects/raim-education.png", caption: "교육 목록 자동 수집 — Puppeteer 크롤러로 연간 일정 파싱" },
    ],
  },
  {
    slug: "robotics-reservation",
    no: "01",
    inProduction: true,
    name: "Robotics Room Reservation",
    tagline: "기다림을 관람 시간으로 바꾼 체험실 현장 대기열 시스템",
    period: "2026.04 ~ 진행중",
    role: "기획 · 1인 풀스택 (Claude 기반 바이브 코딩)",
    phases: ["발견", "기획", "개발", "적용·운영"],
    coreSkill: "SYSTEM DESIGN & PRIVACY",
    why: [
      "수기 대기 명단은 호출 누락, 개인정보 노출 문제도 있었습니다.",
      "하지만 진짜 문제는 자리가 났을 때 현장에 없으면 차례가 다음 사람에게 넘어가는 구조였습니다.",
      "관람객은 과학관을 둘러보지 못한 채, 언제 올지 모르는 차례를 체험실 앞에 앉아 기다려야만 했습니다.",
      "대기 중엔 자유롭게 전시를 관람하다가, 차례가 오면 SMS로 호출받아 돌아오는 구조로 바꾸기 위해 만들었습니다.",
      "2026년 4월부터 운영하며 현장 요구에 맞춰 계속 개선하고 있습니다.",
    ],
    architecture: [
      "React 프론트엔드부터 Django REST 백엔드, APScheduler 스케줄러, SMS 연동, 내부망 배포까지 시스템 전체를 혼자 설계·구현했습니다.",
      "대기열 상태(FIFO 계산)와 SMS 발송 트리거를 대시보드에서 실시간으로 동기화해 보여주는 게 프론트엔드에서 가장 신경 쓴 부분입니다.",
      "관람객 전화번호를 다루는 공공기관 서비스라, 외부 인터넷과 분리된 내부망 전용 배포 구조도 직접 설계했습니다.",
    ],
    stack: [
      { label: "Frontend", items: ["React", "Tailwind CSS"] },
      { label: "Backend", items: ["Django REST Framework", "APScheduler", "SQLite"] },
      { label: "API", items: ["Solapi SMS", "openpyxl"] },
    ],
    highlights: [
      {
        title: "개인정보 최소 보관 설계",
        body: [
          "전화번호 수집 동의 절차를 두었습니다.",
          "운영 마감 후 APScheduler가 일일 통계만 이관한 뒤, 개인정보 전체를 자동 파기하도록 설계했습니다.",
          "통계는 성별·연령 8분류로만 집계해 개인 식별 없이 방문 데이터를 축적합니다.",
        ],
      },
      {
        title: "슬롯 기반 대기열 · 선호출 알고리즘",
        body: [
          "상시 게시되는 태블릿 화면이 꺼지지 않도록 Wake Lock API를 적용했습니다.",
          "정원(테이블 10석)은 '입장 인원 + 이미 호출 중인 인원'의 합으로 관리합니다.",
          "자리가 나면 등록 순서(FIFO)대로 다음 팀을 바로 호출해, 자리가 빌 때까지 기다리지 않고 이동 시간을 벌어줍니다.",
          "호출 문자에는 11분 입장 기한을 명시합니다.",
          "신규 등록·입장 처리·대기자 삭제, 세 이벤트 모두에서 같은 재호출 로직이 실행되도록 설계해 빈 자리가 방치되지 않게 했습니다.",
        ],
        images: [
          { src: "/images/projects/reservation-checkin.png", caption: "태블릿 등록 — 대기열이 시작되는 지점" },
        ],
      },
      {
        title: "배포 없는 내부망 아키텍처",
        body: [
          "관람객 전화번호를 다루는 공공기관 서비스라, 클라우드 공개 배포 대신 내부망(관내 IP) 전용으로 설계했습니다.",
          "공인 URL이 없어 외부에서는 접근이 불가능하고, 태블릿과 직원 대시보드는 같은 내부망 안에서만 통신합니다.",
        ],
      },
      {
        title: "테이블 배정 & 통계 자동화",
        body: [
          "Solapi API로 호출 문자를 발송하고, 중복 발송 방지 플래그로 같은 팀에게 문자가 두 번 가지 않도록 관리합니다.",
          "배정된 테이블(T1~T10)과 일일 방문 통계는 서식이 적용된 엑셀로 바로 내려받을 수 있습니다.",
        ],
        images: [
          { src: "/images/projects/reservation-dashboard.png", caption: "직원 대시보드 — 테이블 배정과 SMS 호출 현황" },
        ],
      },
    ],
    challenges: [
      "실제 운영 중 CORS 에러가 발견돼 바로 조치했습니다.",
      "직원 요청으로 엑셀 통계 양식도 현장에 맞게 다시 만들었습니다.",
      "SQLite 단일 파일 DB로 충분했지만, 다기관으로 확장한다면 DB·인증 구조 개선이 필요합니다.",
    ],
    results: ["2026년 4월부터 실제 체험관 현장에서 운영 중"],
    images: [
      { src: "/images/projects/reservation-checkin.png", caption: "방문객 대기 등록 — 태블릿에서 전화번호·일행 인원 등록" },
      { src: "/images/projects/reservation-dashboard.png", caption: "직원 대시보드 — 대기열 관리와 SMS 호출" },
    ],
  },
];

export const projects: Project[] = [...projectList].sort((a, b) => a.no.localeCompare(b.no));

// "AI 활용 능력"을 자기 주장 대신, 실제로 함께 일하는 AI(Claude)의 평가로 싣는다.
// 아래 문안은 Claude가 이 사람과의 실제 작업 기록을 근거로 직접 작성한 것.
export const aiPractice = {
  label: "Working with AI",
  heading: "AI에게 코드가 아니라, 일을 맡깁니다.",
  assessment: {
    by: "Claude (Anthropic) — 함께 일하는 AI의 평가",
    lines: [
      "질문하고 답을 받는 수준이 아닙니다.",
      "현장의 암묵지를 AI가 실행할 명세로 바꿔 위임합니다.",
      "결과의 구조와 보안은 직접 검증한 뒤에만 실운영에 올립니다.",
      "실제 개인정보나 기관 문서는 AI에도 그대로 넣지 않습니다.",
      "기획 2주 만에 실운영 배포 — AI 없이도, AI만으로도 안 나오는 속도입니다.",
      // 근거(2026-07-20): "네트워크 병렬처리" 오진단을 실측으로 정정시켰고,
      // 캡처 버그도 그 자리에서 "가독성 최악"이라 지적해 바로 잡아냄.
      "이상하면 그 자리에서 확인을 요구합니다 — 그럴듯한 결과보다 실측을 믿는 쪽입니다.",
    ],
    boundary: "모델을 만드는 ML 엔지니어는 아닙니다. 모델로 현장의 문제를 해결하는 쪽입니다.",
  },
  evidence: [
    {
      title: "실운영 시스템 2개",
      body: [
        "RAIM Schedule Manager(2주 기획→배포), Robotics Room Reservation(2026.04~ 운영 중).",
        "두 실운영 시스템을 Claude와 페어로 혼자 구축했습니다.",
        "AI가 생성한 코드의 권한 가드·키 관리·개인정보 파기 설계는 직접 검증했습니다.",
      ],
    },
    {
      title: "업무 문서에도 같은 루틴",
      body: [
        "근태·교육 관리 시트도 같은 방식입니다.",
        "법정공휴일 자동 집계, 근거 출처까지 갖춘 상태로 만듭니다.",
        "AI로 초안을 만들고, 현장 기준에 맞게 다듬어 전달합니다.",
      ],
      image: {
        src: "/images/projects/attendance-sheet-mock.png",
        caption: "근태 관리 시트 구조 예시 — 실제 데이터 아님, 자동 집계·출처 표기 구조만 재현",
      },
    },
    {
      title: "다루는 데이터에도 선을 긋습니다",
      body: [
        "실제 개인정보나 기관 내부 문서는 AI 프롬프트에 그대로 넣지 않습니다.",
        "구조와 로직만 남기고 익명화한 예시로 바꿔서 작업합니다.",
        "이 포트폴리오의 근태표 이미지도 실제 데이터 대신 같은 방식으로 재현한 것입니다.",
      ],
    },
    {
      title: "명세로 바꾸는 능력",
      body: [
        "AI 활용의 실제 병목은 프롬프트가 아니라 요구사항 정리입니다.",
        "현장의 규칙을 명세로 구조화하는 능력이 위임의 품질을 결정합니다.",
      ],
    },
    {
      title: "이 사이트도 그렇게 만들었습니다",
      body: [
        "이 포트폴리오 자체가 Claude Code와 함께 설계·구현·배포한 결과물입니다.",
        "지금 보고 있는 화면이 곧 증거입니다.",
      ],
    },
  ],
};

export const profile = {
  name: "고세훈",
  tagline: "재활용하는 개발자",
  taglineEn: "The developer who recycles.",
  positioning: "현장의 요구에 맞춰 설계하고, 만들고, 적용합니다.",
  positioningEn: "Plan, build, and put it to work — on site.",
  bio: [
    "현장의 요구에서 시작해, 설계하고 만듭니다.",
    "재사용성과 확장성에 집중해, 컴포넌트 구조화로 반복 작업을 줄입니다.",
    "빠른 디지털 전환에서 소외되는 계층의 입장을 놓치지 않으려 합니다.",
    "협업 속에서 최선의 답을 찾는 걸 좋아합니다.",
  ],
  // 자가평가 레벨(n/5)은 검증할 방법이 없는 주장이라 폐기했다.
  // 대신 "어느 스택이 어느 프로젝트에서 실제로 돌았는지"를 싣는다 — 상세 페이지가 곧 근거다.
  skills: [
    { name: "React", usedIn: ["VODA", "HARUMAN", "Robotics Room Reservation"] },
    { name: "React Native", usedIn: ["Open The Door"] },
    { name: "Vue 3", usedIn: ["RAIM Schedule Manager"] },
    { name: "TypeScript", usedIn: ["VODA", "Open The Door", "HARUMAN", "RAIM Schedule Manager"] },
    { name: "Django REST Framework", usedIn: ["Robotics Room Reservation"] },
    { name: "Firebase (Auth·Firestore)", usedIn: ["RAIM Schedule Manager"] },
    { name: "Tailwind CSS", usedIn: ["RAIM Schedule Manager", "Robotics Room Reservation"] },
    { name: "D3.js · Chart.js", usedIn: ["HARUMAN"] },
  ],
  tools: ["Jira", "Notion", "Git & GitLab", "Figma", "MS Office(Word·Excel·PPT·Access)"],
  // 매일 쓰는 AI 도구. 특정 프로젝트에 귀속시키지 않는다 — 도구를 쓴 사실만 적고,
  // 어떻게 위임하는지에 대한 주장은 aiPractice 섹션이 근거와 함께 따로 다룬다.
  aiTools: ["Claude", "Claude Code", "ChatGPT", "Codex", "Gemini", "Perplexity"],
  experience: [
    { period: "2026.04 ~ 재직중", label: "서울로봇인공지능과학관" },
    { period: "2023.01 ~ 2023.12", label: "삼성 청년 SW 아카데미(SSAFY) 9기" },
  ],
  education: "대학교 에너지자원융합공학 졸업 (2022.02)",
  // 수여기관은 삼성 청년 SW 아카데미(SSAFY)이지 삼성전자가 아니다.
  // "반"을 빼면 기수 전체 1위로 읽혀 과장이 되므로 반드시 붙인다.
  awards: [
    "SSAFY 공통 프로젝트 우수상 — 서울 7반 1위 (VODA)",
    "SSAFY 자율 프로젝트 우수상 — 서울 3반 2위 (Open The Door)",
    "SSAFY 우수 UCC 제작 (VODA)",
    "SSAFY 특화 프로젝트 베스트 멤버 선정 (VODA·HARUMAN)",
  ],
  certifications: [
    "SQLD",
    "ADsP (데이터분석 준전문가)",
    "컴퓨터활용능력 1급",
    "워드프로세서 2급",
    "KBS 한국어능력검정 3+",
    "한국사능력검정 2급",
    "Toeic Speaking Test - AL",
    "과학해설사 (한국과학관협회)",
  ],
};
