import type { CSSProperties } from 'react'
import { Link } from 'react-router'
import type { Hospital } from '../api/types'
import { formatDistance } from '../lib/format'
import FavButton from './FavButton'
import Icon from './Icon'
import { WaitBox } from './Waiting'

/** "정형외과 · 450m · 전문의 2명" */
export function HospitalSub({ h, style }: { h: Hospital; style?: CSSProperties }) {
  const parts = [h.deptName, h.distanceM != null ? formatDistance(h.distanceM) : null].filter(Boolean)
  return (
    <div className="h-sub" style={style}>
      {parts.join(' · ')}
      {h.specialistTotal != null && (
        <>
          {parts.length > 0 && ' · '}
          <b>전문의 {h.specialistTotal}명</b>
        </>
      )}
    </div>
  )
}

/** 병원 카드 (시안 06·07) */
export default function HospitalCard({
  h,
  detailHref,
  onCall,
  onRoute,
}: {
  h: Hospital
  detailHref: string
  onCall: () => void
  onRoute: () => void
}) {
  return (
    <article className="h-card">
      <div className="h-top">
        <Link to={detailHref}>
          <div className="h-name">
            {h.name}
            <Icon name="next" size={20} style={{ color: '#AAA' }} />
          </div>
          <HospitalSub h={h} />
        </Link>
        <FavButton id={h.id} />
      </div>
      <WaitBox waiting={h.waiting} />
      <div className="h-act">
        {h.phone && (
          <button className="btn btn-teal" onClick={onCall}>
            <Icon name="phone" size={22} />
            전화
          </button>
        )}
        {h.lat != null && h.lng != null && (
          <button className="btn btn-pink" onClick={onRoute}>
            <Icon name="pin" size={22} />
            길찾기
          </button>
        )}
      </div>
    </article>
  )
}
