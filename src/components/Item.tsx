export function EventItemSkeleton() {
  return (
    <div className="border border-(--border) transition-all duration-300 ease-in-out hover:-translate-y-1.5  hover:shadow-[0_12px_28px_rgba(26,26,26,0.2)]">
      {/* 이미지 */}
      <div className="bg-(--muted) aspect-video p-2.5">
        <div className="border border-(--border) rounded-xl bg-(--bg) py-px px-2 w-13.75 h-5" />
      </div>
      {/* 이벤트 정보 */}
      <div className="p-5">
        {/* 제목 */}
        <div className="w-45 h-4.5 rounded-xl bg-(--border) mb-2" />
        {/* 날짜 */}
        <div className="w-25 h-4 rounded-xl bg-(--border)" />
      </div>
    </div>
  );
}

export function EventItem({ event }: { event: Event }) {
  return (
    <div
      className={`border border-(--border) rounded-xl overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1.5  hover:shadow-[0_12px_28px_rgba(26,26,26,0.2)] relative
    `}>
      {/* 이미지 */}
      <div className="relative">
        <img
          src={event.concertImg}
          alt={event.eventTitle}
          className="aspect-video object-cover"
        />
        <span
          className={`border rounded-xl px-3 py-1.5 text-xs absolute top-2.5 left-2.5 ${event.status === "종료" ? "border-(--muted) bg-(--muted) text-(--border)" : "border-(--border) bg-(--bg) text-(--ink)"}`}>
          {event.status}
        </span>
      </div>
      {/* 이벤트 정보 */}
      <div className="p-5">
        {/* 제목 */}
        <span
          className={`text-xs font-bold ${event.status === "종료" ? "text-(--muted)" : "text-(--gold)"}`}>
          EVENT
        </span>
        <h2
          className={`mb-2 line-clamp-1 break-keep ${event.status === "종료" ? "text-(--muted) font-regular" : "text-(--ink) font-bold"}`}>
          {event.eventTitle}
        </h2>
        <p className="text-(--muted) text-sm">
          {event.eventStartDate} ~ {event.eventEndDate}
        </p>
      </div>
    </div>
  );
}

export function ConcertItemSkeleton() {
  return (
    <div className="border border-(--border) rounded-xl py-5 px-10  transition-all duration-300 ease-in-out hover:-translate-y-1.5  hover:shadow-[0_12px_28px_rgba(26,26,26,0.2)] flex items-center">
      {/* 순위 */}
      <div className="bg-(--cream) w-14 h-14 rounded-xl" />

      {/* 이미지 */}
      <div className="bg-(--cream) w-30 h-40 rounded-xl ml-20" />

      {/* 정보 */}
      <div className="ml-2.5">
        {/* 태그 */}
        <div className="w-10 h-5 bg-(--cream) rounded-xl mb-1.5" />
        {/* 제목 */}
        <div className="w-50 h-5.5 bg-(--cream) rounded-xl mb-2" />
        {/* 태그 */}
        <div className="w-75 h-5 bg-(--cream) rounded-xl" />
      </div>

      <div className="w-14 h-10 bg-(--cream) rounded-xl ml-auto" />
    </div>
  );
}

export function ConcertItem({
  concert,
  index,
}: {
  concert: Concert;
  index: number;
}) {
  return (
    <div className="border border-(--border) rounded-xl py-5 px-10  transition-all duration-300 ease-in-out hover:shadow-[0_12px_28px_rgba(26,26,26,0.2)] flex items-center">
      {/* 순위 */}
      <strong className="text-3xl font-bold text-(--danger)">
        {`${index + 1}`.padStart(2, "0")}
      </strong>

      {/* 이미지 */}
      <img
        src={concert.imgUrl}
        alt={concert.concertTitle}
        className="w-30 rounded-xl ml-20 "
      />

      {/* 정보 */}
      <div className="ml-2.5">
        {/* 태그 */}
        <div className="w-10 h-5 bg-(--cream) rounded-xl mb-1.5" />
        {/* 제목 */}
        <h3 className="text-lg font-bold line-clamp-1 mb-2">
          {concert.concertTitle}
        </h3>
        {/* 간단 정보 */}
        <ul className="flex gap-2.5">
          <li>
            <span className="text-xs text-(--muted)">
              {concert.concertStartDate} ~ {concert.concertEndDate}
            </span>
          </li>
          <li>
            <span className="text-xs text-(--muted)">{concert.venue}</span>
          </li>
        </ul>
      </div>

      <span className="rounded-xl ml-auto px-4 py-2 border border-(--border) hover:bg-(--gold) hover:border-(--gold) hover:text-(--bg)">
        예매
      </span>
    </div>
  );
}
