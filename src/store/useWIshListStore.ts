import toast from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface WishListStore {
  wishListId: number[];
  wishList: WishList[];
  addWishList: (wishItem: WishList) => void;
  removeWishList: (wishItem: WishList) => void;
  clearWishList: () => void;
}

export const useWishListStore = create<WishListStore>()(
  persist(
    (set, get) => ({
      wishListId: [],
      wishList: [],

      addWishList: (wishItem) => {
        const { wishListId, removeWishList } = get();

        if (wishListId.includes(wishItem.concertId)) {
          removeWishList(wishItem);
          return;
        }

        set((state) => ({
          wishListId: [...state.wishListId, wishItem.concertId],
          wishList: [...state.wishList, wishItem],
        }));
      },

      removeWishList: (wishItem) => {
        toast.error(`${wishItem.concertTitle} - 찜목록에서 제거되었습니다.`, {
          id: "wishList-delete",
          duration: 1000,
        });
        set((state) => ({
          wishListId: state.wishListId.filter(
            (id) => id !== wishItem.concertId,
          ),
          wishList: state.wishList.filter(
            (p) => p.concertId !== wishItem.concertId,
          ),
        }));
      },

      clearWishList: () => set({ wishListId: [], wishList: [] }),
    }),
    {
      name: "dambi-wishList",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
