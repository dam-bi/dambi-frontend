export function EventDetailPageSkeleton() {
  return (
    <section className="w-full max-w-7xl px-5 py-20 mx-auto">
      <div className="w-full flex flex-col gap-6 md:flex-row">
        {/* img */}
        <div className="w-full aspect-video md:aspect-auto bg-(--border)" />
        {/* 기본 정보 */}
        <div className="w-full">
          {/* 타이틀 */}
          <div className="w-full h-7.5 bg-(--border) mb-5" />
          <hr className="w-full border-(--border)" />

          {/* 기본정보 */}
          <ul className="grid grid-cols-2 gap-6 mt-10">
            <li className="w-full h-5 bg-(--border)" />
            <li className="w-full h-5 bg-(--border)" />
            <li className="w-full h-5 bg-(--border)" />
            <li className="w-full h-5 bg-(--border)" />
            <li className="w-full h-5 bg-(--border)" />
            <li className="w-full h-5 bg-(--border)" />
          </ul>
          {/* 이벤트 설명글 */}
          <div className="w-full h-30 bg-(--border) mt-6" />
        </div>
      </div>

      {/* 예매버튼 */}
      <div className="w-46 h-18.5 bg-(--border) mt-10 ml-auto" />

      {/* 상세정보란 */}
      <div className="mt-10">
        {/* 네비게이션 */}
        <div className="w-75 h-7.5 bg-(--border)" />
        <hr className="w-full border-(--border)" />
        {/* 상세내용 */}
        <div className="mt-10 w-full h-60 bg-(--border)" />
      </div>
    </section>
  );
}
