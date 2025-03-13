import { useMutation } from "@tanstack/react-query";
import { Login as LoginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: Login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => LoginApi({ email, password }),
    onSuccess: () => {
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Provided credentials are incorrect");
    },
  });
  return { Login, isLoading };
}
