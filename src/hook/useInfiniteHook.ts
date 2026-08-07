import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchAllData } from "../api/fetchData";

export default function useInfiniteHook(type: string) {
  return useInfiniteQuery({
    queryKey: [type],
    queryFn: ({ pageParam }) => {
      return fetchAllData({ type, page: pageParam, pageNum: 10 });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.last ? undefined : lastPage.number + 1,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 10,
  });
}
