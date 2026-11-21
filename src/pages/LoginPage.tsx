import { useQuery } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router'
import { fetchProviders, loginStartUrl } from '../api/auth'
import Icon from '../components/Icon'
import { AppBar, Screen } from '../components/Screen'
import type { LoginProvider } from '../lib/storage'

/** 로그인 끝나고 돌아갈 화면 (회사 로그인 화면을 다녀오는 동안 기억) */
export const LOGIN_RETURN_KEY = 'dowadream.loginReturn'

const BUTTONS: { provider: LoginProvider; label: string; className: string; logo: ReactNode }[] = [
  {
    provider: 'kakao',
    label: '카카오로 시작하기',
    className: 'btn btn-kakao',
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#000" d="M12 3.5c-5 0-9 3.1-9 7 0 2.5 1.7 4.7 4.2 6l-1 3.6c-.1.3.3.6.6.4l4.3-2.8c.3 0 .6.1.9.1 5 0 9-3.1 9-7s-4-7.3-9-7.3z" />
      </svg>
    ),
  },
  {
    provider: 'naver',
    label: '네이버로 시작하기',
    className: 'btn btn-naver',
    logo: (
      <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
        <path fill="#fff" d="M13.6 10.7 6.1 0H0v20h6.4V9.3L13.9 20H20V0h-6.4z" />
      </svg>
    ),
  },
  {
    provider: 'google',
    label: '구글로 시작하기',
    className: 'btn btn-google',
    logo: (
      <svg width="22" height="22" viewBox="0 0 48 48" aria-hidden="true">
        <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.6 2.4 30.2 0 24 0 14.6 0 6.6 5.4 2.6 13.2l7.8 6C12.3 13.6 17.7 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.3-4.6 6.9l7.5 5.8c4.4-4 6.8-10 6.8-17.2z" />
        <path fill="#FBBC05" d="M10.4 28.8c-.5-1.5-.8-3.1-.8-4.8s.3-3.3.8-4.8l-7.8-6C.9 16.5 0 20.1 0 24s.9 7.5 2.6 10.8l7.8-6z" />
        <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.8-5.8l-7.5-5.8c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.7-4.1-13.6-9.8l-7.8 6C6.6 42.6 14.6 48 24 48z" />
      </svg>
    ),
  },
]

/** 14 로그인: 카카오·네이버·구글 중 하나로 바로 가입·로그인 */
export default function LoginPage() {
  const from = (useLocation().state as { from?: string } | null)?.from
  const providers = useQuery({ queryKey: ['auth-providers'], queryFn: fetchProviders, staleTime: 10 * 60_000 })
  const shown = BUTTONS.filter((b) => providers.data?.includes(b.provider))

  const start = (provider: LoginProvider) => {
    try {
      sessionStorage.setItem(LOGIN_RETURN_KEY, from ?? '/my')
    } catch {
      // 저장하지 못하면 내 정보 화면으로 돌아감
    }
    window.location.href = loginStartUrl(provider)
  }

  return (
    <Screen>
      <AppBar title="로그인" back />
      <div className="content" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ textAlign: 'center', margin: '30px 0 24px' }}>
          <Icon name="logo" size={88} height={80} />
          <h2 style={{ fontSize: 27, fontWeight: 900, marginTop: 14, lineHeight: 1.35 }}>
            로그인하지 않아도
            <br />
            병원을 찾을 수 있어요
          </h2>
          <p className="muted" style={{ fontSize: 17, marginTop: 8, fontWeight: 600 }}>
            관심 병원을 저장할 때만 로그인해 주세요.
          </p>
        </div>
        <div className="tip">
          <Icon name="shield" style={{ flex: 'none' }} />
          <span>쓰던 계정으로 바로 시작해요. 이름·전화번호는 저장하지 않아요.</span>
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 12, paddingTop: 24 }}>
          {shown.map((b) => (
            <button key={b.provider} className={b.className} onClick={() => start(b.provider)}>
              {b.logo}
              {b.label}
            </button>
          ))}
          {providers.isPending && <div className="state">불러오는 중…</div>}
          {!providers.isPending && shown.length === 0 && <div className="state">로그인을 준비하고 있어요.</div>}
          <Link to="/hospitals" className="btn btn-ghost">
            로그인 없이 병원 찾기 ›
          </Link>
        </div>
      </div>
    </Screen>
  )
}
