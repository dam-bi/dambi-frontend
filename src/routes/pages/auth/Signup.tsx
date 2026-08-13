import { Eye, EyeClosedIcon, Lock, Mail, Smartphone, User } from "lucide-react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Signup() {
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [signupError, setSignupError] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    phone: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleSignupForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleShowPassword = () =>
    setShowPassword((showPassword) => !showPassword);

  useEffect(() => {
    if (signupForm.password && signupForm.confirmPassword) {
      if (signupForm.password !== signupForm.confirmPassword) {
        setSignupError((prev) => ({ ...prev, confirmPassword: true }));
      } else {
        setSignupError((prev) => ({ ...prev, confirmPassword: false }));
      }
    }
  }, [signupForm.confirmPassword]);

  const submitSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!signupForm.name.trim()) {
      setSignupError((prev) => ({ ...prev, name: true }));
      toast.error("이름을 입력해주세요.");
      return;
    }

    if (!signupForm.email.trim()) {
      setSignupError((prev) => ({ ...prev, email: true }));
      toast.error("이메일을 입력해주세요.");
      return;
    }

    if (!signupForm.password.trim()) {
      setSignupError((prev) => ({ ...prev, password: true }));
      toast.error("비밀번호를 입력해주세요.");
      return;
    }

    if (!signupForm.confirmPassword.trim()) {
      setSignupError((prev) => ({ ...prev, confirmPassword: true }));
      toast.error("비밀번호를 한번 더 입력해주세요.");
      return;
    }

    if (!signupForm.phone.trim()) {
      setSignupError((prev) => ({ ...prev, phone: true }));
      toast.error("연락처 입력해주세요.");
      return;
    }
  };

  return (
    <section className="w-full max-w-7xl px-5 py-20 mx-auto flex justify-center items-center">
      <div className="w-full max-w-100 border border-(--border) p-5 rounded-xl">
        <div className="flex flex-col items-center mb-6">
          <img
            src="/Dambi Logo.png"
            alt="담번에 온 비밀 티켓"
            className="w-25"
          />
          <h2 className="pt-4.5 pb-2 text-2xl font-bold">
            담비의 새 식구가 되어주세요.
          </h2>
          <p className="text-(--muted) text-sm">
            가입 후 첫 예매 수수료 0원 혜택을 드립니다.
          </p>
        </div>

        <form onSubmit={submitSignup} className="flex flex-col gap-3 mb-10">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm text-(--muted)">
              이름
            </label>
            <Input error={signupError.name}>
              <User />
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="off"
                value={signupForm.name}
                onChange={handleSignupForm}
              />
            </Input>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm text-(--muted)">
              이메일
            </label>
            <div className="flex gap-2.5 items-center">
              <Input error={signupError.email}>
                <Mail />
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={signupForm.email}
                  onChange={handleSignupForm}
                />
              </Input>
              <Button
                type="button"
                className="border border-(--border) text-nowrap text-sm">
                중복 확인
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm text-(--muted)">
              비밀번호
            </label>
            <div className="flex gap-2.5 items-center">
              <Input error={signupError.password}>
                <Lock />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  autoComplete="off"
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
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="confirmPassword" className="text-sm text-(--muted)">
              비밀번호 확인
            </label>
            <Input error={signupError.confirmPassword}>
              <Lock />
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                autoComplete="off"
                value={signupForm.confirmPassword}
                onChange={handleSignupForm}
              />
            </Input>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="text-sm text-(--muted)">
              연락처
            </label>
            <Input error={signupError.phone}>
              <Smartphone />
              <input
                type="text"
                name="phone"
                id="phone"
                autoComplete="off"
                placeholder="010xxxxxxxx"
                className="placeholder:text-(--danger)"
                value={signupForm.phone}
                onChange={handleSignupForm}
              />
            </Input>
          </div>
          <Button
            type="submit"
            className="border border-(--border) bg-(--cream) mt-5">
            회원가입
          </Button>
        </form>

        {/* 회원가입 라우트 */}
        <div className="pt-10 pb-5 border-t border-(--border)">
          <span className="flex items-center justify-center text-xs text-(--muted) gap-2">
            이미 계정이 있으신가요?
            <Link to="/auth/login" className="text-(--ink) font-medium">
              로그인
            </Link>
          </span>
        </div>
      </div>
    </section>
  );
}
