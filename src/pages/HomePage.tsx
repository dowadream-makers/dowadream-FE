import { Link } from 'react-router'

// 01 홈. 그라데이션 배경은 홈에만 씀(시안 규칙).
export default function HomePage() {
  return (
    <div className="-mx-5 -mt-3 min-h-full bg-linear-to-b from-[#fdeaf1] to-cream px-5 pt-3">
      <span className="rounded-full bg-blush px-3 py-1 text-sm font-bold text-pink">현재 지역</span>
      <p className="mt-2 text-3xl font-black">서울 노원구</p>

      <h1 className="mt-6 text-3xl font-black">어디가 불편하세요?</h1>
      <p className="mt-2 font-semibold text-gray-600">증상이나 병원 이름으로 찾아보세요.</p>

      <div className="mt-6 flex flex-col gap-3">
        <Link to="/symptom" className="rounded-[20px] bg-pink px-5 py-5 text-xl font-black text-white shadow-lg shadow-pink/30">
          증상으로 병원 찾기 ›
        </Link>
        <Link to="/hospitals" className="rounded-[20px] bg-teal px-5 py-5 text-xl font-black text-white shadow-lg shadow-teal/30">
          병원 이름으로 찾기 ›
        </Link>
      </div>

      <Link to="/emergency" className="mt-6 block rounded-2xl bg-blush px-5 py-4 text-lg font-bold text-danger">
        119 응급 안내 ›
      </Link>
    </div>
  )
}
