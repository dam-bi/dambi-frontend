import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserInfo {
  accessToken: string;
  userInfo: {
    email: string;
    name: string;
    phone: string;
  };
}

interface AuthStore {
  isLogin: boolean;
  user: UserInfo | null;
  setUser: (userInfo: UserInfo) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLogin: false,
      user: null,

      setUser: (userInfo) =>
        set(() => ({
          isLogin: true,
          user: userInfo,
        })),

      logout: () =>
        set(() => ({
          isLogin: false,
          user: null,
        })),
    }),
    {
      name: "dambi-auth",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
