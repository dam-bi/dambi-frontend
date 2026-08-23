import { Smartphone, User } from "lucide-react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { useState } from "react";

export default function Guest() {
  const [guestForm, setGuestForm] = useState({ name: "", phone: "" });

  const handleGuestForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuestForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <section className="w-full max-w-7xl px-5 py-20 mx-auto flex justify-center items-center">
      <div className="w-full max-w-100">
        <div className="flex flex-col items-center">
          <img
            src="/Dambi Logo.png"
            alt="담번에 온 비밀 티켓"
            className="w-25"
          />
          <h2 className="py-3 text-2xl font-medium">예매 내역 조회</h2>
          <p className="text-(--muted) text-sm">
            비회원도 이름과 연락처로 예매 내역을 확인할 수 있습니다.
          </p>
        </div>

        <form className="flex flex-col gap-5 py-10">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm">
              이름
            </label>
            <Input error={false}>
              <User />
              <input
                type="text"
                name="name"
                id="name"
                placeholder="이름"
                value={guestForm.name}
                onChange={handleGuestForm}
              />
            </Input>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="text-sm">
              연락처
            </label>
            <Input error={false}>
              <Smartphone />
              <input
                type="text"
                name="phone"
                id="phone"
                maxLength={11}
                value={guestForm.name}
                onChange={handleGuestForm}
                placeholder="010xxxxxxxx"
              />
            </Input>
          </div>
          <Button className="border border-(--signal) bg-(--signal) text-(--bg) mt-5">
            예매 내역 확인하기
          </Button>
        </form>
      </div>
    </section>
  );
}
