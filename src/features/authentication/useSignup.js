// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { Login as LoginApi } from "../../services/apiAuth";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

import { useMutation } from "@tanstack/react-query";
import { CreateUser as CreateUserApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: CreateUserApi,
    onSuccess: (user) => {
      console.log(user),
        toast.success(
          "Account Successfully Created \n Please verify your email "
        );
    },
  });
  return { signup, isLoading };
}
