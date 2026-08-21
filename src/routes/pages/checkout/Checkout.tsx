import { useSearchParams } from "react-router";
import useQueryHook from "../../../hook/useQueryHook";
import { useEffect, useReducer, useState } from "react";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import handlecheckoutReducer from "../../../reducer/checkoutReducer";
import Button from "../../../components/Button";

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const concertId = searchParams.get("concertId");
  const [step, setStep] = useState("1");

  const { isLoading, data: concert } = useQueryHook<ConcertDetail>(
    "concerts",
    concertId!,
  );

  const initForm = {
    concertId: "",
    concertTitle: "",
    selectedDate: "",
    selectedRound: { id: "", time: "" },
    selectedSeat: [],
    name: "",
    phone: "",
  };

  const [checkoutForm, dispatch] = useReducer(handlecheckoutReducer, initForm);
  const [isAgree, setIsAgree] = useState({
    agree1: false,
    agree2: false,
    agree3: false,
    agree4: false,
  });

  useEffect(() => {
    if (concertId && concert) {
      dispatch({
        type: "SET_BASICINFO",
        payload: {
          concertId: concertId,
          concertTitle: concert.concertTitle,
        },
      });
    }
  }, [concert, concertId]);

  const toggleAgree = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgree((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };

  const toggleAllAgree = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;

    setIsAgree({
      agree1: checked,
      agree2: checked,
      agree3: checked,
      agree4: checked,
    });
  };

  // 날짜 회차 좌석 조회 로직 추후 함수명 변경
  const handleNextStep = () => {
    // 유효 좌석 여부 api 통신

    // 성공시
    setStep("2");

    if (step === "2") {
      console.log(checkoutForm);
    }
  };

  if (isLoading || !concert) return <p>로딩중...</p>;

  return (
    <section className="w-full max-w-7xl px-5 py-20 mx-auto flex flex-col md:flex-row gap-5 relative">
      {/* 좌측 이벤트 정보 */}
      <div className="flex-2 ">
        {/* 타이틀 */}
        <div>
          <h2 className="text-[28px] font-bold mb-1">결제하기</h2>
          <p className="text-sm text-(--muted) font-medium">
            예매 정보를 확인하고 결제를 진행해주세요.
          </p>
        </div>

        {/* 진행 바 */}
        <div className="flex items-start justify-between mt-10">
          {/* Step 1 */}
          <div className="flex flex-col items-center relative pt-6">
            {/* 원형 아이콘 (상단 절대 위치) */}
            <div
              className={`absolute top-0 w-5 h-5 rounded-xl border z-10 ${step === "2" ? "border-(--ok) bg-(--ok)" : " border-(--line) bg-(--bg)"}`}
            />
            <p className="text-(--muted) text-xs text-center">
              날짜 회차 좌석 선택
            </p>
          </div>

          {/* Connecting Line (원 중심 Y축에 정확히 맞춘 가로줄) */}
          <div className="flex-1 h-px bg-(--line)  translate-y-2.5" />

          {/* Step 2 */}
          <div className="flex flex-col items-center relative pt-6">
            {/* 원형 아이콘 (상단 절대 위치) */}
            <div className="absolute top-0 w-5 h-5 rounded-xl border border-(--line) bg-(--bg) z-10" />
            <p className="text-(--muted) text-xs text-center">
              개인 정보 및 약관 동의
            </p>
          </div>
        </div>

        {step === "1" ? (
          <FirstStep
            concert={concert}
            checkoutForm={checkoutForm}
            dispatch={dispatch}
          />
        ) : (
          <SecondStep
            checkoutForm={checkoutForm}
            dispatch={dispatch}
            toggleAgree={toggleAgree}
            toggleAllAgree={toggleAllAgree}
            isAgree={isAgree}
          />
        )}
      </div>

      {/* 우측 참여 버튼 */}
      <div className="flex-1 static mt-5 md:mt-0 md:sticky md:right-0 top-5 md:h-fit border border-(--line) rounded-xl p-5">
        <h3 className="text-xl font-bold pb-1">티켓팅 요약</h3>

        {/* 콘서트 정보 */}
        <div className="my-10 flex gap-2.5">
          <img
            src={concert.imgUrl}
            alt={concert.concertTitle}
            className="w-30 rounded-xl"
            loading="lazy"
          />
          <div className="flex-1 flex flex-col gap-5 justify-center">
            <h2 className="text-sm font-semibold break-keep">
              {concert.concertTitle}
            </h2>
            <ul className="flex flex-col gap-1">
              <li className="flex justify-between gap-5">
                <p className="text-xs text-(--muted)">
                  {checkoutForm.selectedDate
                    ? `${checkoutForm.selectedDate}`
                    : "날짜를 선택해주세요"}
                </p>
              </li>
              <li className="flex justify-between gap-5">
                <p className="text-xs text-(--muted)">
                  {checkoutForm.selectedRound
                    ? `${checkoutForm.selectedRound.id}회차 / ${checkoutForm.selectedRound.time}}`
                    : "회차를 선택해주세요"}
                </p>
              </li>
              <li>
                <p className="text-xs text-(--muted)">{concert.venue}</p>
              </li>
            </ul>
          </div>
        </div>

        {/* 좌석 및 결제 금액 */}
        <ul className="mb-5">
          <li className="py-2.5 flex justify-between border-b border-(--line) border-dashed">
            <span className="text-sm font-medium text-(--muted)">
              선택 좌석
            </span>
            <p className="text-sm font-medium text-(--muted)">A5, A6</p>
          </li>
          <li className="py-2.5 flex justify-between border-b border-(--line) border-dashed">
            <span className="text-sm font-medium text-(--muted)">
              티켓 금액
            </span>
            <p className="text-sm font-medium text-(--muted)">200,000</p>
          </li>
          <li className="py-2.5 flex justify-between border-b border-(--line) border-dashed">
            <span className="text-sm font-medium text-(--muted)">수수료</span>
            <p className="text-sm font-medium text-(--muted)">2,000원</p>
          </li>
          <li className="py-2.5 flex justify-between border-b border-(--line) border-dashed">
            <span className="text-sm font-bold">총 결제 금액</span>
            <strong className="text-sm font-bold">220,000원</strong>
          </li>
        </ul>

        {/* 다음 버튼 */}
        <Button
          onClick={handleNextStep}
          type="submit"
          className="bg-(--signal) text-base font-semibold text-(--bg) mt-5 flex justify-center items-center w-full">
          {step === "1" ? "다음" : "220,000원 결제하기"}
        </Button>
      </div>
    </section>
  );
}
