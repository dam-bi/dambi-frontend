import { ArrowRight } from "lucide-react";

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
      className={`border border-(--line) rounded-xl overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1.5  hover:shadow-[0_12px_28px_rgba(26,26,26,0.2)] relative
    `}>
      {/* 이미지 */}
      <div className="relative">
        <img
          src={event.concertImg}
          alt={event.eventTitle}
          className="aspect-video object-cover"
        />
        <span className="border border-(--line) bg-(--mist) text-(--ink) rounded-xl px-2.5 py-1.25 text-sm absolute top-2.5 left-2.5">
          {event.status}
        </span>
      </div>
      {/* 이벤트 정보 */}
      <div className="p-5">
        <h2 className="text-base font-bold line-clamp-1">{event.eventTitle}</h2>
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
    <div className="border border-(--line) rounded-xl py-5 px-10  transition-all duration-300 ease-in-out hover:shadow-[0_12px_28px_rgba(26,26,26,0.2)] flex items-center">
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

      <span className="ml-auto px-4 py-2 flex items-center text-xl font-semibold text-(--signal)">
        예매하기 <ArrowRight />
      </span>
    </div>
  );
}

export function ReserveItemSkeleton() {
  return (
    <div className="border border-(--line) rounded-xl py-5 px-10  transition-all duration-300 ease-in-out hover:-translate-y-1.5  hover:shadow-[0_12px_28px_rgba(26,26,26,0.2)] flex flex-col gap-5  md:flex-row md:items-center">
      <div className="flex items-center flex-1 gap-2.5">
        {/* 이미지 */}
        <div className="bg-(--mist) w-30 h-40 rounded-xl animate-pulse" />

        {/* 정보 */}
        <div className="flex-1">
          {/* 티켓 번호 */}
          <div className="w-full max-w-50 h-5 bg-(--mist) rounded-xl mb-1.5 animate-pulse" />
          {/* 제목 */}
          <div className="w-[50%] max-w-30 h-5.5 bg-(--mist) rounded-xl mb-2 animate-pulse" />
          {/* 날짜 정보 */}
          <div className="w-full max-w-70 h-5 bg-(--mist) rounded-xl animate-pulse" />
        </div>
      </div>

      {/* 예매 정보 */}
      <div className="flex gap-5">
        <div className="w-14 h-10 bg-(--mist) rounded-xl  animate-pulse flex-1" />
        <div className="w-14 h-10 bg-(--mist) rounded-xl  animate-pulse flex-1" />
        <div className="w-14 h-10 bg-(--mist) rounded-xl  animate-pulse flex-1" />
      </div>
    </div>
  );
}
