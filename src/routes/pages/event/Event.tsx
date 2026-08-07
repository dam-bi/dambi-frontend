import { useEffect, useState } from "react";
import { EventItem, EventItemSkeleton } from "../../../components/Item";
import useInfiniteHook from "../../../hook/useInfiniteHook";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router";

export default function Event() {
  const status = ["전체", "진행중", "예정", "종료"];
  const [currentStatus, setCurrentStatus] = useState("전체");

  const handleStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentStatus(e.target.value);
  };
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    isFetching,
  } = useInfiniteHook("events");

  const { ref, inView } = useInView();
  useEffect(() => {
    if (hasNextPage && inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const events: Event[] = data?.pages.flatMap((page) => page.content) ?? [];

  // console.log(event);

  return (
    <section className="w-full max-w-7xl px-5 py-20 mx-auto">
      <h3 className="text-xl font-semibold text-(--gold)">EVENT</h3>

      {/* filter */}
      <div className="my-10 rounded-xl border-(--cream) bg-(--cream) p-5">
        {/* status filter */}
        <div>
          <ul className="flex gap-2.5">
            {status.map((item: string, index: number) => (
              <li key={index}>
                <label
                  className={`px-4 py-2 border text-sm cursor-pointer rounded-xl ${currentStatus === item ? "bg-(--gold) text-(--bg) border-(--gold)" : "bg-(--bg) text-(--ink) border-(--border)"}`}>
                  {item}
                  <input
                    type="radio"
                    name="status"
                    value={item}
                    checked={currentStatus === item}
                    onChange={handleStatus}
                    className={`py-px px-2 rounded-xl hidden ${currentStatus}`}
                  />
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="">
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
          {isLoading
            ? Array.from({ length: 10 }).map((_, index: number) => (
                <li key={index}>
                  <EventItemSkeleton />
                </li>
              ))
            : events.map((event: Event, index) => (
                <li
                  key={event.eventId}
                  ref={index === events.length - 1 ? ref : null}>
                  <Link to={`/event/${event.eventId}`}>
                    <EventItem event={event} />
                  </Link>
                </li>
              ))}
        </ul>
      </div>
    </section>
  );
}
