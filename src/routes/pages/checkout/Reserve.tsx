import { useState } from "react";
import { ReserveItemSkeleton } from "../../../components/Item";

export default function Reserve() {
  const category = ["전체", "콘서트", "공연", "추가 예정"];
  const orders = ["최신순", "임박순"];
  const [filter, setFilter] = useState({ category: "전체", order: "최신순" });

  const handleFilter = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <section className="w-full max-w-7xl px-5 py-20 mx-auto">
      {/* status filter */}
      <div className="mb-10 flex justify-between items-center">
        <ul className="flex gap-2.5">
          {category.map((item: string, index: number) => (
            <li key={index}>
              <label
                className={`px-2.5 py-1.25 border text-sm cursor-pointer rounded-xl ${filter.category === item ? "bg-(--signal) text-(--bg) border-(--signal)" : "bg-(--bg) text-(--ink) border-(--line)"}`}>
                {item}
                <input
                  type="radio"
                  name="category"
                  value={item}
                  checked={filter.category === item}
                  onChange={handleFilter}
                  className={`py-px px-2 rounded-xl hidden`}
                />
              </label>
            </li>
          ))}
        </ul>
        <select
          name="order"
          className="text-sm py-1.25 px-2.5 border border-(--line) rounded-xl focus:outline-0">
          {orders.map((order: string, index: number) => (
            <option value={order} key={index}>
              {order}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="flex flex-col gap-5">
          {Array.from({ length: 10 }).map((_, index: number) => (
            <ReserveItemSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
