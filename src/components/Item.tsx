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
