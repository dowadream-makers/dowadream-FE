import { useState } from 'react'
import { Link } from 'react-router'
import Icon from '../components/Icon'
import RegionSheet from '../components/RegionSheet'
import { AppBar, FontButton, Screen } from '../components/Screen'
import TabBar from '../components/TabBar'
import { useLogin, useRegion } from '../lib/storage'

const PROVIDER_NAMES = { kakao: '카카오', naver: '네이버', google: '구글' } as const

/** 13 내 정보 · 15 내 정보(로그인 후) */
export default function MyPage() {
  const { loggedIn, info, logout } = useLogin()
  const [region] = useRegion()
  const [regionOpen, setRegionOpen] = useState(false)

  const rows = [
    { icon: 'gear', box: { background: 'var(--teal-soft)', color: 'var(--teal-ink)' }, t: '편의 설정', d: '읽기 속도 · 주소 · 연락처' },
    { icon: 'pin', box: { background: 'var(--blush)', color: 'var(--pink)' }, t: '검색 지역', d: region, onClick: () => setRegionOpen(true) },
    { icon: 's-info', box: { background: '#EEF6FF' }, t: '서비스 안내', d: '시연 데이터와 의료 안내 범위' },
  ]

  return (
    <Screen>
      <AppBar title="내 정보" right={<FontButton />} />
      <div className="content">
        {loggedIn ? (
          <>
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div className="round-ic" style={{ background: 'var(--blush)', width: 60, height: 60, margin: 0 }}>
                <Icon name="user" size={32} style={{ color: 'var(--pink)' }} />
              </div>
              <div>
                <div style={{ fontSize: 21, fontWeight: 900 }}>{info?.nickname ?? '도와드림 이용자'}님</div>
                <div className="pill pill-blush" style={{ marginTop: 4 }}>
                  {info && PROVIDER_NAMES[info.provider]}로 로그인
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 14 }}>
              <Link to="/hospitals?tab=fav" className="tile" style={{ height: 120 }}>
                <Icon name="star" size={34} style={{ color: 'var(--pink)' }} />
                관심 병원
              </Link>
              <div className="tile" style={{ height: 120 }}>
                <Icon name="s-ok" size={34} />
                다녀온 병원
              </div>
            </div>
          </>
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: '22px 18px' }}>
            <div className="round-ic" style={{ background: 'var(--blush)', width: 68, height: 68, marginBottom: 10 }}>
              <Icon name="user" size={36} style={{ color: 'var(--pink)' }} />
            </div>
            <div style={{ fontSize: 21, fontWeight: 900 }}>로그인 없이도 쓸 수 있어요</div>
            <p className="muted" style={{ fontSize: 16, margin: '6px 0 14px', fontWeight: 600 }}>
              관심 병원 저장만 로그인이 필요해요.
            </p>
            <Link to="/login" className="btn btn-pink btn-sm">
              로그인 / 처음 시작하기
            </Link>
          </div>
        )}
        <div className="card" style={{ marginTop: 14, padding: '4px 16px' }}>
          {rows.map((r) => (
            <button key={r.t} className="row" onClick={r.onClick}>
              <span className="ic-box" style={r.box}>
                <Icon name={r.icon} size={26} />
              </span>
              {loggedIn ? (
                <div className="t">{r.t}</div>
              ) : (
                <div>
                  <div className="t">{r.t}</div>
                  <div className="d">{r.d}</div>
                </div>
              )}
              <Icon name="next" size={22} className="chev" />
            </button>
          ))}
        </div>
        {loggedIn && (
          <button className="btn btn-ghost" style={{ marginTop: 6 }} onClick={logout}>
            로그아웃
          </button>
        )}
      </div>
      <TabBar />
      {regionOpen && <RegionSheet onClose={() => setRegionOpen(false)} />}
    </Screen>
  )
}
