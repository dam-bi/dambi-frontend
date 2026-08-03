import { Toaster } from "react-hot-toast";
import { Outlet, ScrollRestoration } from "react-router";

export default function Layout() {
  return (
    <div>
      <ScrollRestoration />

      <Toaster position="top-center" reverseOrder={false} />

      <main>
        <Outlet />
      </main>
    </div>
  );
}
