// 아직 만들지 않은 화면 자리
export default function ComingSoonPage({ title, screen }: { title: string; screen?: string }) {
  return (
    <div className="py-10 text-center">
      <h1 className="text-2xl font-black">{title}</h1>
      <p className="mt-2 text-gray-600">준비 중이에요{screen && ` (시안 ${screen})`}</p>
    </div>
  )
}
