import { useState } from 'react'
import { useRegion } from '../lib/storage'
import Icon from './Icon'
import { Sheet } from './Overlay'

const REGIONS = ['서울 노원구', '서울 도봉구', '서울 강북구', '서울 중랑구', '서울 성북구']

/** 02 지역 변경 */
export default function RegionSheet({ onClose }: { onClose: () => void }) {
  const [region, setRegion] = useRegion()
  const [typing, setTyping] = useState(false)
  const [text, setText] = useState('')

  const choose = (r: string) => {
    setRegion(r)
    onClose()
  }

  return (
    <Sheet title="지역 변경" onClose={onClose}>
      <p className="muted" style={{ fontSize: 17, marginBottom: 8 }}>
        자주 찾는 지역을 눌러 고르세요.
      </p>
      {REGIONS.map((r) => (
        <button key={r} className="row" onClick={() => choose(r)}>
          <span className={`radio${r === region ? ' on' : ''}`} />
          <span className="t">{r}</span>
        </button>
      ))}
      {typing ? (
        <form
          style={{ marginTop: 12, display: 'flex', gap: 8 }}
          onSubmit={(e) => {
            e.preventDefault()
            if (text.trim()) choose(text.trim())
          }}
        >
          <label className="field" style={{ flex: 1 }}>
            <Icon name="pencil" size={20} style={{ color: 'var(--teal)' }} />
            <input autoFocus value={text} onChange={(e) => setText(e.target.value)} placeholder="예: 서울 은평구" />
          </label>
          <button className="btn btn-teal btn-sm" style={{ width: 90 }}>
            확인
          </button>
        </form>
      ) : (
        <button className="btn btn-line btn-sm" style={{ marginTop: 12 }} onClick={() => setTyping(true)}>
          <Icon name="pencil" size={20} />
          다른 지역 직접 입력
        </button>
      )}
      <p className="note" style={{ marginTop: 10, textAlign: 'center' }}>
        시연용이라 지역을 바꿔도 병원 목록은 그대로예요.
      </p>
    </Sheet>
  )
}
