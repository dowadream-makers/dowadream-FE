import Icon from '../components/Icon'
import { AppBar, FontButton, Screen } from '../components/Screen'

/** 16 문서 쉽게 보기 (준비 중) */
export default function DocumentPage() {
  return (
    <Screen>
      <AppBar title="문서 쉽게 보기" back right={<FontButton />} />
      <div className="content">
        <div className="card" style={{ textAlign: 'center', padding: '26px 18px' }}>
          <Icon name="doc-ill" size={96} />
          <h2 style={{ fontSize: 25, fontWeight: 900, marginTop: 8, lineHeight: 1.35 }}>
            어려운 안내문을
            <br />
            쉽게 풀어 드려요
          </h2>
          <span className="pill" style={{ background: 'var(--amber-soft)', color: 'var(--amber-ink)', marginTop: 10 }}>
            준비 중
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 18 }}>
          <button className="btn btn-pink btn-main" style={{ minHeight: 72, fontSize: 21 }}>
            <Icon name="camera" size={30} />
            카메라로 찍기
            <Icon name="next" className="chev" />
          </button>
          <button className="btn btn-teal btn-main" style={{ minHeight: 72, fontSize: 21 }}>
            <Icon name="gallery" size={30} />
            사진·PDF 고르기
            <Icon name="next" className="chev" />
          </button>
        </div>
        <div className="tip" style={{ marginTop: 16 }}>
          <Icon name="shield" size={22} style={{ flex: 'none' }} />
          <span>사진과 파일은 서버로 보내지 않아요.</span>
        </div>
      </div>
    </Screen>
  )
}
