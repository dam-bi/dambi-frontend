import { NavLink } from "react-router";
import Input from "./Input";
import { Menu, Search, ShoppingCart, Ticket, User, X } from "lucide-react";
import { useState } from "react";

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

  // 공통 searchForm components
  const SearchForm = ({ className }: { className: string }) => (
    <form className={`${className}`}>
      <Input error={false}>
        <Search stroke="var(--muted)" />
        <input type="text" placeholder="검색어를 입력해주세요." />
      </Input>
    </form>
  );

  // 공통 ActionButton Components
  const ActionButton = ({ className }: { className: string }) => (
    <div className={`flex-col lg:flex-row gap-5 mb-0 ${className}`}>
      <button
        type="button"
        className="flex gap-2.5 items-center border border-(--border) hover:bg-(--cream) py-2.5 px-5 rounded-xl lg:border-0 lg:p-0 lg:hover:bg-transparent">
        <User stroke="var(--muted)" />{" "}
        <span className="text-sm text-(--muted)">로그인</span>
      </button>
      <button
        type="button"
        className="flex gap-2.5 items-center border border-(--border) hover:bg-(--cream) py-2.5 px-5 rounded-xl lg:border-0 lg:p-0 lg:hover:bg-transparent">
        <Ticket stroke="var(--muted)" />{" "}
        <span className="text-sm text-(--muted)">예매 확인 / 취소</span>
      </button>
      <button
        type="button"
        className="flex gap-2.5 items-center border border-(--border) hover:bg-(--cream) py-2.5 px-5 rounded-xl lg:border-0 lg:p-0 lg:hover:bg-transparent">
        <ShoppingCart stroke="var(--muted)" />{" "}
        <span className="text-sm text-(--muted)">장바구니</span>
      </button>
    </div>
  );

  return (
    <>
      <header className="bg-(--bg) border-b border-(--border) pb-0 lg:pb-6.25">
        <div className="w-full max-w-7xl h-full px-5 mx-auto flex justify-between">
          {/* 타이틀 및 네비게이션 */}
          <div className="flex flex-col justify-center">
            {/* 타이틀 */}
            <div className="flex items-center">
              <h1 className="text-[26px] font-black">
                <span className="text-(--gold)">담</span>번에 온 비밀{" "}
                <span className="text-(--gold)">티</span>켓
              </h1>
              <img
                src="./Dambi Logo.png"
                alt="담번에 온 비밀 티켓"
                className="w-22.5"
              />
            </div>
            {/* 네비게이션 */}
            <nav
              className={`
                bg-(--bg) lg:static lg:block lg:w-auto lg:h-auto lg:shadow-none

                flex-col gap-5 fixed top-0 right-0 z-999 w-100 h-full transition-transform duration-300 p-5 lg:p-0 border-l border-(--border) lg:border-l-0

                ${isMenuOpen ? "flex" : "hidden"}
              `}>
              <div className="flex lg:hidden justify-between items-center">
                <h2 className="text-xl font-bold">
                  <span className="text-(--gold)">담</span>번에 온 비밀{" "}
                  <span className="text-(--gold)">티</span>켓
                </h2>
                <button type="button" onClick={toggleMenu} className="p-2.5">
                  <X />
                </button>
              </div>
              <SearchForm className="block lg:hidden w-full max-w-100" />
              <ul className="flex flex-col lg:flex-row gap-2.5 flex-1">
                {navMenu.map((menu: { path: string; title: string }) => (
                  <li key={menu.title}>
                    <NavLink
                      to={menu.path}
                      className={({ isActive }) =>
                        `py-2.5 px-5 text-sm border-b-2 border-(--bg) hover:border-(--gold) ${isActive ? " border-(--gold) text-(--gold)" : "text-(--muted)"}`
                      }>
                      {menu.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <ActionButton className="flex lg:hidden" />
            </nav>
          </div>

          {/* 검색 및 유저 */}
          <div>
            <div className="hidden pt-0 lg:pt-6.25 lg:flex flex-col justify-between items-end h-full">
              <SearchForm className="hidden lg:block w-100" />

              <div className="flex items-end gap-5">
                <ActionButton className="hidden lg:flex" />
              </div>
            </div>

            <div className="h-full flex items-center lg:hidden">
              <button
                type="button"
                onClick={toggleMenu}
                className="flex p-2.5 justify-center items-center lg:hidden">
                <Menu stroke="var(--muted)" />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
