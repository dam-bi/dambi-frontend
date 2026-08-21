import { Smartphone, User } from "lucide-react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { useAuthStore } from "../../../store/authStore";
import { type ActionDispatch } from "react";
import toast from "react-hot-toast";

export default function SecondStep({
  checkoutForm,
  dispatch,
  toggleAgree,
  toggleAllAgree,
  isAgree,
}: {
  checkoutForm: CheckoutForm;
  dispatch: ActionDispatch<[action: CheckoutAction]>;
  toggleAgree: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleAllAgree: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isAgree: {
    agree1: boolean;
    agree2: boolean;
    agree3: boolean;
    agree4: boolean;
  };
}) {
  const { user } = useAuthStore();

  const handleUserInfo = () => {
    if (user) {
      dispatch({
        type: "SET_USER",
        payload: { name: user?.userInfo.name, phone: user?.userInfo.phone },
      });
    } else {
      toast.error("로그인이 필요합니다.");
    }
  };

  const isAllAgree =
    isAgree.agree1 && isAgree.agree2 && isAgree.agree3 && isAgree.agree4;

  return (
    <div className="mt-10 flex flex-col gap-10">
      {/* 1. 개인정보 작성 */}
      <div>
        <div className="flex justify-between">
          <div className="flex gap-2.5">
            <span className="border border-(--line) rounded-xl w-6 h-6 flex justify-center items-center">
              1
            </span>
            <h3 className="text-base font-medium">개인정보 작성</h3>
          </div>
          <Button
            type="button"
            className="border border-(--line) rounded-xl text-xs font-normal text-(--muted)"
            onClick={handleUserInfo}>
            회원 정보 가져오기
          </Button>
        </div>

        <div className="flex gap-5 mt-5">
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="name" className="text-sm">
              이름
            </label>
            <Input error={false}>
              <User />
              <input
                type="text"
                name="name"
                id="name"
                placeholder="이름"
                value={checkoutForm.name}
                onChange={(e) =>
                  dispatch({ type: "SET_NAME", payload: e.target.value })
                }
              />
            </Input>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="phone" className="text-sm">
              연락처
            </label>
            <Input error={false}>
              <Smartphone />
              <input
                type="text"
                name="phone"
                id="phone"
                autoComplete="off"
                placeholder="010xxxxxxxx"
                maxLength={11}
                value={checkoutForm.phone}
                onChange={(e) =>
                  dispatch({ type: "SET_PHONE", payload: e.target.value })
                }
              />
            </Input>
          </div>
        </div>
      </div>

      {/* 2. 약관 동의 */}
      <div>
        <div className="flex gap-2.5">
          <span className="border border-(--line) rounded-xl w-6 h-6 flex justify-center items-center">
            2
          </span>
          <h3 className="text-base font-medium">약관 동의</h3>
        </div>

        <div className="my-5 bg-(--mist) border border-(--line) border-dashed p-2.5">
          <p className="break-keep text-sm">
            본인은 만 14세 이상이며, [서비스명]의 티켓 예매를 위한 개인정보
            수집·이용 및 제3자 제공, 취소·환불 규정, 불법 거래(암표) 금지 및
            현장 입장 안내 사항을 모두 확인하였으며 이에 동의합니다.
          </p>
        </div>

        <ul className="flex flex-col gap-2.5">
          <li className="flex gap-2.5 items-center">
            <input
              type="checkbox"
              id="all"
              checked={isAllAgree}
              onChange={toggleAllAgree}
              className="w-5 aspect-square rounded-1 border-(--line) accent-(--signal)"
            />
            <label htmlFor="all" className="text-sm">
              전체 약관 동의
            </label>
          </li>
          <li className="flex gap-2.5 items-center">
            <input
              type="checkbox"
              id="agree1"
              name="agree1"
              checked={isAgree.agree1}
              onChange={toggleAgree}
              className="w-5 aspect-square rounded-1 border-(--line) accent-(--signal)"
            />
            <label htmlFor="agree1" className="text-sm">
              [필수] 개인 정보 수집 및 이용 동의
            </label>
          </li>
          <li className="flex gap-2.5 items-center">
            <input
              type="checkbox"
              id="agree2"
              name="agree2"
              checked={isAgree.agree2}
              onChange={toggleAgree}
              className="w-5 aspect-square rounded-1 border-(--line) accent-(--signal)"
            />
            <label htmlFor="agree2" className="text-sm">
              [필수] 개인정보 제3자 제공 동의
            </label>
          </li>
          <li className="flex gap-2.5 items-center">
            <input
              type="checkbox"
              id="agree3"
              name="agree3"
              checked={isAgree.agree3}
              onChange={toggleAgree}
              className="w-5 aspect-square rounded-1 border-(--line) accent-(--signal)"
            />
            <label htmlFor="agree3" className="text-sm">
              [필수] 티켓 불법 거래(암표) 금지 및 입장 규정 동의
            </label>
          </li>
          <li className="flex gap-2.5 items-center">
            <input
              type="checkbox"
              id="agree4"
              name="agree4"
              checked={isAgree.agree4}
              onChange={toggleAgree}
              className="w-5 aspect-square rounded-1 border-(--line) accent-(--signal)"
            />
            <label htmlFor="agree4" className="text-sm">
              [선택] 마케팅 정보 수신 및 활용 동의
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
}
