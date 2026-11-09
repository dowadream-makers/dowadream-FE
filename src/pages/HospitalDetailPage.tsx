import { useState } from 'react'
import { useParams, useSearchParams } from 'react-router'
import { ApiError, errorMessage } from '../api/client'
import { useHospital } from '../api/hospitals'
import FavButton from '../components/FavButton'
import { HospitalSub } from '../components/HospitalCard'
import { CallSheet, RouteSheet } from '../components/HospitalSheets'
import Icon from '../components/Icon'
import { AppBar, Screen } from '../components/Screen'
import { LevelBadge, People } from '../components/Waiting'
import { timeAgo } from '../lib/format'
import { useLocation } from '../lib/location'

/** 08 병원 정보 (+ 09 전화 연결, 10 길찾기 시트) */
export default function HospitalDetailPage() {
  const { id } = useParams()
  const [params] = useSearchParams()
  const symptom = params.get('symptom')
  const coords = useLocation()
  const { data: h, isPending, error } = useHospital(id!, coords)
  const [sheet, setSheet] = useState<'call' | 'route' | null>(null)

  if (isPending || error) {
    return (
      <Screen>
        <AppBar title="병원 정보" back />
        <p className="state">
          {isPending ? '불러오는 중이에요…' : error instanceof ApiError && error.status === 404 ? '찾는 병원이 없어요.' : errorMessage(error)}
        </p>
      </Screen>
    )
  }

  const w = h.waiting
  return (
    <Screen>
      <AppBar title="병원 정보" back right={<FavButton id={h.id} style={{ margin: 0 }} />} />
      <div className="content">
        <h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: -0.5 }}>{h.name}</h2>
        <HospitalSub h={h} style={{ fontSize: 18, margin: '4px 0 16px' }} />
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 19, fontWeight: 900 }}>진료실 앞 상황</div>
            <LevelBadge waiting={w} />
          </div>
          {w ? (
            <>
              <div className={`wait${w.level === 'FULL' ? ' full' : ''}`} style={{ background: 'transparent', padding: 0, marginTop: 14 }}>
                <People waiting={w} size={34} />
                <div className="wait-r">
                  <div className="n" style={{ fontSize: 28 }}>
                    {w.people}명<small>대기 중</small>
                  </div>
                </div>
              </div>
              <div style={{ fontSize: 21, fontWeight: 800, marginTop: 10 }}>약 {w.minutes}분 기다려요</div>
              <div className="note" style={{ marginTop: 4 }}>
                {timeAgo(w.updatedAt)} 확인
              </div>
            </>
          ) : (
            <div className="muted" style={{ fontSize: 18, fontWeight: 700, marginTop: 14 }}>
              지금은 대기 정보가 없어요. 병원에 전화로 물어보세요.
            </div>
          )}
        </div>
        <div className="card" style={{ marginTop: 14, padding: '6px 18px' }}>
          <dl>
            <div className="info-row">
              <dt>전화번호</dt>
              <dd style={{ color: 'var(--teal-ink)' }}>{h.phone ?? '정보 없음'}</dd>
            </div>
            <div className="info-row">
              <dt>주소</dt>
              <dd>{h.address ?? '정보 없음'}</dd>
            </div>
          </dl>
        </div>
        <p className="note" style={{ marginTop: 12 }}>
          {h.demo ? '시연용 가상 병원이에요.' : '자료: 건강보험심사평가원, 국립중앙의료원'}
        </p>
      </div>
      <div className="bottom-bar" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <button className="btn btn-teal" disabled={!h.phone} onClick={() => setSheet('call')}>
          <Icon name="phone" size={22} />
          전화하기
        </button>
        <button className="btn btn-pink" disabled={h.lat == null || h.lng == null} onClick={() => setSheet('route')}>
          <Icon name="pin" size={22} />
          길찾기
        </button>
      </div>
      {sheet === 'call' && <CallSheet hospital={h} symptom={symptom} onClose={() => setSheet(null)} />}
      {sheet === 'route' && <RouteSheet hospital={h} onClose={() => setSheet(null)} />}
    </Screen>
  )
}
