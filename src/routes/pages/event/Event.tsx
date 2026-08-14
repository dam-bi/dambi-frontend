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
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading } =
    useInfiniteHook("events");

  const { ref, inView } = useInView();
  useEffect(() => {
    if (hasNextPage && inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const events: Event[] = data?.pages.flatMap((page) => page.content) ?? [];

  return (
    <section className="w-full max-w-7xl px-5 py-20 mx-auto">
      {/* status filter */}
      <div className="mb-10">
        <ul className="flex gap-2.5">
          {status.map((item: string, index: number) => (
            <li key={index}>
              <label
                className={`px-2.5 py-1.25 border text-sm cursor-pointer rounded-xl ${currentStatus === item ? "bg-(--signal) text-(--bg) border-(--signal)" : "bg-(--bg) text-(--ink) border-(--line)"}`}>
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
