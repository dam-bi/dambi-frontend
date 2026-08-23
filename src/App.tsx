import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./routes/layout/Layout";
import Home from "./routes/pages/home/Home";
import Concert from "./routes/pages/concert/Concert";
import ConcertDetail from "./routes/pages/concert/ConcertDetail";
import Event from "./routes/pages/event/Event";
import EventDetail from "./routes/pages/event/EventDetail";
import WishList from "./routes/pages/wishList/WishList";
import Checkout from "./routes/pages/checkout/Checkout";
import Login from "./routes/pages/auth/Login";
import Signup from "./routes/pages/auth/Signup";
import Success from "./routes/pages/payment/Success";
import Failed from "./routes/pages/payment/Failed";
import Guest from "./routes/pages/guest/Guest";
import Reserve from "./routes/pages/checkout/Reserve";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { path: "/", Component: Home },
      { path: "/concert", Component: Concert },
      { path: "/concert/:id", Component: ConcertDetail },
      { path: "/event", Component: Event },
      { path: "/event/:id", Component: EventDetail },
      { path: "/wishList", Component: WishList },
      { path: "/checkout", Component: Checkout },
      { path: "/checkout/success", Component: Success },
      { path: "/checkout/failed", Component: Failed },
      { path: "/auth/login", Component: Login },
      { path: "/auth/signup", Component: Signup },
      { path: "/reserve", Component: Reserve },
      { path: "/guest", Component: Guest },
      { path: "/guest/reserve", Component: Reserve },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
