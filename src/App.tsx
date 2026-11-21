import { useEffect } from 'react'
import { Route, Routes, useLocation as useRouterLocation } from 'react-router'
import { KEYS, useStored } from './lib/storage'
import DocumentPage from './pages/DocumentPage'
import EmergencyPage from './pages/EmergencyPage'
import HelpPage from './pages/HelpPage'
import HomePage from './pages/HomePage'
import HospitalDetailPage from './pages/HospitalDetailPage'
import HospitalListPage from './pages/HospitalListPage'
import LoginCallbackPage from './pages/LoginCallbackPage'
import LoginPage from './pages/LoginPage'
import MyPage from './pages/MyPage'
import SymptomPage from './pages/SymptomPage'

// 화면 번호는 최종 시안(ux-v9/dowadream-final-screens.html) 기준
export default function App() {
  const [largeText] = useStored(KEYS.largeText)
  const { pathname } = useRouterLocation()

  useEffect(() => {
    document.documentElement.classList.toggle('large-text', largeText === '1')
  }, [largeText])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <Routes>
      <Route index element={<HomePage />} /> {/* 01, 02 */}
      <Route path="symptom" element={<SymptomPage />} /> {/* 03, 04, 05 */}
      <Route path="hospitals" element={<HospitalListPage />} /> {/* 06, 07 */}
      <Route path="hospitals/:id" element={<HospitalDetailPage />} /> {/* 08, 09, 10 */}
      <Route path="emergency" element={<EmergencyPage />} /> {/* 11, 12 */}
      <Route path="my" element={<MyPage />} /> {/* 13, 15 */}
      <Route path="login" element={<LoginPage />} /> {/* 14 */}
      <Route path="login/callback" element={<LoginCallbackPage />} />
      <Route path="document" element={<DocumentPage />} /> {/* 16 */}
      <Route path="help" element={<HelpPage />} /> {/* 17 */}
      <Route path="*" element={<HomePage />} />
    </Routes>
  )
}
