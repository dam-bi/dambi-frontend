import { useMutation } from "@tanstack/react-query";
import { signup, login } from "../api/auth";
import { useAuthStore } from "../store/authStore";

export function useSignupMutation() {
  return useMutation({
    mutationFn: (signupData: SignupForm) => signup({ signupData }),
  });
}

export function useLoginMutation() {
  const setUser = useAuthStore((state) => state.setUser);
  return useMutation({
    mutationFn: (loginData: LoginForm) =>
      login({
        loginData,
      }),
    onSuccess: (data) => {
      setUser(data);
    },
  });
}
