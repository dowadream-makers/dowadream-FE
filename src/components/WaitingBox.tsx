import type { CrowdLevel, Waiting } from '../api/hospitals'

// 대기 표시 (시안 3장): 왼쪽 상태 배지 + 사람 아이콘 최대 4개(넘으면 "…"), 오른쪽 "N명 대기 중" / "약 N분"
const LEVELS: Record<CrowdLevel, { label: string; color: string }> = {
  RELAXED: { label: '여유', color: 'text-teal' },
  NORMAL: { label: '보통', color: 'text-amber-700' },
  BUSY: { label: '혼잡', color: 'text-orange-500' },
  FULL: { label: '포화', color: 'text-danger' },
}

export default function WaitingBox({ waiting }: { waiting: Waiting | null }) {
  if (!waiting) {
    return <div className="rounded-2xl bg-blush px-4 py-3 font-bold text-gray-500">대기 정보 없음</div>
  }

  const level = LEVELS[waiting.level]
  const icons = Math.min(waiting.people, 4)

  return (
    <div className="flex items-center justify-between rounded-2xl bg-blush px-4 py-3">
      <div className="flex items-center gap-2">
        <span className={`rounded-full bg-white px-2 py-0.5 text-sm font-bold ${level.color}`}>{level.label}</span>
        <span className={level.color} aria-hidden>
          {'●'.repeat(icons)}
          {waiting.people > 4 && '…'}
        </span>
      </div>
      <div className="text-right">
        <div className="font-bold">
          <span className={`text-2xl font-black ${waiting.level === 'FULL' ? 'text-danger' : ''}`}>{waiting.people}명</span>{' '}
          대기 중
        </div>
        <div className="text-gray-600">약 {waiting.minutes}분</div>
      </div>
    </div>
  )
}
