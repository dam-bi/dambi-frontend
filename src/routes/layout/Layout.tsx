import { Toaster } from "react-hot-toast";
import { Outlet, ScrollRestoration, useLocation } from "react-router";
import Header from "../../components/Header";

export default function Layout() {
  // const { pathname } = useLocation();
  return (
    <div>
      <ScrollRestoration />

      <Toaster position="top-center" reverseOrder={false} />

      <Header />

      <main>
        <Outlet />
      </main>
    </div>
  );
}
