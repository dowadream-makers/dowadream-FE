import { useQuery } from '@tanstack/react-query'
import { getJson } from './client'
import type { Symptom } from './types'

export const FEATURED_CATEGORY = '자주 찾는 증상'

export function useSymptoms() {
  return useQuery({
    queryKey: ['symptoms'],
    queryFn: () => getJson<Symptom[]>('/api/symptoms'),
    staleTime: Infinity, // 거의 바뀌지 않음
  })
}
