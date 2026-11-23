import { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router'

const TABS = [
  { to: '/', label: '홈' },
  { to: '/hospitals', label: '병원 찾기' },
  { to: '/my', label: '내 정보' },
]

// 상단바("Aa 글자 크게") + 하단 탭. 글자 크기 설정은 이 기기(localStorage)에만 저장.
export default function Layout() {
  const [largeText, setLargeText] = useState(() => localStorage.getItem('largeText') === '1')

  useEffect(() => {
    document.documentElement.classList.toggle('large-text', largeText)
    localStorage.setItem('largeText', largeText ? '1' : '0')
  }, [largeText])

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col">
      <header className="flex items-center justify-between px-5 py-3">
        <span className="text-xl font-black">도와드림</span>
        <button
          className="rounded-full border border-pink px-3 py-1 font-bold text-pink"
          onClick={() => setLargeText((v) => !v)}
        >
          Aa 글자 {largeText ? '보통' : '크게'}
        </button>
      </header>

      <main className="flex-1 px-5 pb-6">
        <Outlet />
      </main>

      <nav className="sticky bottom-0 grid grid-cols-3 border-t border-blush bg-white">
        {TABS.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.to === '/'}
            className={({ isActive }) => `py-3 text-center font-bold ${isActive ? 'text-pink' : 'text-gray-500'}`}
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
