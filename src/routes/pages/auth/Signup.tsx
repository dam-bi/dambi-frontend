import { Eye, EyeClosedIcon, Lock, Mail, Smartphone, User } from "lucide-react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useSignupMutation } from "../../../hook/useAuthMutationHook";
import toast from "react-hot-toast";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();
  const initForm = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  };
  const [signupForm, setSignupForm] = useState(initForm);
  const [signupError, setSignupError] = useState(initForm);
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = useSignupMutation();

  const handleSignupForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setSignupError((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const toggleShowPassword = () =>
    setShowPassword((showPassword) => !showPassword);

  const submitSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formError: SignupValidate = {} as SignupValidate;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!signupForm.name.trim()) formError.name = "이름을 입력해주세요";

    if (!signupForm.email.trim()) {
      formError.email = "이메일을 입력해주세요";
    } else if (!emailRegex.test(signupForm.email.trim())) {
      formError.email = "이메일 형식이 맞지 않습니다";
    }

    if (signupForm.password.trim().length < 6)
      formError.password = "비밀번호는 최소 6자 이상이여야 합니다";

    if (!signupForm.confirmPassword.trim())
      formError.confirmPassword = "비밀번호 확인을 입력해주세요";

    if (signupForm.password.trim() !== signupForm.confirmPassword.trim())
      formError.confirmPassword = "비밀번호가 일치하지 않습니다";

    if (!signupForm.phone.trim()) formError.phone = "연락처를 입력해주세요";

    if (Object.keys(formError).length > 0) {
      setSignupError(formError);
      return;
    }

    const signupData = {
      name: signupForm.name,
      email: signupForm.email,
      password: signupForm.password,
      phone: signupForm.phone,
    };

    mutate(signupData, {
      onSuccess: () => {
        toast.success("회원가입이 완료되었습니다.");
        setSignupForm(initForm);
        setSignupError(initForm);
        setTimeout(() => navigate("/auth/login"), 1000);
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data?.message;

          if (!errorMessage) toast.error("회원가입에 실패했습니다.");
          
          setSignupError((prev) => ({
            ...prev,
            email: errorMessage,
          }));
        } else {
          toast.error("알 수 없는 에러가 발생했습니다.");
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
          <h2 className="py-3 text-2xl font-medium">
            담비의 새 식구가 되어주세요.
          </h2>
          <p className="text-(--muted) text-sm">
            가입 후 첫 예매 수수료 0원 혜택을 드립니다.
          </p>
        </div>

        <form onSubmit={submitSignup} className="flex flex-col gap-5 py-10">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm">
              이름
            </label>
            <Input error={!!signupError.name}>
              <User />
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="off"
                placeholder="이름"
                value={signupForm.name}
                onChange={handleSignupForm}
              />
            </Input>
            {signupError?.name && (
              <p className="text-(--danger) text-sm">{signupError.name}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm">
              이메일
            </label>
            <Input error={!!signupError.email}>
              <Mail />
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                placeholder="example@email.com"
                value={signupForm.email}
                onChange={handleSignupForm}
              />
            </Input>
            {signupError?.email && (
              <p className="text-(--danger) text-sm">{signupError.email}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm">
              비밀번호
            </label>
            <div className="flex gap-2.5 items-center">
              <Input error={!!signupError.password}>
                <Lock />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  autoComplete="off"
                  placeholder="최소 6자 이상"
                  value={signupForm.password}
                  onChange={handleSignupForm}
                />
              </Input>
              <Button
                type="button"
                onClick={toggleShowPassword}
                className="border border-(--border)">
                {showPassword ? <Eye /> : <EyeClosedIcon />}
              </Button>
            </div>
            {signupError?.password && (
              <p className="text-(--danger) text-sm">{signupError.password}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="confirmPassword" className="text-sm">
              비밀번호 확인
            </label>
            <Input error={!!signupError.confirmPassword}>
              <Lock />
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                autoComplete="off"
                placeholder="비밀번호를 한번 더 입력해주세요"
                value={signupForm.confirmPassword}
                onChange={handleSignupForm}
              />
            </Input>
            {signupError?.confirmPassword && (
              <p className="text-(--danger) text-sm">
                {signupError.confirmPassword}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="text-sm">
              연락처
            </label>
            <Input error={!!signupError.phone}>
              <Smartphone />
              <input
                type="text"
                name="phone"
                id="phone"
                autoComplete="off"
                placeholder="010xxxxxxxx"
                maxLength={11}
                value={signupForm.phone}
                onChange={handleSignupForm}
              />
            </Input>
            {signupError?.phone && (
              <p className="text-(--danger) text-sm">{signupError.phone}</p>
            )}
          </div>
          <Button
            type="submit"
            className="bg-(--signal) text-base font-semibold text-(--bg) mt-5">
            {isPending ? "처리 중..." : "회원가입"}
          </Button>
        </form>

        {/* 회원가입 라우트 */}
        <p className="flex items-center justify-center text-sm text-(--muted) gap-2">
          이미 계정이 있으신가요?
          <Link to="/auth/login" className="text-(--ink) font-medium text-base">
            로그인
          </Link>
        </p>
      </div>
    </section>
  );
}
