import { axiosInstance } from "./axios";

// signup
export async function signup({ signupData }: { signupData: SignupForm }) {
  const res = await axiosInstance.post("/auth/signup", signupData);
  return res.data;
}

export async function login({ loginData }: { loginData: LoginForm }) {
  const res = await axiosInstance.post("/auth/login", loginData);

  console.log(res);
}
