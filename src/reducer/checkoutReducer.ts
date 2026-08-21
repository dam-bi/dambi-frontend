export default function handlecheckoutReducer(
  state: CheckoutForm,
  action: CheckoutAction,
): CheckoutForm {
  switch (action.type) {
    case "SET_BASICINFO":
      return {
        ...state,
        concertId: action.payload.concertId,
        concertTitle: action.payload.concertTitle,
      };
    case "SET_DATE":
      return {
        ...state,
        selectedDate: action.payload,
        selectedRound: { id: "", time: "" },
        selectedSeat: [],
      };
    case "SET_ROUND":
      return {
        ...state,
        selectedRound: { id: action.payload.id, time: action.payload.time },
        selectedSeat: [],
      };
    case "SET_SEAT":
      return {
        ...state,
        selectedSeat: action.payload,
      };
    case "SET_NAME":
      return {
        ...state,
        name: action.payload,
      };
    case "SET_PHONE":
      return {
        ...state,
        phone: action.payload,
      };
    case "SET_USER":
      return {
        ...state,
        name: action.payload.name,
        phone: action.payload.phone,
      };
    default:
      return state;
  }
}
