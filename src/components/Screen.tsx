import type { ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { KEYS, useStored } from '../lib/storage'
import Icon from './Icon'

/** 화면 한 장 (시안의 <section class="frame">) */
export function Screen({ home, children }: { home?: boolean; children: ReactNode }) {
  return <div className={`frame ${home ? 'home-bg' : 'soft'}`}>{children}</div>
}

/** 상단바. title이 없으면 로고(홈), back이면 뒤로 화살표 */
export function AppBar({ title, back, right }: { title?: string; back?: boolean; right?: ReactNode }) {
  const navigate = useNavigate()
  return (
    <header className="appbar">
      {title ? (
        <button className="ab-title" style={{ border: 0, background: 'none' }} onClick={() => back && navigate(-1)} disabled={!back}>
          {back && <Icon name="back" size={26} />}
          {title}
        </button>
      ) : (
        <div className="brand">
          <Icon name="logo" size={34} height={31} />
          도와드림
        </div>
      )}
      {right}
    </header>
  )
}

/** "Aa 글자 크게" 버튼. 켜면 화면 전체를 1.15배로 */
export function FontButton() {
  const [large, setLarge] = useStored(KEYS.largeText)
  return (
    <button className="font-btn" onClick={() => setLarge(large === '1' ? null : '1')} aria-pressed={large === '1'}>
      <b>Aa</b>
      {large === '1' ? '글자 보통' : '글자 크게'}
    </button>
  )
}
