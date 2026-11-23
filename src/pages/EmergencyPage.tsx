import { useState } from 'react'
import Icon from '../components/Icon'
import { Modal } from '../components/Overlay'
import { AppBar, Screen } from '../components/Screen'

const EXAMPLES = ['갑자기 가슴이 심하게 아파요', '숨쉬기가 매우 힘들어요', '한쪽 팔다리에 힘이 빠지거나\n말이 어눌해요', '정신을 잃거나 쓰러졌어요']

/** 11 119 응급 안내 · 12 119 연락 안내(시연) */
export default function EmergencyPage() {
  const [open, setOpen] = useState(false)
  return (
    <Screen>
      <AppBar title="119 안내" back />
      <div className="content">
        <div className="round-ic" style={{ background: '#fff', width: 92, height: 92, boxShadow: 'var(--shadow)' }}>
          <Icon name="siren" size={56} />
        </div>
        <h2 style={{ fontSize: 27, fontWeight: 900, textAlign: 'center', lineHeight: 1.35 }}>
          위험한 증상이 있다면
          <br />
          바로 119에 연락하세요
        </h2>
        <div className="card" style={{ marginTop: 18 }}>
          <div style={{ fontSize: 18, fontWeight: 900, marginBottom: 8 }}>이럴 땐 바로 도움을 요청하세요</div>
          {EXAMPLES.map((e) => (
            <div key={e} className="row" style={{ minHeight: 52 }}>
              <Icon name="s-warn" />
              <span className="t" style={{ fontSize: 18, whiteSpace: 'pre-line' }}>
                {e}
              </span>
            </div>
          ))}
        </div>
        <p className="note" style={{ marginTop: 10 }}>
          몇 가지 예시예요. 도와드림은 응급 여부를 판단하지 않아요.
        </p>
      </div>
      <div className="bottom-bar plain">
        <button className="btn btn-red" onClick={() => setOpen(true)}>
          <Icon name="phone" />
          119 연락 안내
        </button>
      </div>
      {open && (
        <Modal onClose={() => setOpen(false)}>
          <div className="round-ic" style={{ background: 'var(--red-soft)' }}>
            <Icon name="phone" size={40} style={{ color: 'var(--red)' }} />
          </div>
          <h3>
            휴대전화로
            <br />
            119를 눌러 주세요
          </h3>
          <p>
            이 화면은 시연용이라
            <br />
            전화가 걸리지 않아요.
          </p>
          <button className="btn btn-red" onClick={() => setOpen(false)}>
            확인
          </button>
        </Modal>
      )}
    </Screen>
  )
}
