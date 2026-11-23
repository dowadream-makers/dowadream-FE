import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { errorMessage } from '../api/client'
import { FEATURED_CATEGORY, useSymptoms } from '../api/symptoms'
import type { Symptom } from '../api/types'
import Icon from '../components/Icon'
import { Modal } from '../components/Overlay'
import { AppBar, FontButton, Screen } from '../components/Screen'

const MAX_PICK = 2

/** 03 증상 선택 · 04 증상 더 보기 · 05 확인 경고 */
export default function SymptomPage() {
  const { data, isPending, error } = useSymptoms()
  const [picked, setPicked] = useState<Symptom[]>([])
  const [more, setMore] = useState(false)
  const [search, setSearch] = useState('')
  const [confirming, setConfirming] = useState(false)
  const navigate = useNavigate()

  const toggle = (s: Symptom) => {
    if (s.emergency) return navigate('/emergency')
    setPicked((cur) => (cur.some((p) => p.id === s.id) ? cur.filter((p) => p.id !== s.id) : [...cur, s].slice(-MAX_PICK)))
  }

  const chip = (s: Symptom) => {
    const on = picked.some((p) => p.id === s.id)
    return (
      <button key={s.id} className={`chip${on ? ' on' : ''}`} onClick={() => toggle(s)} aria-pressed={on}>
        <span className="m">{on ? '✓' : '＋'}</span>
        {s.name}
      </button>
    )
  }

  const goHospitals = () => {
    const first = picked[0]
    const qs = new URLSearchParams()
    if (first.deptCode) qs.set('dept', first.deptCode)
    qs.set('symptom', first.name)
    navigate(`/hospitals?${qs}`)
  }

  const featured = data?.filter((s) => s.category === FEATURED_CATEGORY) ?? []
  const others = data?.filter((s) => s.category !== FEATURED_CATEGORY && s.name.includes(search.trim())) ?? []
  const categories = [...new Set(others.map((s) => s.category))]

  return (
    <Screen>
      <AppBar title="증상 선택" back right={<FontButton />} />
      <div className="content">
        {isPending && <p className="state">증상을 불러오는 중이에요…</p>}
        {error && <p className="state">{errorMessage(error)}</p>}
        {data && !more && (
          <>
            <h2 style={{ fontSize: 29, fontWeight: 900, letterSpacing: -0.6 }}>
              <span className="h-under">어디가 불편하세요?</span>
            </h2>
            <p className="muted" style={{ fontSize: 16, margin: '6px 0 16px', fontWeight: 600 }}>
              두 가지까지 고를 수 있어요.
            </p>
            <div className="chips">{featured.map(chip)}</div>
            <button className="btn btn-line btn-sm" style={{ marginTop: 12 }} onClick={() => setMore(true)}>
              다른 증상 더 보기 ▾
            </button>
            <button
              className="btn btn-sm"
              style={{ marginTop: 12, background: 'var(--teal-soft)', color: 'var(--teal-ink)', border: '2px dashed var(--teal)' }}
            >
              <Icon name="mic" />
              말로 증상 말하기
            </button>
            <p className="note" style={{ textAlign: 'center', marginTop: 6 }}>
              음성 인식 연동 확인 중
            </p>
          </>
        )}
        {data && more && (
          <>
            <label className="field">
              <Icon name="search" size={22} style={{ color: 'var(--teal)' }} />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="증상 이름 찾기 (예: 눈, 소변, 귀)" />
            </label>
            {categories.map((c) => (
              <div key={c}>
                <div className="cat">{c}</div>
                <div className="chips sm">{others.filter((s) => s.category === c).map(chip)}</div>
              </div>
            ))}
            {categories.length === 0 && <p className="state">찾는 증상이 없어요.</p>}
          </>
        )}
      </div>
      <div className="bottom-bar">
        {more ? (
          <button className="btn btn-line" onClick={() => setMore(false)}>
            다른 증상 접기 ▴
          </button>
        ) : (
          <>
            <button className="btn btn-pink" disabled={picked.length === 0} style={{ opacity: picked.length ? 1 : 0.5 }} onClick={() => setConfirming(true)}>
              {picked.length ? `${picked.map((p) => p.name).join(', ')} · 병원 찾기` : '증상을 골라 주세요'}
              {picked.length > 0 && <Icon name="next" size={22} />}
            </button>
            <Link
              to="/emergency"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12, fontSize: 17, fontWeight: 800, color: 'var(--red-ink)' }}
            >
              <Icon name="kit" size={22} />
              응급 증상이 있나요? 119 안내 ›
            </Link>
          </>
        )}
      </div>
      {confirming && (
        <Modal onClose={() => setConfirming(false)}>
          <div className="round-ic pulse" style={{ background: 'var(--amber-soft)' }}>
            <Icon name="s-wait" size={44} />
          </div>
          <h3>
            증상에 맞는 병원인지
            <br />꼭 확인하세요
          </h3>
          <p>
            가기 전에 병원에 <b style={{ color: 'var(--ink)' }}>전화로</b> 물어보세요.
          </p>
          <button className="btn btn-pink" onClick={goHospitals}>
            확인했어요
          </button>
        </Modal>
      )}
    </Screen>
  )
}
