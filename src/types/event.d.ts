interface Event {
  eventId: number;
  eventTitle: string;
  concertImg: string;
  status: string;
  eventStartDate: string;
  eventEndDate: string;
}

interface EventDetail {
  eventId: number;
  eventTitle: string;
  eventDesc: string;
  status: string;
  eventStartDate: string;
  eventEndDate: string;
  concert: {
    concertId: number;
    concertTitle: string;
    imgUrl: string;
    concertDesc: string;
    venue: string;
    runningTime: number;
    concertStartDate: string;
    concertEndDate: string;
    ageRating: string;
  };
}
