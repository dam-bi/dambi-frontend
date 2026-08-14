import { Link, useNavigate, useParams } from "react-router";
import { EventDetailPageSkeleton } from "../../../components/pageSkeleton";
import useQueryHook from "../../../hook/useQueryHook";
import toast from "react-hot-toast";

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    isLoading,
    isError,
    error,
    data: event,
  } = useQueryHook<EventDetail>("events", id!);

  if (isError && error) {
    toast.error("이벤트 정보를 찾을 수 없습니다. 이벤트 페이지로 돌아갑니다.", {
      duration: 3000,
    });
    navigate("/event");
    return;
  }

  if (isLoading || !event) return <EventDetailPageSkeleton />;

  return (
    <section className="w-full max-w-7xl px-5 py-20 mx-auto flex flex-col md:flex-row gap-5 relative">
      {/* 좌측 이벤트 정보 */}
      <div className="flex-2 ">
        <img
          src={event.concert.imgUrl}
          alt={event.concert.concertTitle}
          className="rounded-xl w-full aspect-video object-contain"
        />

        {/* 이벤트 상세 정보 */}
        <div className="mt-5">
          <span className="text-sm text-(--signal) font-bold">
            {event.status}
          </span>
          <h2 className="text-[28px] font-bold py-10">{event.eventTitle}</h2>

          {/* 공연 상세 정보 */}
          <ul>
            <li className="py-2.5 flex items-center gap-5">
              <span className="text-base text-(--muted) font-medium w-25">
                공연 제목
              </span>
              <p className="text-base text-(--muted) font-medium">
                {event.eventStartDate}
              </p>
            </li>
            <li className="py-2.5 flex items-center gap-5">
              <span className="text-base text-(--muted) font-medium w-25">
                관람 시간
              </span>
              <p className="text-base text-(--muted) font-medium">
                {event.concert.runningTime}분
              </p>
            </li>
            <li className="py-2.5 flex items-center gap-5">
              <span className="text-base text-(--muted) font-medium w-25">
                공연 장소
              </span>
              <p className="text-base text-(--muted) font-medium">
                {event.concert.venue}
              </p>
            </li>
            <li className="py-2.5 flex items-center gap-5">
              <span className="text-base text-(--muted) font-medium w-25">
                관람 등급
              </span>
              <p className="text-base text-(--muted) font-medium">
                {event.concert.ageRating}
              </p>
            </li>
            <li className="py-2.5 flex items-center gap-5">
              <span className="text-base text-(--muted) font-medium w-25">
                진행 기간
              </span>
              <p className="text-base text-(--muted) font-medium">
                {event.eventStartDate} ~ {event.eventEndDate}
              </p>
            </li>
          </ul>

          {/* 이벤트 설명글 */}
          <div className="mt-5">
            <h3 className="text-base font-bold pb-2 border-b-2 border-(--signal) w-fit mb-5">
              이벤트 상세
            </h3>
            <p>{event.eventDesc}</p>
          </div>
        </div>
      </div>

      {/* 우측 참여 버튼 */}
      <div className="flex-1 static mt-5 md:mt-0 md:sticky md:right-0 top-5 md:h-fit border border-(--line) rounded-xl p-5">
        <h3 className="text-2xl font-bold pb-1">참여하기</h3>

        <span className="text-sm text-(--muted) break-keep">
          로그인 후 예매하면 할인이 적용됩니다.
        </span>

        <ul className="pt-10 pb-5">
          <li className="flex justify-between items-center py-2.5 border-b border-dashed border-(--line)">
            <span className="text-sm text-(--muted)">대상 회원</span>
            <p className="text-sm text-(--muted)">회원</p>
          </li>
          <li className="flex justify-between items-center py-2.5 border-b border-dashed border-(--line)">
            <span className="text-sm text-(--muted)">적용 방식</span>
            <p className="text-sm text-(--muted)">자동 적용</p>
          </li>
          <li className="flex justify-between items-center py-2.5">
            <span className="text-sm font-bold">수수료 할인</span>
            <p className="text-sm font-bold">2,000원</p>
          </li>
        </ul>

        <div>
          {event.status === "진행중" ? (
            <>
              <Link
                to={`/concert/${event.concert.concertId}`}
                className="border border-(--signal) rounded-xl py-2.5 text-sm text-center font-semibold bg-(--signal) text-(--bg)">
                콘서트 보러 가기
              </Link>
              <Link
                to="/auth/login"
                className="border border-(--line) rounded-xl py-2.5 text-sm text-center font-semibold bg-(--bg) mt-2.5">
                로그인
              </Link>
            </>
          ) : (
            <div className="border border-(--muted) rounded-xl py-2.5 text-sm text-center font-semibold bg-(--muted) text-(--bg) mt-2.5">
              {event.status === "종료"
                ? "종료된 이벤트 입니다."
                : "예정된 이벤트 입니다."}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
