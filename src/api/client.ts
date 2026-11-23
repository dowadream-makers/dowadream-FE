import type { ApiErrorBody } from './types'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'

/** 서버가 보낸 오류 (백엔드 docs/api-conventions.md 5장) */
export class ApiError extends Error {
  readonly status: number
  readonly code: string

  constructor(status: number, code: string, message: string) {
    super(message)
    this.status = status
    this.code = code
  }
}

type Params = Record<string, string | number | undefined | null>

export async function getJson<T>(path: string, params: Params = {}): Promise<T> {
  const query = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') query.set(key, String(value))
  }
  const qs = query.toString()
  const res = await fetch(`${BASE_URL}${path}${qs ? `?${qs}` : ''}`)
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as ApiErrorBody | null
    throw new ApiError(res.status, body?.code ?? 'UNKNOWN', body?.message ?? '정보를 불러오지 못했어요.')
  }
  return res.json() as Promise<T>
}

/** 화면에 보여 줄 오류 문장 */
export function errorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message
  return '정보를 불러오지 못했어요. 잠시 뒤 다시 시도해 주세요.'
}
