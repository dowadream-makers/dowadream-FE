import { Route, Routes } from 'react-router'
import Layout from './components/Layout'
import ComingSoonPage from './pages/ComingSoonPage'
import HomePage from './pages/HomePage'
import HospitalDetailPage from './pages/HospitalDetailPage'
import HospitalListPage from './pages/HospitalListPage'

// 화면 번호는 최종 시안(ux-v9/dowadream-final-screens.html) 기준
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} /> {/* 01 */}
        <Route path="symptom" element={<ComingSoonPage title="증상 선택" screen="03·04·05" />} />
        <Route path="hospitals" element={<HospitalListPage />} /> {/* 06·07 */}
        <Route path="hospitals/:id" element={<HospitalDetailPage />} /> {/* 08 */}
        <Route path="emergency" element={<ComingSoonPage title="119 응급 안내" screen="11·12" />} />
        <Route path="my" element={<ComingSoonPage title="내 정보" screen="13·14·15" />} />
        <Route path="*" element={<ComingSoonPage title="없는 화면이에요" />} />
      </Route>
    </Routes>
  )
}
