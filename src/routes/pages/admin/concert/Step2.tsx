import { Plus, X } from "lucide-react";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import {
  useEffect,
  useState,
  type ActionDispatch,
  type ChangeEvent,
} from "react";

export default function Step2({
  dispatch,
}: {
  dispatch: ActionDispatch<[action: ConcertAction]>;
}) {
  const initForm = (): SeatList => ({
    id: "",
    color: "#000000",
    seatsTitle: "",
    seatsPrice: null,
    seatsAmount: null,
    seatsStatus: "available",
  });
  const [seatList, setSeatList] = useState<SeatList[]>([
    initForm(),
    initForm(),
  ]);

  const addSeatsGroup = () => {
    if (seatList.length < 4) {
      setSeatList((prev) => [...prev, initForm()]);
    }
  };

  const removeSeatsGroup = (index: number) => {
    if (seatList.length > 2) {
      setSeatList((prev) => prev.filter((_, i) => index !== i));
    }
  };

  const handleInput = (
    index: number,
    field: keyof SeatList,
    value: string | number | null,
  ) => {
    setSeatList((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  useEffect(() => {
    const updateList = seatList.map((item, index) => ({
      ...item,
      id: String.fromCharCode(65 + index),
    }));

    dispatch({
      type: "SET_seatList",
      payload: updateList,
    });
  }, [seatList, dispatch]);

  const seatsAddComponent = (index: number) => {
    const item = seatList[index];
    return (
      <div key={index} className="flex items-center gap-5">
        <div className="flex flex-col gap-1 items-center">
          <span className="text-sm text-nowrap">우선순위</span>
          <div className="w-10.5 aspect-square border border-(--ink) rounded-xl flex items-center justify-center">
            <p className="text-lg font-bold text-(--signal)">{index + 1}</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <label htmlFor={`color-${index}`} className="text-sm">
            색상
          </label>
          <input
            type="color"
            name={`color-${index}`}
            id={`color-${index}`}
            className="w-10.5 h-10.5"
            value={item.color}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInput(index, "color", e.target.value)
            }
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor={`seatRank-${index}`} className="text-sm">
            좌석 등급
          </label>
          <Input error={false}>
            <input
              type="text"
              name={`seatRank-${index}`}
              placeholder="좌석 등급"
              id={`seatRank-${index}`}
              value={item.seatsTitle}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInput(index, "seatsTitle", e.target.value)
              }
            />
          </Input>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor={`seatPrice-${index}`} className="text-sm">
            가격(원)
          </label>
          <Input error={false}>
            <input
              type="number"
              name={`seatPrice-${index}`}
              placeholder="좌석 가격"
              id={`seatPrice-${index}`}
              value={item.seatsPrice ?? ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInput(
                  index,
                  "seatsPrice",
                  e.target.value ? Number(e.target.value) : null,
                )
              }
            />
          </Input>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor={`seatAmount-${index}`} className="text-sm">
            총 좌석 수
          </label>
          <Input error={false}>
            <input
              type="number"
              name={`seatAmount-${index}`}
              placeholder="총 좌석 수"
              id={`seatAmount-${index}`}
              value={item.seatsAmount ?? ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInput(
                  index,
                  "seatsAmount",
                  e.target.value ? Number(e.target.value) : null,
                )
              }
            />
          </Input>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span
            className={`text-sm ${seatList.length <= 2 ? "text-(--muted)" : "text-(--danger)"} `}>
            제거
          </span>
          <Button
            type="button"
            disabled={seatList.length <= 2}
            className={`border w-fit disabled:cursor-not-allowed ${seatList.length <= 2 ? "border-(--muted)" : "border-(--danger)"}`}
            onClick={() => removeSeatsGroup(index)}>
            <X
              stroke={seatList.length <= 2 ? "var(--muted)" : "var(--danger)"}
              strokeWidth={2}
            />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex gap-2.5">
        <span className="border border-(--line) rounded-xl w-6 h-6 flex justify-center items-center">
          2
        </span>
        <h3 className="text-base font-medium">
          좌석 정보 작성{" "}
          <span className="text-xs text-(--signal)">
            최소 80석~ 최대 120석까지 가능합니다.
          </span>
        </h3>
      </div>

      {/* 좌석 정보 입력란 */}
      <div className="mt-5 flex flex-col items-center gap-5">
        {seatList.map((_, index) => seatsAddComponent(index))}

        {seatList.length < 4 && (
          <Button
            type="button"
            onClick={addSeatsGroup}
            className="border border-(--line) rounded-xl flex items-center w-fit">
            <Plus />
            <span>좌석 등급 추가하기</span>
          </Button>
        )}
      </div>

      {/* 좌석 배치도 */}
      <div className="mt-5 flex flex-col gap-3">
        <p className="text-sm">
          좌석 배치도
          <span className="text-xs text-(--signal-dark)">
            우선 순위가 높을 수록 무대와 가깝습니다.
          </span>
        </p>

        <div className="border border-(--ink) p-5 rounded-xl flex flex-col gap-6">
          {/* 무대 영역 */}
          <div className="w-full h-10 bg-(--signal) flex justify-center items-center rounded-xl">
            <p className="text-(--bg) font-bold">STAGE</p>
          </div>

          {/* 좌석 구역 배치 영역 */}
          <div className="flex flex-col gap-5">
            {seatList.map((item, index) => {
              const amount = Number(item.seatsAmount) || 0;
              const sectionLetter = String.fromCharCode(65 + index);

              return (
                <div key={`section-${index}`} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full border border-(--line)"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs font-semibold">
                      {sectionLetter}구역 ({item.seatsTitle || "등급 미지정"} -{" "}
                      {amount}석)
                    </span>
                  </div>

                  {/* 좌석 그리드 렌더링 */}
                  {amount > 0 ? (
                    <ul className="grid grid-cols-10 gap-1.5 p-3 border border-(--line) rounded-xl">
                      {Array.from({ length: amount }).map((_, seatIdx) => (
                        <li
                          key={`${sectionLetter}-${seatIdx}`}
                          className="aspect-square rounded flex items-center justify-center text-xl text-(--bg) transition-transform hover:scale-105 cursor-pointer shadow-xs"
                          style={{ backgroundColor: item.color }}
                          title={`${sectionLetter}${seatIdx + 1}`}>
                          {sectionLetter}
                          {seatIdx + 1}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-xs text-(--muted) p-2 border border-dashed rounded-xl text-center">
                      좌석 수를 입력하면 배치도가 생성됩니다.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
