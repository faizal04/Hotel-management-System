import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { pageSize } from "../../utils/Constant";

export function useBookings() {
  const QueryClient = useQueryClient();
  const [searchparams] = useSearchParams();
  let filterValue = searchparams.get("status");
  const filter = { field: "status", value: filterValue || "all" };
  let sortValueRaw = searchparams.get("sortby") || "startDate-desc";
  const [field, direction] = sortValueRaw.split("-");

  let sortby = { field, direction };
  const page = !searchparams.get("page") ? 1 : Number(searchparams.get("page"));
  const {
    data: { data: bookings, count } = {},
    error,
    isLoading,
  } = useQuery({
    queryKey: ["bookings", filter, sortby, page],
    queryFn: () => getBookings({ filter, sortby, page }),
  });

  const pageCount = Math.ceil(count / pageSize);
  if (page < pageCount)
    QueryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortby, page + 1],
      queryFn: () => getBookings({ filter, sortby, page: page + 1 }),
    });

  if (page > 1)
    QueryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortby, page + 1],
      queryFn: () => getBookings({ filter, sortby, page: page + 1 }),
    });
  return { isLoading, bookings, error, count };
}
