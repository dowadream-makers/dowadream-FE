import { useState } from 'react'
import Icon from '../components/Icon'
import { AppBar, FontButton, Screen } from '../components/Screen'

const KINDS = [
  { icon: 'hosp', label: '병원 동행' },
  { icon: 'doc', label: '서류 발급' },
  { icon: 'mobile', label: '휴대폰 사용' },
  { icon: 'hands', label: '다른 도움' },
]

/** 17 생활 도움 요청 (준비 중, 서버로 보내지 않음) */
export default function HelpPage() {
  const [kind, setKind] = useState(KINDS[0].label)
  const [memo, setMemo] = useState('')

  return (
    <Screen>
      <AppBar title="생활 도움 요청" back right={<FontButton />} />
      <div className="content">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Icon name="help-ill" size={62} />
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 900 }}>어떤 도움이 필요하세요?</h2>
            <span className="pill" style={{ background: 'var(--amber-soft)', color: 'var(--amber-ink)', marginTop: 4 }}>
              준비 중
            </span>
          </div>
        </div>
        <p className="muted" style={{ fontSize: 16, margin: '10px 0 14px', fontWeight: 600 }}>
          보호자·대학생과 연결해 드릴 예정이에요.
        </p>
        <div className="chips">
          {KINDS.map((k) => (
            <button key={k.label} className={`chip${kind === k.label ? ' on' : ''}`} onClick={() => setKind(k.label)} aria-pressed={kind === k.label}>
              <Icon name={k.icon} size={22} style={kind === k.label ? undefined : { color: 'var(--teal)' }} />
              {k.label}
            </button>
          ))}
        </div>
        <label className="field area" style={{ marginTop: 14 }}>
          <Icon name="pencil" size={20} style={{ color: 'var(--teal)', flex: 'none' }} />
          <textarea value={memo} onChange={(e) => setMemo(e.target.value)} placeholder="필요한 도움을 적어 주세요 (선택)" />
        </label>
        <p className="note" style={{ display: 'flex', gap: 6, marginTop: 8 }}>
          <Icon name="s-warn" size={16} style={{ flex: 'none', marginTop: 2 }} />
          이름, 전화번호, 주민등록번호는 적지 마세요.
        </p>
      </div>
      <div className="bottom-bar">
        <button className="btn btn-pink">요청 내용 확인하기</button>
      </div>
    </Screen>
  )
}
