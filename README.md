# 도와드림 프론트엔드

노원구 어르신용 병원 찾기 웹앱 「도와드림」의 화면입니다. React + Vite + TypeScript + Tailwind CSS로 만들고 Vercel에 배포합니다.

## 실행

Node.js 20 이상이 필요합니다.

```bash
npm install
cp .env.example .env.local   # 백엔드 주소 (기본 http://localhost:8080)
npm run dev                  # http://localhost:5173
```

백엔드([dowadream-be](https://github.com/dowadream-makers/dowadream-be))를 함께 켜야 병원 목록이 나옵니다.

| 명령 | 하는 일 |
|---|---|
| `npm run dev` | 개발 서버 |
| `npm run build` | 타입 검사 + 배포용 빌드 (`dist/`) |
| `npm run lint` | 코드 검사 (oxlint) |

## 폴더 구조

```
src/
├ main.tsx            앱 시작 (React Query, 라우터)
├ App.tsx             주소 → 화면 연결
├ index.css           색·글꼴 (시안 팔레트)
├ api/                백엔드 호출 (client.ts, hospitals.ts)
├ components/         Layout(상단바·하단 탭), WaitingBox(대기 표시)
└ pages/              화면 하나 = 파일 하나
```

## 화면 진행 상황 (최종 시안 01~18 기준)

| 주소 | 시안 | 상태 |
|---|---|---|
| `/` | 01 홈 | 기본 배치만 |
| `/symptom` | 03·04·05 증상 선택·확인 경고 | 준비 중 |
| `/hospitals` | 06 병원 목록 | API 연결됨 (관심 별·길찾기 버튼은 아직) |
| `/hospitals/:id` | 08 병원 정보 | API 연결됨 |
| `/emergency` | 11·12 119 안내 | 준비 중 |
| `/my` | 13·14·15 내 정보 | 준비 중 |
| — | 02 지역 변경, 07 관심 병원, 09 전화 안내, 10 길찾기, 16·17 빠른 확인 | 아직 없음 |
| `/admin` | 관리자·레이더 시연 화면 | 아직 없음 |

## 디자인 규칙 (요약)

- 색: 블러시 `bg-blush` #FCE4ED, 핑크 `bg-pink` #F5548C, 터쿼이즈 `bg-teal` #00A7B7, 크림 `bg-cream` #FFFBF6, 글자 `text-ink` #1F1F1F, 119·주의 `text-danger` #E5484D
- 그라데이션은 **홈 배경에만**. 버튼은 단색.
- 글꼴 Pretendard, 본문 17px 이상. "Aa 글자 크게"는 `html` 글자 크기를 바꿔 rem 전체를 키웁니다.
- 관심 병원·글자 크기·지역은 브라우저(localStorage)에만 저장하고 서버로 보내지 않습니다.

## Vercel 배포

1. Vercel에서 이 저장소를 Import (Framework: Vite, 자동 인식)
2. Environment Variables에 `VITE_API_BASE_URL` = 백엔드(Render) 주소
3. main에 push하면 자동 배포, PR마다 미리보기 주소가 생깁니다.

`vercel.json`은 `/hospitals/1` 같은 주소로 바로 들어와도 화면이 뜨게 해 줍니다.
