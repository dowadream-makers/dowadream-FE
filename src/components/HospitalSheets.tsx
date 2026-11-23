import type { Hospital } from '../api/types'
import { formatDistance, kakaoRouteUrl, walkMinutes } from '../lib/format'
import Icon from './Icon'
import { Sheet } from './Overlay'

/** "무릎이 아파요" → "무릎이 아픈데, 오늘 진료 받을 수 있나요?" */
function askLine(symptom: string | null): string {
  if (!symptom) return '오늘 진료 받을 수 있나요?'
  const pain = symptom.match(/^(.+[이가]) 아파요$/)
  if (pain) return `${pain[1]} 아픈데,\n오늘 진료 받을 수 있나요?`
  return `${symptom.replace(/요$/, '는데')},\n오늘 진료 받을 수 있나요?`
}

/** 09 전화 연결 */
export function CallSheet({ hospital, symptom, onClose }: { hospital: Hospital; symptom: string | null; onClose: () => void }) {
  return (
    <Sheet title="병원에 전화할까요?" onClose={onClose}>
      <div style={{ fontSize: 30, fontWeight: 900, color: 'var(--teal-ink)', margin: '8px 0 2px' }}>{hospital.phone}</div>
      <div className="muted" style={{ fontSize: 17, fontWeight: 600 }}>
        {hospital.name}
      </div>
      <div className="card" style={{ margin: '16px 0', background: 'var(--amber-soft)', boxShadow: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 16, fontWeight: 900, color: 'var(--amber-ink)', marginBottom: 6 }}>
          <Icon name="s-info" size={20} />
          이렇게 물어보세요
        </div>
        <div style={{ fontSize: 19, fontWeight: 800, whiteSpace: 'pre-line' }}>"{askLine(symptom)}"</div>
      </div>
      <a className="btn btn-teal" href={`tel:${hospital.phone}`}>
        <Icon name="phone" />
        전화 걸기
      </a>
      <button className="btn btn-ghost" onClick={onClose}>
        취소
      </button>
    </Sheet>
  )
}

/** 10 길찾기 (카카오맵으로 넘김) */
export function RouteSheet({ hospital, onClose }: { hospital: Hospital; onClose: () => void }) {
  const { name, lat, lng, distanceM } = hospital
  if (lat == null || lng == null) return null
  return (
    <Sheet title="어떻게 가실까요?" onClose={onClose}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '6px 0 16px' }}>
        <Icon name="map" size={44} style={{ color: 'var(--pink)' }} />
        <div>
          <div style={{ fontSize: 19, fontWeight: 900 }}>{name}</div>
          {distanceM != null && (
            <div className="muted" style={{ fontSize: 16, fontWeight: 600 }}>
              여기서 {formatDistance(distanceM)}
            </div>
          )}
        </div>
      </div>
      <a className="btn btn-pink btn-main" style={{ minHeight: 72, fontSize: 21 }} href={kakaoRouteUrl('walk', name, lat, lng)} target="_blank" rel="noreferrer">
        <Icon name="walk" size={30} />
        걸어서 가기
        {distanceM != null && <span style={{ marginLeft: 'auto', fontSize: 17, opacity: 0.9 }}>약 {walkMinutes(distanceM)}분</span>}
      </a>
      <a className="btn btn-teal btn-main" style={{ minHeight: 72, fontSize: 21, marginTop: 12 }} href={kakaoRouteUrl('traffic', name, lat, lng)} target="_blank" rel="noreferrer">
        <Icon name="bus" size={30} />
        버스·지하철
      </a>
      <p className="note" style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', marginTop: 14 }}>
        <Icon name="ext" size={16} />
        카카오맵이 열려요
      </p>
    </Sheet>
  )
}
