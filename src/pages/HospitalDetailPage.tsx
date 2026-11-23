import { useParams } from 'react-router'
import { useHospital } from '../api/hospitals'
import WaitingBox from '../components/WaitingBox'

// 08 병원 정보 (길찾기 10, 전화 연결 안내 09는 아직)
export default function HospitalDetailPage() {
  const { id } = useParams()
  const { data: h, isPending, isError } = useHospital(id!)

  if (isPending) return <p>불러오는 중이에요…</p>
  if (isError) return <p>병원 정보를 불러오지 못했어요.</p>

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-black">{h.name}</h1>
        {h.specialistTotal != null && <p className="text-gray-600">전문의 {h.specialistTotal}명</p>}
      </div>
      <section>
        <h2 className="mb-2 font-bold">진료실 앞 상황</h2>
        <WaitingBox waiting={h.waiting} />
      </section>
      <dl className="rounded-[22px] bg-white p-4">
        <dt className="font-bold">전화번호</dt>
        <dd className="mb-2">{h.phone ?? '-'}</dd>
        <dt className="font-bold">주소</dt>
        <dd>{h.address ?? '-'}</dd>
      </dl>
      {h.phone && (
        <a href={`tel:${h.phone}`} className="rounded-[18px] bg-teal py-4 text-center text-xl font-black text-white">
          전화하기
        </a>
      )}
      <p className="text-sm text-gray-500">자료: 건강보험심사평가원, 국립중앙의료원</p>
    </div>
  )
}
