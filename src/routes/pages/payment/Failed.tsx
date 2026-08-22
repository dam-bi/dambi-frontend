import { OctagonAlert, X } from "lucide-react";

import { Link } from "react-router";
import Button from "../../../components/Button";

export default function Failed() {
  return (
    <section className="w-full max-w-7xl px-5 py-20 mx-auto">
      <div className="w-full max-w-105 mx-auto text-center">
        {/* 체크 아이콘 */}
        <div className="border border-(--danger) rounded-full w-25 h-25 flex justify-center items-center mx-auto">
          <X stroke="var(--danger)" strokeWidth={2} className="w-20 h-20" />
        </div>

        {/* 결제 메세지 */}
        <div className="my-10">
          <h2 className="text-2xl font-bold">결제에 실패했습니다.</h2>
          <p className="mt-2.5 mb-5 text-base font-medium text-(--muted)">
            결제 진행 중 문제가 발생해 티켓을 놓쳤습니다. <br />
            아래 내용을 확인하고 다시 시도해주세요.
          </p>
          <div className="bg-(--danger-bg) py-1.25 px-2.5 rounded-xl border border-(--danger) flex items-center justify-start gap-2.5">
            <OctagonAlert stroke="var(--danger)" className="w-3.5 h-3.5" />
            <span className="text-xs text-(--danger)">
              카드사 한도 초과 또는 승인 거절로 결제가 취소되었습니다.
            </span>
          </div>
        </div>

        {/* 예매한 공연 정보 */}
        <div className="p-5 border border-(--line) rounded-xl">
          <ul>
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
                결제 시도 금액
              </span>
              <p className="text-sm font-medium">220,000원</p>
            </li>
          </ul>
        </div>

        {/* 네비게이션 */}
        <div className="mt-5 flex gap-2.5">
          <Link
            to={"/wishList"}
            className="p-2.5 w-full border border-(--line) rounded-xl">
            찜목록으로 돌아가기
          </Link>
          <Button
            type="button"
            className="p-2.5 w-full border border-(--signal) bg-(--signal) text-(--bg) rounded-xl">
            다시 결제하기
          </Button>
        </div>
      </div>
    </section>
  );
}
