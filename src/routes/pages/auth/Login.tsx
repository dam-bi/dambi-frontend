import { Eye, EyeClosedIcon, Lock, Mail } from "lucide-react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { Link } from "react-router";
import { useState } from "react";

export default function Login() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleLoginForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleShowPassword = () =>
    setShowPassword((showPassword) => !showPassword);

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

        <form className="flex flex-col gap-5 py-10">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm">
              이메일
            </label>
            <Input error={false}>
              <Mail />
              <input
                type="email"
                name="email"
                id="email"
                value={loginForm.email}
                onChange={handleLoginForm}
              />
            </Input>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm">
              비밀번호
            </label>
            <div className="flex gap-2.5 items-center">
              <Input error={false}>
                <Lock />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
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
          </div>
          <Button
            type="submit"
            className="bg-(--signal) text-base font-semibold text-(--bg) mt-5">
            로그인
          </Button>
        </form>

        {/* 회원가입 라우트 */}
        <p className="flex items-center justify-center text-sm text-(--muted) gap-2">
          아직 담비 회원이 아니신가요?{" "}
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
