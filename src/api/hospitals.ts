import { useQuery } from '@tanstack/react-query'
import type { Coords } from '../lib/location'
import { getJson } from './client'
import type { Hospital } from './types'

const REFRESH_MS = 30_000 // 대기 정보는 30초마다 새로 받음

export interface HospitalFilter {
  dept?: string
  q?: string
  ids?: number[]
}

export function useHospitals(filter: HospitalFilter, coords: Coords, enabled = true) {
  return useQuery({
    queryKey: ['hospitals', filter, coords],
    queryFn: () =>
      getJson<Hospital[]>('/api/hospitals', {
        dept: filter.dept,
        q: filter.q,
        ids: filter.ids?.join(','),
        lat: coords.lat,
        lng: coords.lng,
      }),
    refetchInterval: REFRESH_MS,
    enabled,
  })
}

export function useHospital(id: string, coords: Coords) {
  return useQuery({
    queryKey: ['hospital', id, coords],
    queryFn: () => getJson<Hospital>(`/api/hospitals/${id}`, { lat: coords.lat, lng: coords.lng }),
    refetchInterval: REFRESH_MS,
  })
}
