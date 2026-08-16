import { Heart, Ticket, User } from "lucide-react";
import { Link, useNavigate } from "react-router";

export default function NavButton({ className }: { className: string }) {
  const navigate = useNavigate();
  return (
    <div className={`flex-col md:flex-row gap-5 ${className}`}>
      <button
        type="button"
        onClick={() => navigate("/auth/login")}
        className="flex gap-2.5 items-center border border-(--line) hover:bg-(--mist) py-2.5 px-5 rounded-xl md:border-0 md:p-0 md:hover:bg-transparent">
        <User stroke="var(--ink)" />
        <span className="text-sm text-(--ink)">로그인</span>
      </button>
      <button
        type="button"
        className="flex gap-2.5 items-center border border-(--line) hover:bg-(--mist) py-2.5 px-5 rounded-xl md:border-0 md:p-0 md:hover:bg-transparent">
        <Ticket stroke="var(--ink)" />
        <span className="text-sm text-(--ink)">예매 확인 / 취소</span>
      </button>
      <Link
        to="/wishList"
        type="button"
        className="flex gap-2.5 items-center border border-(--line) hover:bg-(--mist) py-2.5 px-5 rounded-xl md:border-0 md:p-0 md:hover:bg-transparent">
        <Heart stroke="var(--ink)" />
        <span className="text-sm text-(--ink)">찜목록</span>
      </Link>
    </div>
  );
}
