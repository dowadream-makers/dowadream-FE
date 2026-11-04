import { useQuery } from '@tanstack/react-query'
import { getJson } from './client'

// 백엔드 HospitalResponse 와 같은 모양
export type CrowdLevel = 'RELAXED' | 'NORMAL' | 'BUSY' | 'FULL'

export interface Waiting {
  people: number
  minutes: number
  level: CrowdLevel
  source: 'ADMIN' | 'SENSOR'
}

export interface Hospital {
  id: number
  name: string
  typeName: string | null
  phone: string | null
  address: string | null
  lat: number | null
  lng: number | null
  specialistTotal: number | null
  distanceM: number | null
  waiting: Waiting | null // null 이면 "정보 없음"
}

const REFRESH_MS = 30_000 // 대기 정보는 30초마다 새로 받음

export function useHospitals(dept?: string) {
  const query = dept ? `?dept=${encodeURIComponent(dept)}` : ''
  return useQuery({
    queryKey: ['hospitals', dept],
    queryFn: () => getJson<Hospital[]>(`/api/hospitals${query}`),
    refetchInterval: REFRESH_MS,
  })
}

export function useHospital(id: string) {
  return useQuery({
    queryKey: ['hospital', id],
    queryFn: () => getJson<Hospital>(`/api/hospitals/${id}`),
    refetchInterval: REFRESH_MS,
  })
}
