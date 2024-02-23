import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { login as loginApi } from "../../services/apiAuth";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isLoggingIn, mutate: login } = useMutation({
    mutationFn: loginApi,

    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      console.error(error.message);
      toast.error("The provided email or password are incorrect");
    },
  });

  return { isLoggingIn, login };
}
