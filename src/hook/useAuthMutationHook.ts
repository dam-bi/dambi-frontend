import { useMutation } from "@tanstack/react-query";
import { signup, login } from "../api/auth";

export function useSignupMutation() {
  return useMutation({
    mutationFn: (signupData: SignupForm) => signup({ signupData }),
  });
}

export function useLoginMutation() {
  return useMutation({
    mutationFn: (loginData: LoginForm) =>
      login({
        loginData,
      }),
  });
}
