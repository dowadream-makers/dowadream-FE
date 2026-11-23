import { useState } from 'react'
import { Link } from 'react-router'
import Icon from '../components/Icon'
import RegionSheet from '../components/RegionSheet'
import { AppBar, FontButton, Screen } from '../components/Screen'
import TabBar from '../components/TabBar'
import { useRegion } from '../lib/storage'

/** 01 홈 (+ 02 지역 변경 시트) */
export default function HomePage() {
  const [region] = useRegion()
  const [regionOpen, setRegionOpen] = useState(false)

  return (
    <Screen home>
      <AppBar right={<FontButton />} />
      <div className="content">
        <span className="pill pill-blush">현재 지역</span>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 30, fontWeight: 900, letterSpacing: -0.5 }}>
            <Icon name="pin" size={30} style={{ color: 'var(--pink)' }} />
            {region}
          </div>
          <button className="out-pill" onClick={() => setRegionOpen(true)}>
            지역 변경
            <Icon name="next" size={18} />
          </button>
        </div>
        <div style={{ position: 'relative', margin: '18px 0 16px', minHeight: 84 }}>
          <h2 style={{ fontSize: 31, fontWeight: 900, letterSpacing: -0.8 }}>
            <span className="h-under">어디가 불편하세요?</span>
          </h2>
          <p style={{ fontSize: 15, color: 'var(--ink-2)', marginTop: 10, fontWeight: 600, whiteSpace: 'nowrap' }}>
            증상이나 병원 이름으로 찾아보세요.
          </p>
          <Icon name="hospital-ill" size={88} height={66} style={{ position: 'absolute', right: -6, top: 44 }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Link to="/symptom" className="btn btn-pink btn-main">
            <Icon name="steth" size={40} />
            증상으로 병원 찾기
            <Icon name="next" size={26} className="chev" />
          </Link>
          <Link to="/hospitals?search=1" className="btn btn-teal btn-main">
            <Icon name="hosp-solid" size={40} style={{ color: '#fff' }} />
            병원 이름으로 찾기
            <Icon name="next" size={26} className="chev" />
          </Link>
        </div>
        <div className="sec-h">
          빠른 확인 <Icon name="spark" size={22} style={{ color: 'var(--teal)', transform: 'rotate(15deg)' }} />
        </div>
        <div className="tiles">
          <Link to="/document" className="tile">
            <Icon name="doc-ill" size={62} />
            <span>문서 쉽게 보기 ›</span>
          </Link>
          <Link to="/help" className="tile">
            <Icon name="help-ill" size={62} />
            <span>생활 도움 요청 ›</span>
          </Link>
        </div>
        <Link to="/emergency" className="bar119">
          <Icon name="siren" size={34} />
          <span>
            <b>119</b> 응급 안내
          </span>
          <Icon name="next" size={24} style={{ marginLeft: 'auto' }} />
        </Link>
      </div>
      <TabBar />
      {regionOpen && <RegionSheet onClose={() => setRegionOpen(false)} />}
    </Screen>
  )
}
