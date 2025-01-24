import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabins as deleteCabinsApi } from "../../services/apiCabins";
import toast from "react-hot-toast";
function useDeleteCabin() {
  const queryClient = useQueryClient();
  //eslint-disable-next-line
  const { isLoading, mutate: deleteCabin } = useMutation({
    mutationFn: (id) => deleteCabinsApi(id),
    onSuccess: () => {
      toast("Cabin deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
  });
  return { isLoading, deleteCabin };
}

export default useDeleteCabin;
