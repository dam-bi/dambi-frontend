import { useReducer, useState } from "react";
import Button from "../../../../components/Button";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import handleConcertReducer from "../../../../reducer/concertReducer";
import { ChevronDown, ChevronUp } from "lucide-react";

type StepKeys = "step1" | "step2" | "step3";

export default function RegisterConcert() {
  const initForm = {
    bookingCnt: 0,
    concertTitle: "",
    ageRating: "",
    venue: "",
    runningTime: null,
    concertDesc: "",
    imgUrl: "",
    seatList: [],
    schedule: [],
  };
  const [step, setStep] = useState(1);
  const [statusStep, setStatusStep] = useState<Record<StepKeys, boolean>>({
    step1: true,
    step2: false,
    step3: false,
  });
  const [concertForm, dispatch] = useReducer(handleConcertReducer, initForm);

  const toggleStatusStep = (id: StepKeys) => {
    setStatusStep((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleStep = () => {
    if (step >= 3) return;
    setStep((prev) => prev + 1);
  };

  return (
    <section className="w-full max-w-7xl px-5 py-20 flex flex-col md:flex-row gap-5 relative">
      {/* 왼쪽 정보 입력란 */}
      <div className="flex-2">
        <div>
          <h2 className="text-[28px] font-bold mb-1">등록하기</h2>
          <p className="text-sm text-(--muted) font-medium">
            예매 정보를 확인하고 결제를 진행해주세요.
          </p>
        </div>

        <div className="mt-10">
          {step === 1 && (
            <Step1 concertForm={concertForm} dispatch={dispatch} />
          )}
          {step === 2 && <Step2 dispatch={dispatch} />}
          {step === 3 && <Step3 dispatch={dispatch} />}
        </div>
      </div>

      {/* 오른쪽 패널 */}
      <div className="flex-1 static mt-5 md:mt-0 md:sticky md:right-0 md:top-5 md:h-fit border border-(--line) rounded-xl p-5">
        <h3 className="text-xl font-bold pb-1">콘서트 등록</h3>

        <div className="my-10">
          {/* step1 */}
          <div>
            {/* 타이틀 */}
            <div className="flex items-center py-2.5 border-b border-(--line)">
              <span />
              <h4 className="flex-1">콘서트 기본 등록</h4>
              <Button
                onClick={() => toggleStatusStep("step1")}
                disabled={step === 1}>
                {step === 1 || statusStep.step1 ? (
                  <ChevronUp />
                ) : (
                  <ChevronDown />
                )}
              </Button>
            </div>
            {/* 작성한 정보 */}
            {(step === 1 || statusStep.step1) && (
              <ul>
                <li className="py-2.5 flex justify-between border-b border-(--line) border-dashed">
                  <span className="text-sm font-medium text-(--muted)">
                    콘서트 제목
                  </span>
                  <p className="text-sm font-medium text-(--muted)">
                    {concertForm.concertTitle !== ""
                      ? `${concertForm.concertTitle}`
                      : "콘서트 제목"}
                  </p>
                </li>
                <li className="py-2.5 flex justify-between border-b border-(--line) border-dashed">
                  <span className="text-sm font-medium text-(--muted)">
                    관람 등급
                  </span>
                  <p className="text-sm font-medium text-(--muted)">
                    {concertForm.ageRating !== ""
                      ? `${concertForm.ageRating}`
                      : "관람 등급"}
                  </p>
                </li>
                <li className="py-2.5 flex justify-between border-b border-(--line) border-dashed">
                  <span className="text-sm font-medium text-(--muted)">
                    장소
                  </span>
                  <p className="text-sm font-medium text-(--muted)">
                    {concertForm.venue !== "" ? `${concertForm.venue}` : "장소"}
                  </p>
                </li>
                <li className="py-2.5 flex justify-between border-b border-(--line) border-dashed">
                  <span className="text-sm font-medium text-(--muted)">
                    관람 시간
                  </span>
                  <p className="text-sm font-medium text-(--muted)">
                    {concertForm.runningTime !== null
                      ? `${concertForm.runningTime}분`
                      : "0분"}
                  </p>
                </li>
              </ul>
            )}
          </div>
          {/* step2 */}
          <div>
            {/* 타이틀 */}
            <div className="flex items-center py-2.5 border-b border-(--line)">
              <span />
              <h4 className="flex-1">콘서트 좌석 등록</h4>
              <Button
                onClick={() => toggleStatusStep("step2")}
                disabled={step === 2}>
                {step === 2 || statusStep.step2 ? (
                  <ChevronUp />
                ) : (
                  <ChevronDown />
                )}
              </Button>
            </div>
            {/* 작성한 정보 */}
            {(step === 2 || statusStep.step2) && (
              <>
                {concertForm.seatList.length > 1 ? (
                  <ul>
                    {concertForm.seatList.map((seat) => (
                      <li
                        key={seat.id}
                        className="py-2.5 flex justify-between border-b border-(--line) border-dashed">
                        <span className="text-sm font-medium text-(--muted)">
                          {seat.seatsTitle !== ""
                            ? `${seat.seatsTitle}`
                            : "좌석 등급"}
                        </span>
                        <p className="text-sm font-medium text-(--muted)">
                          {seat.seatsAmount !== null
                            ? `${seat.seatsAmount}석`
                            : "좌석 수를 입력해주세요"}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div>
                    <p className="text-sm font-medium text-(--muted) text-center py-2.5">
                      좌석 정보를 입력해주세요
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
          {/* step3 */}
          <div>
            {/* 타이틀 */}
            <div className="flex items-center py-2.5 border-b border-(--line)">
              <span />
              <h4 className="flex-1">콘서트 일정 등록</h4>
              <Button
                onClick={() => toggleStatusStep("step3")}
                disabled={step === 3}>
                {step === 3 || statusStep.step3 ? (
                  <ChevronUp />
                ) : (
                  <ChevronDown />
                )}
              </Button>
            </div>
            {/* 작성한 정보 */}
            {(step === 3 || statusStep.step3) && (
              <>
                {concertForm.schedule.length > 0 ? (
                  <ul>
                    {concertForm.schedule.map((item) => (
                      <li
                        key={item.date}
                        className="py-2.5 flex justify-between border-b border-(--line) border-dashed">
                        <span className="text-sm font-medium text-(--muted)">
                          {item.date !== ""
                            ? `${item.date}`
                            : "날짜를 선택해주세요."}
                        </span>
                        <p className="text-sm font-medium text-(--muted)">
                          {item.showList[0].time !== ""
                            ? `${item.showList.length}회`
                            : "0회"}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div>
                    <p className="text-sm font-medium text-(--muted) text-center py-2.5">
                      일정 정보를 입력해주세요
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* 다음 버튼 */}
        <Button
          type={step === 3 ? "submit" : "button"}
          onClick={handleStep}
          className="bg-(--signal) text-base font-semibold text-(--bg) mt-5 flex justify-center items-center w-full">
          {step} / 3 {step !== 3 ? "다음" : "등록하기"}
        </Button>
      </div>
    </section>
  );
}
