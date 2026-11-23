import { useEffect, useState } from 'react'

export interface Coords {
  lat: number
  lng: number
}

/** 위치를 못 받으면 노원구청 좌표를 씁니다 */
export const DEFAULT_COORDS: Coords = { lat: 37.6543, lng: 127.0565 }

/** 사용자 위치를 한 번 받습니다. 서버에는 거리 계산용으로만 보내고 저장하지 않습니다. */
export function useLocation(): Coords {
  const [coords, setCoords] = useState<Coords>(DEFAULT_COORDS)

  useEffect(() => {
    if (!('geolocation' in navigator)) return
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: round(pos.coords.latitude), lng: round(pos.coords.longitude) }),
      () => {}, // 거절·실패하면 기본 좌표 그대로
      { maximumAge: 5 * 60_000, timeout: 10_000 },
    )
  }, [])

  return coords
}

// 소수 4자리(약 10m)로 줄여 같은 위치에서 다시 요청하지 않게 함
const round = (n: number) => Math.round(n * 10_000) / 10_000
