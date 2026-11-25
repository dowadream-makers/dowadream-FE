import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { fetchMe } from '../api/auth'
import Icon from '../components/Icon'
import { AppBar, Screen } from '../components/Screen'
import { useLogin, type LoginProvider } from '../lib/storage'
import { LOGIN_RETURN_KEY } from './LoginPage'

const ERRORS: Record<string, string> = {
  cancelled: '로그인을 취소했어요.',
  state: '로그인 시간이 지났어요. 다시 시도해 주세요.',
  failed: '로그인하지 못했어요. 잠시 뒤 다시 시도해 주세요.',
}

/** 서버가 소셜 로그인 뒤 /login/callback#token=... 으로 보내 줌 */
export default function LoginCallbackPage() {
  const { login } = useLogin()
  const navigate = useNavigate()
  const [hash] = useState(() => new URLSearchParams(window.location.hash.slice(1)))
  const token = hash.get('token')
  const [error, setError] = useState<string | null>(token ? null : (ERRORS[hash.get('error') ?? 'failed'] ?? ERRORS.failed))
  const done = useRef(false)

  useEffect(() => {
    // 주소창·방문 기록에 토큰이 남지 않게 # 뒤를 지움
    window.history.replaceState(null, '', window.location.pathname)
    if (done.current || !token) return
    done.current = true
    fetchMe(token)
      .then((me) => {
        login({ token, nickname: me.nickname, provider: me.provider.toLowerCase() as LoginProvider })
        let to = '/my'
        try {
          to = sessionStorage.getItem(LOGIN_RETURN_KEY) ?? '/my'
          sessionStorage.removeItem(LOGIN_RETURN_KEY)
        } catch {
          // 기본 화면으로
        }
        navigate(to, { replace: true })
      })
      .catch(() => setError(ERRORS.failed))
  }, [token, login, navigate])

  return (
    <Screen>
      <AppBar title="로그인" />
      <div className="content">
        {error ? (
          <div className="card" style={{ textAlign: 'center', padding: '26px 18px', marginTop: 30 }}>
            <div className="round-ic" style={{ background: 'var(--blush)' }}>
              <Icon name="user" size={36} style={{ color: 'var(--pink)' }} />
            </div>
            <div style={{ fontSize: 21, fontWeight: 900 }}>{error}</div>
            <Link to="/login" replace className="btn btn-pink btn-sm" style={{ marginTop: 18 }}>
              다시 로그인하기
            </Link>
          </div>
        ) : (
          <div className="state">로그인하는 중…</div>
        )}
      </div>
    </Screen>
  )
}
