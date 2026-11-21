import { ApiError, BASE_URL } from './client'
import type { ApiErrorBody } from './types'
import type { LoginProvider } from '../lib/storage'

export type Me = { id: number; nickname: string; provider: 'GOOGLE' | 'KAKAO' | 'NAVER'; createdAt: string }

/** 이 주소로 브라우저를 보내면 서버가 각 회사 로그인 화면으로 넘겨 준다 */
export const loginStartUrl = (provider: LoginProvider) => `${BASE_URL}/api/auth/${provider}/start`

/** 서버에 키가 설정된 로그인만 */
export async function fetchProviders(): Promise<LoginProvider[]> {
  const res = await fetch(`${BASE_URL}/api/auth/providers`)
  if (!res.ok) throw new ApiError(res.status, 'UNKNOWN', '로그인 방법을 불러오지 못했어요.')
  return res.json() as Promise<LoginProvider[]>
}

export async function fetchMe(token: string): Promise<Me> {
  const res = await fetch(`${BASE_URL}/api/me`, { headers: { Authorization: `Bearer ${token}` } })
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as ApiErrorBody | null
    throw new ApiError(res.status, body?.code ?? 'UNKNOWN', body?.message ?? '로그인 정보를 확인하지 못했어요.')
  }
  return res.json() as Promise<Me>
}
