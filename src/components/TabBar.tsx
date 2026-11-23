import { NavLink } from 'react-router'
import Icon from './Icon'

const TABS = [
  { to: '/', icon: 'home', label: '홈' },
  { to: '/hospitals', icon: 'hosp', label: '병원 찾기' },
  { to: '/my', icon: 'user', label: '내 정보' },
]

export default function TabBar() {
  return (
    <nav className="tabbar">
      {TABS.map((t) => (
        <NavLink key={t.to} to={t.to} end={t.to === '/'} className={({ isActive }) => `tab${isActive ? ' on' : ''}`}>
          <Icon name={t.icon} size={28} />
          {t.label}
        </NavLink>
      ))}
    </nav>
  )
}
