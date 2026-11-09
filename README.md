# 도와드림 프론트엔드

노원구 어르신용 병원 찾기 웹앱 「도와드림」의 화면입니다. React + Vite + TypeScript로 만들고 Vercel에 배포합니다.
화면은 **최종 디자인 시안(v10, 피그마와 같은 18장)을 그대로** 옮겼습니다.

## 실행

Node.js 20 이상이 필요합니다.

```bash
npm install
cp .env.example .env.local   # 백엔드 주소 (기본 http://localhost:8080)
npm run dev                  # http://localhost:5173
```

백엔드([dowadream-BE](https://github.com/dowadream-makers/dowadream-BE))를 함께 켜야 병원·증상이 나옵니다.

| 명령 | 하는 일 |
|---|---|
| `npm run dev` | 개발 서버 |
| `npm run build` | 타입 검사 + 배포용 빌드 (`dist/`) |
| `npm run lint` | 코드 검사 (oxlint) |

## API 연동

**API 규약과 화면별 연동 방법은 백엔드 저장소 문서를 따릅니다.**

- [API 공통 규약](https://github.com/dowadream-makers/dowadream-BE/blob/main/docs/api-conventions.md)
- [API 명세](https://github.com/dowadream-makers/dowadream-BE/blob/main/docs/api-spec.md)
- [프론트 연동 가이드](https://github.com/dowadream-makers/dowadream-BE/blob/main/docs/fe-integration.md) ← 화면별로 어떤 API를 부르는지, 타입, 브라우저 저장 키

## 폴더 구조

```
public/icons.svg      시안의 아이콘 전체 (<Icon name="star" /> 로 사용)
src/
├ main.tsx            앱 시작 (React Query, 라우터)
├ App.tsx             주소 → 화면 연결
├ styles/design.css   시안 CSS 그대로 + 실제 화면용 조금
├ api/                백엔드 호출 (client, types, hospitals, symptoms)
├ lib/                브라우저 저장(storage), 위치(location), 표시 형식(format)
├ components/         Screen·AppBar·TabBar, 병원 카드, 대기 표시, 시트·모달
└ pages/              화면 (파일 위 주석에 시안 번호)
```

## 화면 (최종 시안 번호)

| 주소 | 시안 | 메모 |
|---|---|---|
| `/` | 01 홈, 02 지역 변경 | 지역은 브라우저에만 저장 |
| `/symptom` | 03 증상 선택, 04 더 보기, 05 확인 경고 | 증상은 `GET /api/symptoms` |
| `/hospitals` | 06 병원 목록, 07 관심 병원(`?tab=fav`) | 홈 "병원 이름으로 찾기"는 `?search=1` (검색칸 표시) |
| `/hospitals/:id` | 08 병원 정보, 09 전화 연결, 10 길찾기 | 길찾기는 카카오맵으로 넘김 |
| `/emergency` | 11 119 안내, 12 연락 안내(시연) | |
| `/my` | 13 내 정보, 15 로그인 후 | |
| `/login` | 14 로그인 | 데모 로그인 = 브라우저 저장 |
| `/document`, `/help` | 16, 17 | 시안대로 "준비 중" |

시안과 다르게 한 곳:
- 병원 이름 찾기용 검색칸(06)과, 불러오는 중·빈 목록·대기 정보 없음 문구는 시안에 없어서 시안의 `.field`, `.badge.b-none` 모양으로 추가했습니다.
- 10 길찾기의 대중교통 시간은 무료 API가 없어 표시하지 않습니다. 걷는 시간은 거리로 계산합니다.
- "Aa 글자 크게"는 시안이 px 단위라 화면 전체를 1.15배로 키웁니다. 좁은 폰에선 일부 버튼 글자가 두 줄이 됩니다.
- 음성 입력(03), 카메라·사진(16), 도움 요청 보내기(17), 다녀온 병원(15)은 시안의 "준비 중" 상태 그대로입니다.

## 화면을 고칠 때

1. 시안 HTML(프로젝트 공유 폴더 `ux-v9/dowadream-final-screens.html`)에서 해당 화면의 마크업을 찾습니다.
2. 같은 클래스(`btn btn-pink`, `h-card`, `wait`…)를 쓰고, 색은 `var(--pink)` 같은 변수만 씁니다.
3. 새 아이콘이 필요하면 `public/icons.svg`에 `<symbol id="...">`를 추가합니다.

## Vercel 배포

1. Vercel에서 이 저장소를 Import (Framework: Vite, 자동 인식)
2. Environment Variables에 `VITE_API_BASE_URL` = 백엔드(Render) 주소
3. main에 push하면 자동 배포. `vercel.json`은 `/hospitals/1` 같은 주소로 바로 들어와도 화면이 뜨게 해 줍니다.
