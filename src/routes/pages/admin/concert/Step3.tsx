import { Plus, X } from "lucide-react";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import { useEffect, useState, type ActionDispatch } from "react";

export default function Step3({
  dispatch,
}: {
  dispatch: ActionDispatch<[action: ConcertAction]>;
}) {
  const showListInitForm = () => ({
    time: "",
  });

  const scheduleInitForm = () => ({
    date: "",
    showList: [showListInitForm()],
  });

  const [schedule, setSchedule] = useState([scheduleInitForm()]);

  const addDate = () => {
    setSchedule((prev) => [...prev, scheduleInitForm()]);
  };

  const removeDate = (sIndex: number) => {
    if (schedule.length > 1) {
      setSchedule((prev) => prev.filter((_, i) => i !== sIndex));
    }
  };

  const handleDateChange = (sIndex: number, value: string) => {
    setSchedule((prev) => {
      const updated = [...prev];
      updated[sIndex] = { ...updated[sIndex], date: value };
      return updated;
    });
  };

  const addRound = (sIndex: number) => {
    setSchedule((prev) => {
      const updated = [...prev];
      updated[sIndex] = {
        ...updated[sIndex],
        showList: [...updated[sIndex].showList, showListInitForm()],
      };
      return updated;
    });
  };

  const removeRound = (sIndex: number, rIndex: number) => {
    setSchedule((prev) => {
      if (prev[sIndex].showList.length <= 1) return prev;

      const updated = [...prev];
      updated[sIndex] = {
        ...updated[sIndex],
        showList: updated[sIndex].showList.filter((_, i) => i !== rIndex),
      };

      return updated;
    });
  };

  const handleTimeChange = (sIndex: number, rIndex: number, value: string) => {
    setSchedule((prev) => {
      const updated = [...prev];
      const updatedShowList = [...updated[sIndex].showList];
      updatedShowList[rIndex] = { ...updatedShowList[rIndex], time: value };
      updated[sIndex] = {
        ...updated[sIndex],
        showList: updatedShowList,
      };
      return updated;
    });
  };

  useEffect(() => {
    dispatch({
      type: "SET_schedule",
      payload: schedule,
    });
  }, [schedule, dispatch]);

  return (
    <>
      <div className="flex gap-2.5">
        <span className="border border-(--line) rounded-xl w-6 h-6 flex justify-center items-center">
          3
        </span>
        <h3 className="text-base font-medium">콘서트 일정 정보 작성</h3>
      </div>

      {/* 일정 등록 */}
      {/* <>{addDateComponent()}</> */}
      <div className="mt-5 flex flex-col gap-8">
        {schedule.map((scheduleItem, sIndex) => (
          <div
            key={`schedule-${sIndex}`}
            className="border-b border-dashed border-(--line) pb-5">
            {/* 날짜 선택 헤더 */}
            <div className="flex gap-5 items-center pb-5">
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor={`date-${sIndex}`} className="text-sm">
                  날짜 선택
                </label>
                <Input error={false}>
                  <input
                    type="date"
                    name={`date-${sIndex}`}
                    id={`date-${sIndex}`}
                    value={scheduleItem.date}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleDateChange(sIndex, e.target.value)
                    }
                  />
                </Input>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span
                  className={`text-sm ${
                    schedule.length <= 1 ? "text-(--muted)" : "text-(--danger)"
                  }`}>
                  제거
                </span>
                <Button
                  type="button"
                  disabled={schedule.length <= 1}
                  onClick={() => removeDate(sIndex)}
                  className={`border w-fit disabled:cursor-not-allowed ${
                    schedule.length <= 1
                      ? "border-(--muted)"
                      : "border-(--danger)"
                  }`}>
                  <X
                    stroke={
                      schedule.length <= 1 ? "var(--muted)" : "var(--danger)"
                    }
                    strokeWidth={2}
                  />
                </Button>
              </div>
            </div>

            {/* 회차 목록 (회차 반복) */}
            <div className="flex flex-col gap-3 pl-4 border-l-2 border-(--line)">
              {scheduleItem.showList.map((showItem, rIndex) => (
                <div
                  key={`round-${sIndex}-${rIndex}`}
                  className="flex gap-5 items-center p-3 border border-(--line) rounded-xl">
                  <div className="flex flex-col gap-1 items-center">
                    <span className="text-xs">회차</span>
                    <div className="w-8 aspect-square border border-(--ink) flex justify-center items-center rounded-lg text-sm font-bold">
                      {rIndex + 1}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <label
                      htmlFor={`startTime-${sIndex}-${rIndex}`}
                      className="text-sm">
                      시작시간
                    </label>
                    <Input error={false}>
                      <input
                        type="time"
                        name={`startTime-${sIndex}-${rIndex}`}
                        id={`startTime-${sIndex}-${rIndex}`}
                        value={showItem.time}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleTimeChange(sIndex, rIndex, e.target.value)
                        }
                      />
                    </Input>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span
                      className={`text-xs ${
                        scheduleItem.showList.length <= 1
                          ? "text-(--muted)"
                          : "text-(--danger)"
                      }`}>
                      제거
                    </span>
                    <Button
                      type="button"
                      disabled={scheduleItem.showList.length <= 1}
                      onClick={() => removeRound(sIndex, rIndex)}
                      className={`border w-fit disabled:cursor-not-allowed ${
                        scheduleItem.showList.length <= 1
                          ? "border-(--muted)"
                          : "border-(--danger)"
                      }`}>
                      <X
                        stroke={
                          scheduleItem.showList.length <= 1
                            ? "var(--muted)"
                            : "var(--danger)"
                        }
                        strokeWidth={2}
                      />
                    </Button>
                  </div>
                </div>
              ))}

              {/* 회차 추가 버튼 */}
              <Button
                type="button"
                onClick={() => addRound(sIndex)}
                className="border border-(--line) rounded-xl flex justify-center items-center gap-2.5 my-2 mx-auto">
                <Plus size={16} />
                <span className="text-sm">회차 추가</span>
              </Button>
            </div>
          </div>
        ))}

        {/* 날짜 추가 버튼 */}
        <Button
          type="button"
          onClick={addDate}
          className="border border-(--line) rounded-xl flex justify-center items-center gap-2.5 my-2 mx-auto">
          <Plus />
          <span>날짜 추가</span>
        </Button>
      </div>
    </>
  );
}
