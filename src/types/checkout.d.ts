interface CheckoutForm {
  concertId: string;
  concertTitle: string;
  selectedDate: string;
  selectedRound: {id: string, time: string};
  selectedSeat: string[];
  name: string;
  phone: string;
}

type CheckoutAction =
  | {
      type: "SET_BASICINFO";
      payload: { concertId: string; concertTitle: string };
    }
  | { type: "SET_DATE"; payload: string }
  | { type: "SET_ROUND"; payload: { id: string; time: string } }
  | { type: "SET_SEAT"; payload: string[] }
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_PHONE"; payload: string }
  | { type: "SET_USER"; payload: { name: string; phone: string } };
