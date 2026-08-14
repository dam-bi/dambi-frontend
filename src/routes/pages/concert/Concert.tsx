import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useInView } from "react-intersection-observer";
import { ConcertItem, ConcertItemSkeleton } from "../../../components/Item";
import useInfiniteHook from "../../../hook/useInfiniteHook";

export default function Concert() {
  const [_, setFilter] = useState({ category: "concert", sort: "최신순" });
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading } =
    useInfiniteHook("concerts");

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { ref, inView } = useInView();

  useEffect(() => {
    if (hasNextPage && inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const concerts: Concert[] = data?.pages.flatMap((page) => page.content) ?? [];

  return (
    <section className="w-full max-w-7xl px-5 py-20 mx-auto">
      {/* filter */}
      <div className="flex justify-between items-center">
        {/* category */}
        <div></div>

        {/* sort */}
        <div>
          <select
            name="sort"
            id="sort"
            onChange={handleFilter}
            className="py-1.25 px-2.5 border border-(--line) rounded-xl focus:">
            <option value="전체">전체</option>
            <option value="최신순">최신순</option>
            <option value="높은 가격 순">높은 가격 순</option>
            <option value="낮은 가격 순">낮은 가격 순</option>
          </select>
        </div>
      </div>

      {/* 데이터 목록 */}
      <div className="mt-10">
        <ul className="flex flex-col gap-5">
          {isLoading
            ? Array.from({ length: 10 }).map((_, index: number) => (
                <li key={index}>
                  <ConcertItemSkeleton />
                </li>
              ))
            : concerts.map((concert: Concert, index) => (
                <li
                  key={concert.concertId}
                  ref={index === concerts.length - 1 ? ref : null}>
                  <Link to={`/concert/${concert.concertId}`}>
                    <ConcertItem concert={concert} index={index} />
                  </Link>
                </li>
              ))}
        </ul>
      </div>
    </section>
  );
}
