import { Check, Copy } from "lucide-react";
import { useAuthStore } from "../../../store/authStore";
import Button from "../../../components/Button";
import { Link } from "react-router";

export default function Success() {
  const { user } = useAuthStore();
  return (
    <section className="w-full max-w-7xl px-5 py-20 mx-auto">
      <div className="w-full max-w-105 mx-auto text-center">
        {/* 체크 아이콘 */}
        <div className="border border-(--ok) rounded-full w-25 h-25 flex justify-center items-center mx-auto">
          <Check stroke="var(--ok)" strokeWidth={2} className="w-20 h-20" />
        </div>

        {/* 결제 메세지 */}
        <div className="my-10">
          <h2 className="text-2xl font-bold">결제가 완료되었습니다.</h2>
          <p className="mt-2.5 mb-5 text-base font-medium text-(--muted)">
            담비가 무사히 티켓을 물어왔어요.
          </p>
          {user ? (
            <div className="bg-(--ok-bg) py-1.25 px-2.5 rounded-xl border border-(--ok) flex items-center justify-center gap-2.5">
              <Check stroke="var(--ok)" className="w-3.5 h-3.5" />
              <span className="text-xs text-(--ok)">
                좌석이 정상적으로 확정되었습니다. 마이페이지에서 티켓을
                확인하세요.
              </span>
            </div>
          ) : (
            <>
              <div className="bg-(--ok-bg) py-1.25 px-2.5 rounded-xl border border-(--ok) flex flex-col items-center justify-center gap-2.5">
                <span className="text-xs text-(--ok)">
                  예매번호를 꼭 기억하세요!
                </span>
                <strong className="text-xl font-bold">
                  TCK-482390830231232-3294
                </strong>
              </div>
              <Button className="flex items-center gap-2.5 text-sm mx-auto mt-5">
                <Copy />
                <span>예매번호 복사하기</span>
              </Button>
            </>
          )}
        </div>

        {/* 예매한 공연 정보 */}
        <div className="p-5 border border-(--line) rounded-xl">
          <ul>
            <li className="py-2.5 border-b border-(--line) border-dashed flex items-center justify-between">
              <span className="text-sm font-medium text-(--muted)">
                예매번호
              </span>
              <p className="text-sm font-medium">TCK-482390830231232-3294</p>
            </li>
            <li className="py-2.5 border-b border-(--line) border-dashed flex items-center justify-between">
              <span className="text-sm font-medium text-(--muted)">
                콘서트명
              </span>
              <p className="text-sm font-medium">싸이 흠뻑쇼</p>
            </li>
            <li className="py-2.5 border-b border-(--line) border-dashed flex items-center justify-between">
              <span className="text-sm font-medium text-(--muted)">일자</span>
              <p className="text-sm font-medium">2026-10-10 (토) 19:00</p>
            </li>
            <li className="py-2.5 border-b border-(--line) border-dashed flex items-center justify-between">
              <span className="text-sm font-medium text-(--muted)">좌석</span>
              <p className="text-sm font-medium">A5, A6</p>
            </li>
            <li className="py-2.5 border-b border-(--line) border-dashed flex items-center justify-between">
              <span className="text-sm font-medium text-(--muted)">
                결제 수단
              </span>
              <p className="text-sm font-medium">카카오페이</p>
            </li>
            <li className="py-2.5 border-b border-(--line) border-dashed flex items-center justify-between">
              <span className="text-sm font-medium text-(--muted)">
                결제 금액
              </span>
              <p className="text-sm font-medium">220,000원</p>
            </li>
          </ul>
        </div>

        {/* 네비게이션 */}
        <div className="mt-5 flex gap-2.5">
          <Link
            to={"/"}
            className="p-2.5 w-full border border-(--line) rounded-xl">
            홈으로
          </Link>
          <Link
            to={"/"}
            className="p-2.5 w-full border border-(--signal) bg-(--signal) text-(--bg) rounded-xl">
            예매 내역 확인
          </Link>
        </div>
      </div>
    </section>
  );
}
