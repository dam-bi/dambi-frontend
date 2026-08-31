interface Concert {
  bookingCnt: number;
  concertId: number;
  concertEndDate: string;
  concertStartDate: string;
  concertTitle: string;
  imgUrl: string;
  venue: string;
}

interface ConcertDetail {
  ageRating: string;
  bookingCnt: number;
  concertDesc: string;
  concertEndDate: string;
  concertId: number;
  concertStartDate: string;
  concertTitle: string;
  createdAt: string;
  imgUrl: string;
  runningTime: number;
  schedule: ScheduleItem[];
  seatList: {
    concertPriceId: number;
    price: number;
    rating: string;
  }[];
  venue: string;
}

interface ScheduleItem {
  date: string;
  showList: {
    time: string;
  }[];
}

interface SeatList {
  id: string;
  color: string;
  seatsTitle: string;
  seatsPrice: null | number;
  seatsAmount: null | number;
  seatsStatus: "available" | "hold" | "reserved";
}

interface ConcertForm {
  bookingCnt: number;
  concertTitle: string;
  ageRating: string;
  venue: string;
  runningTime: null | number;
  concertDesc: string;
  imgUrl: string;
  seatList: SeatList[];
  schedule: { date: string; showList: { time: string }[] }[];
}

type ConcertAction =
  | {
      type: "SET_concertTitle";
      payload: string;
    }
  | {
      type: "SET_concertDesc";
      payload: string;
    }
  | {
      type: "SET_ageRating";
      payload: string;
    }
  | {
      type: "SET_venue";
      payload: string;
    }
  | {
      type: "SET_runningTime";
      payload: number;
    }
  | {
      type: "SET_seatList";
      payload: SeatList[];
    }
  | {
      type: "SET_schedule";
      payload: ScheduleItem[];
    };
