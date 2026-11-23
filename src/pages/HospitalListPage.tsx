import { useState } from 'react'
import { useSearchParams } from 'react-router'
import { errorMessage } from '../api/client'
import { useHospitals } from '../api/hospitals'
import type { Hospital } from '../api/types'
import HospitalCard from '../components/HospitalCard'
import { CallSheet, RouteSheet } from '../components/HospitalSheets'
import Icon from '../components/Icon'
import { AppBar, FontButton, Screen } from '../components/Screen'
import TabBar from '../components/TabBar'
import { useLocation } from '../lib/location'
import { useFavorites } from '../lib/storage'

/** "무릎이 아파요" → "무릎 통증", 그 밖엔 "기침·가래 증상" */
function symptomSubject(name: string) {
  const pain = name.match(/^(.+)[이가] 아파요$/)
  return pain ? `${pain[1]} 통증` : `${name} 증상`
}

/** 06 병원 목록 · 07 관심 병원 (주소: /hospitals?dept=05&symptom=..., ?tab=fav, ?search=1) */
export default function HospitalListPage() {
  const [params, setParams] = useSearchParams()
  const favTab = params.get('tab') === 'fav'
  const searchMode = params.get('search') === '1'
  const dept = params.get('dept') ?? undefined
  const symptom = params.get('symptom')
  const [q, setQ] = useState('')
  const coords = useLocation()
  const fav = useFavorites()
  const [call, setCall] = useState<Hospital | null>(null)
  const [route, setRoute] = useState<Hospital | null>(null)

  const filter = favTab ? { ids: fav.ids } : { dept, q: q.trim() || undefined }
  const enabled = !favTab || fav.ids.length > 0
  const { data, isPending, error } = useHospitals(filter, coords, enabled)

  const setTab = (fav: boolean) => {
    const next = new URLSearchParams(params)
    if (fav) next.set('tab', 'fav')
    else next.delete('tab')
    setParams(next, { replace: true })
  }

  const detailHref = (id: number) => `/hospitals/${id}${symptom ? `?symptom=${encodeURIComponent(symptom)}` : ''}`
  const deptName = data?.find((h) => h.deptName)?.deptName
  const showTip = !favTab && symptom && dept && deptName

  return (
    <Screen>
      <AppBar title="병원 찾기" back={!favTab} right={<FontButton />} />
      <div className="content">
        <div className="seg" role="tablist">
          <button role="tab" aria-selected={!favTab} className={favTab ? '' : 'on'} onClick={() => setTab(false)}>
            주변 병원
          </button>
          <button role="tab" aria-selected={favTab} className={favTab ? 'on' : ''} onClick={() => setTab(true)}>
            <Icon name="star" size={18} style={{ color: 'var(--pink)' }} />
            관심 병원
          </button>
        </div>

        {!favTab && searchMode && (
          <label className="field" style={{ marginTop: 12 }}>
            <Icon name="search" size={22} style={{ color: 'var(--teal)' }} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="병원 이름 찾기 (예: 내과)" />
          </label>
        )}
        {showTip ? (
          <div className="tip" style={{ margin: '12px 0 14px' }}>
            <Icon name="dept" />
            <span>
              {symptomSubject(symptom)}은 <b>{deptName}</b>를 보세요.
            </span>
          </div>
        ) : (
          <div style={{ height: 14 }} />
        )}

        {favTab && fav.ids.length === 0 ? (
          <p className="state">병원 카드의 별을 누르면 여기에 모여요.</p>
        ) : isPending ? (
          <p className="state">병원을 불러오는 중이에요…</p>
        ) : error ? (
          <p className="state">{errorMessage(error)}</p>
        ) : data.length === 0 ? (
          <p className="state">조건에 맞는 병원이 없어요.</p>
        ) : (
          data.map((h) => <HospitalCard key={h.id} h={h} detailHref={detailHref(h.id)} onCall={() => setCall(h)} onRoute={() => setRoute(h)} />)
        )}
      </div>
      <TabBar />
      {call && <CallSheet hospital={call} symptom={symptom} onClose={() => setCall(null)} />}
      {route && <RouteSheet hospital={route} onClose={() => setRoute(null)} />}
    </Screen>
  )
}
