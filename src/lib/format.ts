/** 450 → "450m", 1250 → "1.3km" */
export function formatDistance(m: number): string {
  return m < 1000 ? `${m}m` : `${(m / 1000).toFixed(1)}km`
}

/** 걷는 시간(분). 시속 4km(분당 약 67m) 기준 [추정] */
export function walkMinutes(m: number): number {
  return Math.max(1, Math.ceil(m / 67))
}

/** "방금 전", "3분 전", "2시간 전" */
export function timeAgo(iso: string, now = Date.now()): string {
  const min = Math.floor((now - new Date(iso).getTime()) / 60_000)
  if (min < 1) return '방금 전'
  if (min < 60) return `${min}분 전`
  return `${Math.floor(min / 60)}시간 전`
}

export function kakaoRouteUrl(mode: 'walk' | 'traffic', name: string, lat: number, lng: number): string {
  return `https://map.kakao.com/link/by/${mode}/${encodeURIComponent(name)},${lat},${lng}`
}
