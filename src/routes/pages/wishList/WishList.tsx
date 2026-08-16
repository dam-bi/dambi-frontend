import { Link } from "react-router";
import { useWishListStore } from "../../../store/useWishListStore";
import Button from "../../../components/Button";

export default function WishList() {
  const { wishList, removeWishList, clearWishList } = useWishListStore();

  return (
    <section className="w-full max-w-7xl px-5 py-20 mx-auto">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-[28px] font-bold mb-1">찜목록</h2>
          <p className="text-sm text-(--muted) font-medium">
            담아둔 티켓은 좌석 상황에 따라 매진될 수 있어요. 서두르세요!
          </p>
        </div>
        <Button
          type="button"
          disabled={wishList.length === 0}
          onClick={clearWishList}
          className="bg-(--signal) text-sm font-normal text-(--bg) disabled:cursor-not-allowed disabled:bg-(--muted)">
          전체 삭제
        </Button>
      </div>

      {wishList.length > 0 ? (
        <div className="mt-10">
          <div className="flex border-b border-(--line)">
            <strong className="hidden text-sm text-(--muted) font-normal py-2.5 md:block flex-2 text-center">
              콘서트 정보
            </strong>
            <strong className="hidden text-sm text-(--muted) font-normal py-2.5 md:block flex-1 text-center">
              콘서트 페이지로 이동
            </strong>
            <strong className="hidden text-sm text-(--muted) font-normal py-2.5 md:block flex-1 text-center">
              찜목록에 제거
            </strong>
            <strong className="block text-sm text-(--muted) font-normal py-2.5 md:hidden flex-1 text-center">
              찜목록 정보
            </strong>
          </div>

          <ul>
            {wishList.map((wishItem) => (
              <li
                key={wishItem.concertId}
                className="border-b border-dashed border-(--line) flex flex-col md:flex-row">
                {/* 콘서트 정보 */}
                <div className="py-2.5 flex-1 flex gap-5 items-center">
                  <img
                    src={wishItem.imgUrl}
                    alt={wishItem.concertTitle}
                    className="w-30 rounded-xl"
                  />
                  <div>
                    <h3 className="text-xl font-semibold mb-5 break-keep">
                      {wishItem.concertTitle}
                    </h3>
                    <div className="flex gap-2.5 flex-wrap">
                      <span className="text-sm text-(--muted)">
                        {wishItem.concertStartDate}
                      </span>
                      <span className="text-sm text-(--muted)">
                        {wishItem.venue}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1">
                  {/* 콘서트 바로가기 */}
                  <div className="py-2.5 flex-1 flex justify-center items-center">
                    <Link
                      to={`/concert/${wishItem.concertId}`}
                      className="py-2.5">
                      콘서트 페이지로 이동
                    </Link>
                  </div>
                  {/* 찜목록 삭제 */}
                  <div className="py-2.5 flex-1 flex justify-center items-center">
                    <button
                      type="button"
                      className="text-center w-full text-(--danger)"
                      onClick={() => removeWishList(wishItem)}>
                      찜목록 제거
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-5 py-20">
          <img src="./Dambi Logo.png" alt="담비" className="w-25" />
          <h3 className="text-xl font-bold">아직 찜한 콘서트가 없습니다.</h3>
          <Link
            to="/concert"
            className="py-2.5 px-5 rounded-xl bg-(--signal) text-(--bg)">
            콘서트 둘러보러 가기
          </Link>
        </div>
      )}
    </section>
  );
}
