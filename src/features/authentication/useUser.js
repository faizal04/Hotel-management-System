// useUser.js
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const {
    isLoading,
    data: user,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  console.log("User data:", user);
  console.log("isLoading:", isLoading);
  console.log("isAuthenticated:", !!user); // true if user exists

  return {
    isLoading,
    user,
    isAuthenticated: !!user && !isError, // Ensure false if error or no user
  };
}
