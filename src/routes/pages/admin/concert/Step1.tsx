import type { ActionDispatch } from "react";
import Input from "../../../../components/Input";

export default function Step1({
  concertForm,
  dispatch,
}: {
  concertForm: ConcertForm;
  dispatch: ActionDispatch<[action: ConcertAction]>;
}) {
  return (
    <>
      <div className="flex gap-2.5">
        <span className="border border-(--line) rounded-xl w-6 h-6 flex justify-center items-center">
          1
        </span>
        <h3 className="text-base font-medium">기본 정보 작성</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="concertTitle" className="text-sm">
            제목
          </label>
          <Input error={false}>
            <input
              type="text"
              name="concertTitle"
              placeholder="콘서트 제목"
              id="concertTitle"
              value={concertForm.concertTitle}
              onChange={(e) =>
                dispatch({ type: "SET_concertTitle", payload: e.target.value })
              }
            />
          </Input>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="ageRating" className="text-sm">
            관람 등급
          </label>
          <Input error={false}>
            <input
              type="text"
              name="ageRating"
              id="ageRating"
              autoComplete="off"
              placeholder="전체관람가"
              value={concertForm.ageRating}
              onChange={(e) =>
                dispatch({ type: "SET_ageRating", payload: e.target.value })
              }
            />
          </Input>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="venue" className="text-sm">
            장소
          </label>
          <Input error={false}>
            <input
              type="text"
              name="venue"
              placeholder="콘서트 장소"
              id="venue"
              value={concertForm.venue}
              onChange={(e) =>
                dispatch({ type: "SET_venue", payload: e.target.value })
              }
            />
          </Input>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="runningTime" className="text-sm">
            관람 시간(분)
          </label>
          <Input error={false}>
            <input
              type="number"
              name="runningTime"
              id="runningTime"
              autoComplete="off"
              placeholder="100분"
              value={concertForm.runningTime ?? ""}
              onChange={(e) =>
                dispatch({
                  type: "SET_runningTime",
                  payload: Number(e.target.value),
                })
              }
            />
          </Input>
        </div>
        <div className="flex flex-col gap-1 w-full md:col-span-full">
          <label htmlFor="concertDesc" className="text-sm">
            콘서트 설명
          </label>
          <Input error={false}>
            <textarea
              name="concertDesc"
              id="concertDesc"
              autoComplete="off"
              placeholder="콘서트 설명"
              className="resize-none w-full h-50 overflow-y-auto focus:outline-none"
              value={concertForm.concertDesc}
              onChange={(e) =>
                dispatch({ type: "SET_concertDesc", payload: e.target.value })
              }
            />
          </Input>
        </div>
        <div className="flex flex-col gap-1 w-full md:col-span-full">
          <label htmlFor="runningTime" className="text-sm">
            콘서트 이미지
          </label>
          <Input error={false}>
            <input
              type="file"
              name="runningTime"
              id="runningTime"
              autoComplete="off"
              placeholder="100분"
            />
          </Input>
        </div>
      </div>
    </>
  );
}
