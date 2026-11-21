import type { CSSProperties } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useLogin, useFavorites } from '../lib/storage'
import Icon from './Icon'

/** 관심 병원 별. 시안상 저장은 로그인 후에만 되므로, 로그인 전엔 14 로그인 화면으로 */
export default function FavButton({ id, style }: { id: number; style?: CSSProperties }) {
  const fav = useFavorites()
  const { loggedIn } = useLogin()
  const navigate = useNavigate()
  const { pathname, search } = useLocation()
  const on = fav.has(id)
  return (
    <button
      className={`fav${on ? ' on' : ''}`}
      style={style}
      aria-label={on ? '관심 병원 해제' : '관심 병원 저장'}
      aria-pressed={on}
      onClick={() => (loggedIn ? fav.toggle(id) : navigate('/login', { state: { from: pathname + search } }))}
    >
      <Icon name={on ? 'star' : 'star-o'} size={26} />
    </button>
  )
}
