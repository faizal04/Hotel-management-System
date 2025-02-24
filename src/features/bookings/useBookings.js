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
  const {
    data: bookings,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["bookings", filter, sortby],
    queryFn: () => getBookings({ filter, sortby }),
  });
  return { isLoading, bookings, error };
}
