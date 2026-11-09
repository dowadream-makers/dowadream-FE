import { useCallback, useSyncExternalStore } from 'react'

// 브라우저에만 저장하는 값 (서버로 보내지 않음). 백엔드 docs/fe-integration.md 4장
export const KEYS = {
  favorites: 'dowadream.favorites',
  largeText: 'dowadream.largeText',
  region: 'dowadream.region',
  demoLogin: 'dowadream.demoLogin',
} as const

const listeners = new Set<() => void>()

function read(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function write(key: string, value: string | null) {
  try {
    if (value === null) localStorage.removeItem(key)
    else localStorage.setItem(key, value)
  } catch {
    // 개인 정보 보호 모드 등에서는 저장하지 못해도 화면은 동작하게 둔다
  }
  listeners.forEach((l) => l())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

/** localStorage 값 하나를 상태처럼 쓰는 훅. 같은 키를 쓰는 화면들이 함께 바뀐다 */
export function useStored(key: string): [string | null, (value: string | null) => void] {
  const value = useSyncExternalStore(subscribe, () => read(key))
  const set = useCallback((v: string | null) => write(key, v), [key])
  return [value, set]
}

export function useFavorites() {
  const [raw, set] = useStored(KEYS.favorites)
  const ids: number[] = raw ? (JSON.parse(raw) as number[]) : []
  const toggle = (id: number) => set(JSON.stringify(ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]))
  return { ids, has: (id: number) => ids.includes(id), toggle }
}

export function useDemoLogin() {
  const [raw, set] = useStored(KEYS.demoLogin)
  return { loggedIn: raw === '1', login: () => set('1'), logout: () => set(null) }
}

export const DEFAULT_REGION = '서울 노원구'

export function useRegion() {
  const [raw, set] = useStored(KEYS.region)
  return [raw ?? DEFAULT_REGION, set] as const
}
