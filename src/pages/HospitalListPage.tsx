import { Link } from 'react-router'
import { useHospitals } from '../api/hospitals'
import WaitingBox from '../components/WaitingBox'

// 06 병원 목록 (관심 병원 07·별 버튼은 아직)
export default function HospitalListPage() {
  const { data, isPending, isError } = useHospitals()

  if (isPending) return <p>병원을 불러오는 중이에요…</p>
  if (isError) return <p>병원 정보를 불러오지 못했어요. 잠시 뒤 다시 시도해 주세요.</p>

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-black">병원 찾기</h1>
      {data.map((h) => (
        <article key={h.id} className="rounded-[22px] bg-white p-4 shadow-md shadow-pink/10">
          <Link to={`/hospitals/${h.id}`} className="text-xl font-black">
            {h.name} ›
          </Link>
          <p className="mt-1 text-gray-600">
            {[h.typeName, h.distanceM != null && `${h.distanceM}m`, h.specialistTotal != null && `전문의 ${h.specialistTotal}명`]
              .filter(Boolean)
              .join(' · ')}
          </p>
          <div className="mt-3">
            <WaitingBox waiting={h.waiting} />
          </div>
          {h.phone && (
            <a href={`tel:${h.phone}`} className="mt-3 block rounded-[18px] bg-teal py-3 text-center text-lg font-black text-white">
              전화
            </a>
          )}
        </article>
      ))}
    </div>
  )
}
