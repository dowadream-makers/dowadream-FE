import { Link, useNavigate } from 'react-router'
import Icon from '../components/Icon'
import { AppBar, Screen } from '../components/Screen'
import { useDemoLogin } from '../lib/storage'

/** 14 로그인 (시연용: 서버 계정 없이 브라우저에만 로그인 상태를 저장) */
export default function LoginPage() {
  const { login } = useDemoLogin()
  const navigate = useNavigate()
  const start = () => {
    login()
    navigate(-1)
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
          <span>시연용 계정이에요. 휴대전화 번호나 개인정보를 넣지 않아요.</span>
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 12, paddingTop: 24 }}>
          <button className="btn btn-pink" onClick={start}>
            데모 계정으로 로그인
          </button>
          <button className="btn btn-tline" onClick={start}>
            처음 이용자로 시작하기
          </button>
          <Link to="/hospitals" className="btn btn-ghost">
            로그인 없이 병원 찾기 ›
          </Link>
        </div>
      </div>
    </Screen>
  )
}
