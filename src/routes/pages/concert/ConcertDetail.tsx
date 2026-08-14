import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { Heart } from "lucide-react";
import useQueryHook from "../../../hook/useQueryHook";
import { ConcertDetailPageSkeleton } from "../../../components/pageSkeleton";

export default function ConcertDetail() {
  // 브라우저 api
  const { id } = useParams();
  const navigate = useNavigate();
  // fetch
  const {
    isLoading,
    isError,
    error,
    data: concert,
  } = useQueryHook<ConcertDetail>("concerts", id!);
  // useState
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedRound, setSelectedRound] = useState("");

  if (isError && error) {
    toast.error("콘서트 정보를 찾을 수 없습니다. 콘서트 페이지로 돌아갑니다.", {
      duration: 3000,
    });
    setTimeout(() => navigate("/concert"), 3000);
    return;
  }

  if (isLoading || !concert) return <ConcertDetailPageSkeleton />;

  const defaultDate = concert.schedule[0]?.date || "";
  const currentDate = selectedDate || defaultDate;

  const targetDate = concert.schedule.find((item) => item.date === currentDate);

  const defaultRound = targetDate?.showList[0]?.time || "";
  const currentRound = selectedRound || defaultRound;

  const handleSelectedDate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);

    setSelectedRound("");
  };

  const handleSelectedRound = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRound = e.target.value;
    setSelectedRound(newRound);
  };

  return (
    <section className="w-full max-w-7xl px-5 py-20 mx-auto flex flex-col md:flex-row gap-5 relative">
      {/* 좌측 콘서트 정보 */}
      <div className="flex-2">
        {/* 이미지 */}
        <img
          src={concert.imgUrl}
          alt={concert.concertTitle}
          className="rounded-xl w-full aspect-video object-contain"
        />

        {/* 콘서트 상세 정보 */}
        <div className="mt-5">
          <h2 className="text-[28px] font-bold py-10">
            {concert.concertTitle}
          </h2>

          {/* 콘서트 상세 정보 */}
          <ul>
            <li className="py-2.5 flex items-center gap-5">
              <span className="text-base text-(--muted) font-medium w-25">
                관람 시간
              </span>
              <p className="text-base text-(--muted) font-medium">
                {concert.runningTime}분
              </p>
            </li>
            <li className="py-2.5 flex items-center gap-5">
              <span className="text-base text-(--muted) font-medium w-25">
                콘서트 장소
              </span>
              <p className="text-base text-(--muted) font-medium">
                {concert.venue}
              </p>
            </li>
            <li className="py-2.5 flex items-center gap-5">
              <span className="text-base text-(--muted) font-medium w-25">
                관람 등급
              </span>
              <p className="text-base text-(--muted) font-medium">
                {concert.ageRating}
              </p>
            </li>
            <li className="py-2.5 flex items-center gap-5">
              <span className="text-base text-(--muted) font-medium w-25">
                콘서트 기간
              </span>
              <p className="text-base text-(--muted) font-medium">
                {concert.concertStartDate} ~ {concert.concertEndDate}
              </p>
            </li>
          </ul>

          {/* 콘서트 설명글 */}
          <div className="mt-5">
            <h3 className="text-base font-bold pb-2 border-b-2 border-(--signal) w-fit mb-5">
              콘서트 상세
            </h3>
            <p>{concert.concertDesc}</p>
          </div>
        </div>
      </div>

      {/* 우측 참여 버튼 */}
      <div className="flex-1 static mt-5 md:mt-0 md:sticky md:right-0 top-5 md:h-fit border border-(--line) rounded-xl p-5">
        <h3 className="text-2xl font-bold pb-1">콘서트 정보 확인하기</h3>

        <span className="text-sm text-(--muted) break-keep">
          예매하기 전, 날짜 회차 좌석을 확인하실 수 있습니다.
        </span>

        <ul className="pt-10 pb-5 flex flex-col gap-5">
          {/* 날짜 */}
          <li>
            <span className="text-sm text-(--muted)">날짜</span>
            <div className="border border-(--line) bg-(--bg) w-full p-2.5 rounded-xl mt-1">
              <select
                onChange={handleSelectedDate}
                value={currentDate}
                className="w-full cursor-pointer focus:outline-none text-sm">
                {concert.schedule.map((item: ScheduleItem) => (
                  <option key={item.concertScheduleId} value={item.date}>
                    {item.date}
                  </option>
                ))}
              </select>
            </div>
          </li>
          {/* 회차 */}
          <li>
            <span className="text-sm text-(--muted)">회차</span>

            <div className="border border-(--line) bg-(--bg) w-full p-2.5 rounded-xl mt-1">
              <select
                onChange={handleSelectedRound}
                value={currentRound}
                className="w-full cursor-pointer focus:outline-none text-sm">
                {targetDate?.showList.map((show) => (
                  <option key={show.showId} value={show.time}>
                    {show.time}
                  </option>
                ))}
              </select>
            </div>
          </li>

          <li>
            <span className="text-sm text-(--muted)">잔여 좌석</span>
            <div className="border border-(--line) bg-(--bg) w-full p-5 rounded-xl mt-1">
              <ul className="flex flex-col gap-2.5">
                <li className="flex justify-between items-center text-sm">
                  <span>R석</span>
                  <p>10석</p>
                </li>
                <li className="flex justify-between items-center text-sm">
                  <span>R석</span>
                  <p>10석</p>
                </li>
                <li className="flex justify-between items-center text-sm">
                  <span>R석</span>
                  <p>10석</p>
                </li>
                <li className="flex justify-between items-center text-sm">
                  <span>R석</span>
                  <p>10석</p>
                </li>
              </ul>
            </div>
          </li>
        </ul>

        <div className="flex flex-col gap-2.5">
          <Link
            to="/checkout"
            className="rounded-xl py-4 px-8 text-center font-bold bg-(--signal) text-(--bg) text-base">
            예매하기
          </Link>
          <button
            type="button"
            className="border border-(--line) py-2.5 rounded-xl flex items-center justify-center gap-2.5 text-base font-semibold">
            <Heart />
            찜목록
          </button>
        </div>
      </div>
    </section>
  );
}
