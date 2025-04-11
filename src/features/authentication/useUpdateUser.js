import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateUser as UpdateUserApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: UpdateUser, isLoading: isUpdating } = useMutation({
    mutationFn: UpdateUserApi,
    onSuccess: () => {
      toast.success("User Data Successfully Updated");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { UpdateUser, isUpdating };
}
