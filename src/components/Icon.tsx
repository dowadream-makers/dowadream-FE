import type { CSSProperties } from 'react'

// 시안의 아이콘(public/icons.svg)을 이름으로 씁니다. 이름 목록은 icons.svg의 <symbol id>.
export default function Icon({
  name,
  size = 24,
  height,
  className,
  style,
}: {
  name: string
  size?: number
  height?: number
  className?: string
  style?: CSSProperties
}) {
  return (
    <svg width={size} height={height ?? size} className={className} style={style} aria-hidden>
      <use href={`/icons.svg#${name}`} />
    </svg>
  )
}
