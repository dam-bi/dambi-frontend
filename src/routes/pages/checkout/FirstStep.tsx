import type { ActionDispatch } from "react";

export default function FirstStep({
  concert,
  checkoutForm,
  dispatch,
}: {
  concert: ConcertDetail;
  checkoutForm: CheckoutForm;
  dispatch: ActionDispatch<[action: CheckoutAction]>;
}) {
  const targetDate = concert.schedule.find(
    (item) => item.date === checkoutForm.selectedDate,
  );

  return (
    <div className="mt-10 flex flex-col gap-10">
      {/* 1. 날짜 선택 */}
      <div>
        <div className="flex gap-2.5">
          <span className="border border-(--line) rounded-xl w-6 h-6 flex justify-center items-center">
            1
          </span>
          <h3 className="text-base font-medium">날짜 선택</h3>
        </div>
        <ol className="flex gap-2.5 mt-5 overflow-x-auto">
          {concert.schedule.map((item: ScheduleItem) => {
            const isSelected = checkoutForm.selectedDate === item.date;

            return (
              <li key={item.concertScheduleId}>
                <label
                  className={`py-2.5 aspect-square border rounded-xl flex flex-col justify-center items-center text-sm font-medium w-15 cursor-pointer ${isSelected ? "border-(--signal) bg-(--signal) text-(--bg)" : "border-(--line) bg-(--bg) text-(--ink)"}`}>
                  {item.date.split("-")[2]} <br />
                  <input
                    type="radio"
                    className="hidden"
                    checked={checkoutForm.selectedDate === item.date}
                    onChange={() =>
                      dispatch({ type: "SET_DATE", payload: item.date })
                    }
                  />
                </label>
              </li>
            );
          })}
        </ol>
      </div>

      {/* 2. 회차 선택 */}
      <div>
        <div className="flex gap-2.5">
          <span className="border border-(--line) rounded-xl w-6 h-6 flex justify-center items-center">
            2
          </span>
          <h3 className="text-base font-medium">회차 선택</h3>
        </div>
        {targetDate ? (
          <ol className="flex gap-2.5 mt-5 overflow-x-auto">
            {targetDate?.showList.map((show) => {
              const isSelected =
                checkoutForm.selectedRound.id === String(show.showId);
              return (
                <li key={show.showId}>
                  <label
                    className={`py-2.5 px-5 border rounded-xl flex flex-col justify-center items-center cursor-pointer ${isSelected ? "border-(--signal) bg-(--signal) text-(--bg)" : "border-(--line) bg-(--bg) text-(--ink)"}`}>
                    <div>
                      <p className="text-sm font-medium text-center">
                        {show.showId}회차
                      </p>
                      <p
                        className={`text-xs ${isSelected ? "text-(--bg)" : "text-(--muted)"}`}>
                        {show.time}
                      </p>
                    </div>
                    <input
                      type="radio"
                      className="hidden"
                      checked={
                        checkoutForm.selectedRound.id === String(show.showId)
                      }
                      onChange={() =>
                        dispatch({
                          type: "SET_ROUND",
                          payload: { id: String(show.showId), time: show.time },
                        })
                      }
                    />
                  </label>
                </li>
              );
            })}
          </ol>
        ) : (
          <div className="mt-5">
            <strong className="font-normal text-sm ">
              날짜를 선택해주세요.
            </strong>
          </div>
        )}
      </div>

      {/* 3. 좌석 선택 */}
      <div>
        <div className="flex gap-2.5">
          <span className="border border-(--line) rounded-xl w-6 h-6 flex justify-center items-center">
            3
          </span>
          <h3 className="text-base font-medium">좌석 선택</h3>
        </div>
        <div className="mt-5 border border-(--line) aspect-square rounded-xl"></div>
      </div>
    </div>
  );
}
