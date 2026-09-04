> <del>🚧 현재 개발 중입니다.</del><br>
> 🚧 1차 초안 업로드 및 배포 완료 26.09.05<br>
> 학습 목적으로 시작한 개인 프로젝트이며, 실제 사용자의 피드백을 받아가며 개선하고 있습니다.<br>
> AI에게 구체적인 설계 지시를 주고 초안을 생성한 뒤 직접 검토·리팩토링하는 방식으로 진행합니다.

# 사서직 임용시험 모의고사 성적 분석기 (librarian-exam-tracker)

사서직 임용시험 준비생을 위한 모의고사 회차별 성적 기록 및 분석 도구입니다.

## 배포 주소

[https://librarian-exam-tracker.vercel.app/](https://librarian-exam-tracker.vercel.app/)

## 배경

이 시험은 문제 번호마다 배점이 고정되어 있습니다 (예: 1번 2점, 2번 2점 … 12번 4점)<br>
채점 자체는 간단하지만, 어떤 세부과목에서 반복적으로 점수를 잃는지는 점수만 봐서는 파악하기 어렵습니다.

## 이 도구가 하는 일

응시 후 각 문제에 세부과목을 태깅하고 맞은 점수를 입력하면:

- 문제 단위 기록이 자동으로 **세부과목별로 집계**됩니다
- 예: A세부과목 10점 중 6점 정답 → 정답률 60%
- 회차를 거듭할수록 어떤 세부과목에서 점수를 잃는 경향이 있는지 그래프로 확인할 수 있습니다

## 기술 스택

| 영역 | 기술 |
|---|---|
| 마크업/스타일 | HTML5, CSS3 |
| 로직 | Vanilla JavaScript (ES Modules) |
| 공통 UI | Web Components (Custom Elements) |
| 그래프 | Chart.js |
| 데이터 저장 | localStorage (백엔드 서버 없음) |
| 배포 | Vercel (정적 호스팅) |

## 폴더 구조

```
librarian-exam-tracker/
├── index.html              # 홈 화면 / 수동 백업
├── pages/
│   ├── record.html         # 문제별 세부과목/점수 입력
│   └── history.html        # 회차 목록 및 세부과목별 그래프 조회
├── css/
│   ├── header.css
│   ├── main.css
│   └── footer.css
└── js/
    ├── components/
    │   ├── app-header.js   # <app-header> 컴포넌트
    │   └── app-footer.js   # <app-footer> 컴포넌트
    ├── storage.js          # localStorage 읽기/쓰기
    ├── rounds.js           # 회차/문항 저장 및 세부과목별 집계
    ├── charts.js           # Chart.js 렌더링
    ├── record-page.js      # record.html 진입점
    ├── history-page.js     # history.html 진입점
    ├── home-page.js
    ├── modal.js
    └── config.js

```

## 로컬 개발 시 주의사항

정적 파일로만 구성되어 있어 서버 없이도 동작하지만, 절대경로(`/css`, `/js`)를 쓰고 있어<br>
`file://`로 직접 열면 깨질 수 있습니다. 로컬에서 확인할 때는 VS Code의 **Live Server** <br>
확장 등으로 서버를 띄워서 열어야 합니다.<br> 
(배포된 주소로 접속할 때는 해당사항 없음)

## 데이터 관련 안내

모든 데이터는 사용자의 브라우저 `localStorage`에만 저장됩니다. 별도의 서버나 데이터베이스로 <br>
전송되지 않으며, 브라우저 저장소를 초기화하면 기록이 삭제됩니다. 기기 간 동기화는 지원하지 않습니다.

## 진행 일정

| 항목 | 날짜 |
|---|---|
| 개발 시작일 | 2026-09-05 |
| 배포 시작일 | 2026-09-05 |
| 업데이트 | - |
| 종료일 | - |

## 문의

버그 제보나 문의는 [Issues](https://github.com/staytraveler/librarian-exam-tracker/issues) 탭을 이용해 주세요.
