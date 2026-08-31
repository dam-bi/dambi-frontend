export default function handleConcertReducer(
  state: ConcertForm,
  action: ConcertAction,
): ConcertForm {
  switch (action.type) {
    case "SET_concertTitle":
      return {
        ...state,
        concertTitle: action.payload,
      };
    case "SET_concertDesc":
      return {
        ...state,
        concertDesc: action.payload,
      };
    case "SET_venue":
      return {
        ...state,
        venue: action.payload,
      };
    case "SET_runningTime":
      return {
        ...state,
        runningTime: action.payload,
      };
    case "SET_ageRating":
      return {
        ...state,
        ageRating: action.payload,
      };
    case "SET_seatList":
      return {
        ...state,
        seatList: action.payload,
      };
    case "SET_schedule":
      return {
        ...state,
        schedule: action.payload,
      };
  }
}
