import { NavLink } from "react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import NavButton from "./NavButton";

export default function Header() {
  const navMenu = [
    { path: "/", title: "홈" },
    { path: "/concert", title: "콘서트" },
    { path: "/event", title: "이벤트" },
    { path: "/notice", title: "공지사항" },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((isMenuOpen) => !isMenuOpen);
  };

  return (
    <>
      <header className="bg-(--bg) border-b border-(--line) py-5">
        <div className="w-full max-w-7xl px-5 h-full mx-auto flex justify-between">
          {/* 타이틀 및 네비게이션 */}
          <div className="flex flex-col justify-center">
            {/* 타이틀 */}
            <div className="flex items-center">
              <h1 className="text-lg md:text-[32px] font-black">
                <span className="text-(--signal)">담</span>번에 온 비밀{" "}
                <span className="text-(--signal)">티</span>켓
              </h1>
            </div>
            {/* 네비게이션 */}
            <nav
              className={`
                bg-(--bg) md:static md:block md:w-auto md:h-auto md:shadow-none md:p-0 md:mt-5 md:border-l-0

                flex-col gap-5 fixed top-0 right-0 z-999 w-100 h-full transition-transform duration-300

                ${isMenuOpen ? "flex" : "hidden"}
              `}>
              {/* 모바일 네비 헤더 */}
              <div className="flex md:hidden justify-between items-center p-5">
                <h2 className="text-xl font-bold">
                  <span className="text-(--signal)">담</span>번에 온 비밀{" "}
                  <span className="text-(--signal)">티</span>켓
                </h2>
                <button type="button" onClick={toggleMenu} className="p-2.5">
                  <X />
                </button>
              </div>

              {/* 네비게이션 */}
              <ul className="flex flex-col md:flex-row gap-2.5 flex-1">
                {navMenu.map((menu: { path: string; title: string }) => (
                  <li key={menu.title}>
                    <NavLink
                      to={menu.path}
                      className={({ isActive }) =>
                        `py-2.5 px-5 text-sm border-l border-b-0 md:border-b md:border-l-0 border-(--bg) hover:border-(--signal) ${isActive ? " border-(--signal) text-(--signal) font-bold" : "text-(--ink) font-medium"}`
                      }>
                      {menu.title}
                    </NavLink>
                  </li>
                ))}
              </ul>

              {/* 유저 네비게이션 */}
              <NavButton className="flex md:hidden p-5" />
            </nav>
          </div>

          {/* 유저 네비게이션 */}
          <div>
            <div className="hidden md:flex md:items-end h-full">
              <NavButton className="hidden md:flex" />
            </div>

            <div className="h-full flex items-center md:hidden">
              <button
                type="button"
                onClick={toggleMenu}
                className="flex p-2.5 justify-center items-center md:hidden">
                <Menu stroke="var(--muted)" />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
