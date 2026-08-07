import { useEffect, useState } from "react";
import { ConcertItem, ConcertItemSkeleton } from "../../../components/Item";
import useInfiniteHook from "../../../hook/useInfiniteHook";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router";

export default function Concert() {
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    isFetching,
  } = useInfiniteHook("concerts");

  const { ref, inView } = useInView();
  useEffect(() => {
    if (hasNextPage && inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const concerts: Concert[] = data?.pages.flatMap((page) => page.content) ?? [];

  console.log(concerts);

  return (
    <section className="w-full max-w-7xl px-5 py-20 mx-auto">
      <h3 className="text-xl font-semibold text-(--gold)">CONCERT</h3>

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

// : concert.map((event: Event, index) => <li></li>)
