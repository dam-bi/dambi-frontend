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

export function ConcertDetailPageSkeleton() {
  return (
    <section className="w-full max-w-7xl px-5 py-20 mx-auto flex flex-col md:flex-row gap-5 relative">
      {/* 좌측 이벤트 정보 */}
      <div className="flex-2 ">
        {/* 이미지 */}
        <div className="rounded-xl w-full aspect-1/2 bg-(--cream)" />

        {/* 이벤트 상세 정보 */}
        <div className="mt-5">
          <div className="w-10 h-5 bg-(--cream) rounded-xl" />
          <div className="mt-2 mb-3 w-50 h-12.5 bg-(--cream) rounded-xl" />

          {/* 콘서트 상세 정보 */}
          <ul>
            <li className="py-1.5 flex items-center gap-5">
              <span className="text-sm text-(--muted) font-semibold w-25">
                관람 시간
              </span>
              <div className="w-50 h-6 bg-(--cream) rounded-xl" />
            </li>
            <li className="py-1.5 flex items-center gap-5">
              <span className="text-sm text-(--muted) font-semibold w-25">
                콘서트 장소
              </span>
              <div className="w-50 h-6 bg-(--cream) rounded-xl" />
            </li>
            <li className="py-1.5 flex items-center gap-5">
              <span className="text-sm text-(--muted) font-semibold w-25">
                관람 등급
              </span>
              <div className="w-50 h-6 bg-(--cream) rounded-xl" />
            </li>
            <li className="py-1.5 flex items-center gap-5">
              <span className="text-sm text-(--muted) font-semibold w-25">
                콘서트 기간
              </span>
              <div className="w-50 h-6 bg-(--cream) rounded-xl" />
            </li>
          </ul>

          {/* 이벤트 설명글 */}
          <div className="mt-5">
            <h3 className="text-base font-bold pb-2 border-b-2 border-(--gold) w-fit mb-5">
              콘서트 상세
            </h3>
            <div className="w-full h-20 bg-(--cream) rounded-xl" />
          </div>
        </div>
      </div>

      {/* 우측 참여 버튼 */}
      <div className="flex-1 static mt-5 md:mt-0 md:sticky md:right-0 top-5 md:h-fit border border-(--border) rounded-xl p-5">
        <h3 className="text-lg font-bold pb-4">콘서트 정보 확인하기</h3>

        <span className="text-sm text-(--muted) break-keep">
          예매하기 전, 날짜 회차 좌석을 확인하실 수 있습니다.
        </span>

        <ul className="pt-5 pb-4">
          <li className="py-2">
            <span className="text-sm text-(--muted)">날짜</span>
            <div className="border border-(--border) bg-(--cream) w-full h-10 rounded-xl" />
          </li>
          <li className="py-2">
            <span className="text-sm text-(--muted)">회차</span>
            <div className="border border-(--border) bg-(--cream) w-full h-10 rounded-xl" />
          </li>
          <li className="py-2">
            <span className="text-sm text-(--muted)">잔여 좌석</span>
            <div className="border border-(--border) bg-(--cream) w-full h-10 rounded-xl" />
          </li>
        </ul>

        <div>
          <div className="border border-(--border) rounded-xl py-4 px-8 text-center font-bold bg-(--cream) text-(--ink) hover:border-(--gold) hover:bg-(--gold) hover:text-(--bg)">
            예매하기
          </div>
        </div>
      </div>
    </section>
  );
}
