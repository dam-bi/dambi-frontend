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
  concertScheduleId: number;
  date: string;
  showList: {
    showId: number;
    time: string;
  }[];
}
