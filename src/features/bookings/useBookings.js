import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
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
  return { isLoading, bookings, error, count };
}
