import { Eye, EyeClosedIcon, Loader, Lock, Mail } from "lucide-react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useLoginMutation } from "../../../hook/useAuthMutationHook";
import toast from "react-hot-toast";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const initForm = {
    email: "",
    password: "",
  };
  const [loginForm, setLoginForm] = useState(initForm);
  const [loginError, setLoginError] = useState(initForm);
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = useLoginMutation();

  const handleLoginForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setLoginError((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const toggleShowPassword = () =>
    setShowPassword((showPassword) => !showPassword);

  const sumbitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formError: LoginForm = {} as LoginForm;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!loginForm.email.trim()) {
      formError.email = "이메일을 입력해주세요.";
    } else if (!emailRegex.test(loginForm.email.trim())) {
      formError.email = "이메일 형식이 맞지 않습니다.";
    }

    if (loginForm.password.trim().length < 6) {
      formError.password = "비밀번호는 최소 6자 이상입니다.";
    }

    if (Object.keys(formError).length > 0) {
      setLoginError(formError);
      return;
    }

    mutate(loginForm, {
      onSuccess: () => {
        toast.success("로그인에 성공했습니다.");
        setLoginForm(initForm);
        setLoginError(initForm);
        setTimeout(() => navigate("/"), 1000);
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data?.message;
          toast.error(errorMessage);

          if (errorMessage === "가입되지 않았거나 틀린 이메일입니다") {
            setLoginError((prev) => ({
              ...prev,
              email: errorMessage,
            }));
          } else {
            setLoginError((prev) => ({
              ...prev,
              password: errorMessage,
            }));
          }
        }
      },
    });
  };

  return (
    <section className="w-full max-w-7xl px-5 py-20 mx-auto flex justify-center items-center">
      <div className="w-full max-w-100">
        <div className="flex flex-col items-center mb-6">
          <img
            src="/Dambi Logo.png"
            alt="담번에 온 비밀 티켓"
            className="w-25"
          />
          <h2 className="py-3 text-2xl font-medium">다시 만나 반가워요</h2>
          <p className="text-(--muted) text-sm">
            담비와 함께 오늘도 가장 빠르게 잡아볼까요?
          </p>
        </div>

        <form onSubmit={sumbitLogin} className="flex flex-col gap-5 py-10">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm">
              이메일
            </label>
            <Input error={!!loginError.email}>
              <Mail />
              <input
                type="email"
                name="email"
                id="email"
                disabled={isPending}
                value={loginForm.email}
                placeholder="example@email.com"
                onChange={handleLoginForm}
              />
            </Input>
            {loginError?.email && (
              <p className="text-(--danger) text-sm">{loginError.email}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm">
              비밀번호
            </label>
            <div className="flex gap-2.5 items-center">
              <Input error={!!loginError.password}>
                <Lock />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  disabled={isPending}
                  placeholder="******"
                  value={loginForm.password}
                  onChange={handleLoginForm}
                />
              </Input>
              <Button
                type="button"
                onClick={toggleShowPassword}
                className="border border-(--ink)">
                {showPassword ? <Eye /> : <EyeClosedIcon />}
              </Button>
            </div>
            {loginError?.password && (
              <p className="text-(--danger) text-sm">{loginError.password}</p>
            )}
          </div>
          <Button
            type="submit"
            disabled={isPending}
            className="bg-(--signal) text-base font-semibold text-(--bg) mt-5 flex justify-center items-center">
            {isPending ? <Loader className="animate-spin" /> : "로그인"}
          </Button>
        </form>

        {/* 회원가입 라우트 */}
        <p className="flex items-center justify-center text-sm text-(--muted) gap-2">
          아직 담비 회원이 아니신가요?
          <Link
            to="/auth/signup"
            className="text-(--ink) font-medium text-base">
            회원가입
          </Link>
        </p>
      </div>
    </section>
  );
}
