import type { CrowdLevel, Waiting } from '../api/types'
import Icon from './Icon'

// 대기 표시 (시안 18 가이드): 배지 + 사람 아이콘 최대 4개(넘으면 "…") + 오른쪽 "N명 대기 중"
const LEVEL: Record<CrowdLevel, { label: string; badge: string; people: string }> = {
  RELAXED: { label: '여유', badge: 'b-free', people: '' },
  NORMAL: { label: '보통', badge: 'b-mid', people: 'mid' },
  BUSY: { label: '혼잡', badge: 'b-busy', people: 'busy' },
  FULL: { label: '포화', badge: 'b-full', people: 'full' },
}

export function LevelBadge({ waiting }: { waiting: Waiting | null }) {
  if (!waiting) return <span className="badge b-none">정보 없음</span>
  const l = LEVEL[waiting.level]
  return <span className={`badge ${l.badge}`}>{l.label}</span>
}

export function People({ waiting, size }: { waiting: Waiting; size: number }) {
  const count = Math.min(waiting.people, 4)
  return (
    <span className={`people ${LEVEL[waiting.level].people}`} aria-label={`${waiting.people}명`}>
      {Array.from({ length: count }, (_, i) => (
        <Icon key={i} name="person" size={size} />
      ))}
      {waiting.people > 4 && <span className="more">…</span>}
    </span>
  )
}

/** 병원 카드 안의 대기 상자 (06·07) */
export function WaitBox({ waiting }: { waiting: Waiting | null }) {
  return (
    <div className={`wait${waiting?.level === 'FULL' ? ' full' : ''}`}>
      <div className="wait-l">
        <LevelBadge waiting={waiting} />
        {waiting && <People waiting={waiting} size={24} />}
      </div>
      {waiting && (
        <div className="wait-r">
          <div className="n">
            {waiting.people}명<small>대기 중</small>
          </div>
          <div className="t">약 {waiting.minutes}분</div>
        </div>
      )}
    </div>
  )
}
