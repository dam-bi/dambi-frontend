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
      { path: "/auth/login", Component: Login },
      { path: "/auth/signup", Component: Signup },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
