import { Link, useNavigate, useParams } from "react-router";
import useQueryHook from "../../../hook/useQueryHook";
import toast from "react-hot-toast";
import { ConcertDetailPageSkeleton } from "../../../components/pageSkeleton";
import { useEffect, useState } from "react";

export default function ConcertDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    isLoading,
    isError,
    error,
    data: concert,
  } = useQueryHook<ConcertDetail>("concerts", id!);

  if (isError && error) {
    toast.error("콘서트 정보를 찾을 수 없습니다. 콘서트 페이지로 돌아갑니다.", {
      duration: 3000,
    });
    navigate("/concert");
    return;
  }

  // 정보확인
  const [checkInfo, setCheckInfo] = useState({ date: "", round: "" });

  const handleCheckInfo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "date") {
      const newTargetDate = concert?.schedule.find(
        (item) => item.date === value,
      );
      const defaultRound = newTargetDate?.showList[0]?.time || "";

      setCheckInfo({
        date: value,
        round: defaultRound,
      });
    } else {
      setCheckInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    if (concert && concert.schedule.length > 0) {
      const firstSchedule = concert.schedule[0];
      const firstDate = firstSchedule.date;
      const firstRound =
        firstSchedule.showList.length > 0 ? firstSchedule.showList[0].time : "";

      setCheckInfo({
        date: firstDate,
        round: firstRound,
      });
    }
  }, [concert]);

  const targetDate = concert?.schedule.find(
    (item) => item.date === checkInfo.date,
  );

  console.log(checkInfo);

  if (isLoading || !concert) return <ConcertDetailPageSkeleton />;

  return (
    <section className="w-full max-w-7xl px-5 py-20 mx-auto flex flex-col md:flex-row gap-5 relative">
      {/* 좌측 콘서트 정보 */}
      <div className="flex-2 ">
        {/* 이미지 */}
        <img
          src={concert.imgUrl}
          alt={concert.concertTitle}
          className="rounded-xl w-full"
        />

        {/* 콘서트 상세 정보 */}
        <div className="mt-5">
          {/* <span className="text-sm text-(--gold) font-bold">
            {concert.status}
          </span> */}
          <h2 className="text-2xl font-bold pt-2 pb-3">
            {concert.concertTitle}
          </h2>

          {/* 콘서트 상세 정보 */}
          <ul>
            <li className="py-1.5 flex items-center gap-5">
              <span className="text-sm text-(--muted) font-semibold w-25">
                관람 시간
              </span>
              <p>{concert.runningTime}</p>
            </li>
            <li className="py-1.5 flex items-center gap-5">
              <span className="text-sm text-(--muted) font-semibold w-25">
                콘서트 장소
              </span>
              <p>{concert.venue}</p>
            </li>
            <li className="py-1.5 flex items-center gap-5">
              <span className="text-sm text-(--muted) font-semibold w-25">
                관람 등급
              </span>
              <p>{concert.ageRating}</p>
            </li>
            <li className="py-1.5 flex items-center gap-5">
              <span className="text-sm text-(--muted) font-semibold w-25">
                콘서트 기간
              </span>
              <p>
                {concert.concertStartDate} ~ {concert.concertEndDate}
              </p>
            </li>
          </ul>

          {/* 이벤트 설명글 */}
          <div className="mt-5">
            <h3 className="text-base font-bold pb-2 border-b-2 border-(--gold) w-fit mb-5">
              콘서트 상세
            </h3>
            <p>{concert.concertDesc}</p>
          </div>
        </div>
      </div>

      {/* 우측 참여 버튼 */}
      <div className="flex-1 static mt-5 md:mt-0 md:sticky md:right-0 top-5 md:h-fit border border-(--border) rounded-xl p-5">
        <h3 className="text-lg font-bold pb-4">콘서트 정보 확인하기</h3>

        <span className="text-sm text-(--muted) break-keep">
          예매하기 전, 날짜 회차 좌석을 확인하실 수 있습니다.
        </span>

        <ul className="pt-5 pb-4">
          {/* 날짜 */}
          <li className="py-2">
            <span className="text-sm text-(--muted)">날짜</span>
            <div className="border border-(--border) bg-(--cream) w-full p-2.5 rounded-xl">
              <select
                onChange={handleCheckInfo}
                name="date"
                className="w-full cursor-pointer focus:outline-none">
                {concert.schedule.map((item: ScheduleItem) => (
                  <option key={item.concertScheduleId} value={item.date}>
                    {item.date}
                  </option>
                ))}
              </select>
            </div>
          </li>
          {/* 회차 */}
          <li className="py-2">
            <span className="text-sm text-(--muted)">회차</span>

            <div className="border border-(--border) bg-(--cream) w-full p-2.5 rounded-xl">
              <select
                onChange={handleCheckInfo}
                name="round"
                className="w-full cursor-pointer focus:outline-none">
                {targetDate?.showList.map((show) => (
                  <option key={show.showId} value={show.time}>
                    {show.time}
                  </option>
                ))}
              </select>
            </div>
          </li>

          <li className="py-2">
            <span className="text-sm text-(--muted)">잔여 좌석</span>
            <div className="border border-(--border) bg-(--cream) w-full h-10 rounded-xl" />
          </li>
        </ul>

        <div>
          <Link
            to="/checkout"
            className="border border-(--border) rounded-xl py-4 px-8 text-center font-bold bg-(--cream) text-(--ink) hover:border-(--gold) hover:bg-(--gold) hover:text-(--bg)">
            예매하기
          </Link>
        </div>
      </div>
    </section>
  );
}
