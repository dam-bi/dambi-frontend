import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../api/fetchData";

export default function useQueryHook<T>(type: string, id: string) {
  return useQuery<T>({
    queryKey: [type, id],
    queryFn: () => {
      return fetchData(type, id);
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 5,
    retry: 3,
    retryDelay: 1000,
  });
}
