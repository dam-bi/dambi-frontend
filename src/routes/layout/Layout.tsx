import { Toaster } from "react-hot-toast";
import { Outlet, ScrollRestoration } from "react-router";
import Header from "../../components/Header";

export default function Layout() {
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
