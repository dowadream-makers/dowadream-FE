// 서버 응답 타입. 백엔드 docs/fe-integration.md 3장과 같아야 합니다.

export type CrowdLevel = 'RELAXED' | 'NORMAL' | 'BUSY' | 'FULL'

export interface Waiting {
  people: number
  minutes: number
  level: CrowdLevel
  source: 'ADMIN' | 'SENSOR'
  updatedAt: string // ISO, UTC
}

export interface Hospital {
  id: number
  name: string
  deptName: string | null
  departments: string[]
  typeName: string | null
  phone: string | null
  address: string | null
  lat: number | null
  lng: number | null
  specialistTotal: number | null
  distanceM: number | null
  waiting: Waiting | null // null = 정보 없음
  demo: boolean
}

export interface Symptom {
  id: number
  name: string
  category: string // '자주 찾는 증상' 이면 03 첫 화면
  deptCode: string | null
  deptName: string | null
  emergency: boolean
}

export interface ApiErrorBody {
  status: number
  code: string // INVALID_REQUEST | UNAUTHORIZED | FORBIDDEN | NOT_FOUND | INTERNAL_ERROR
  message: string
  path: string
  timestamp: string
}
