// localStorage/userStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserState {
  profilePicture: string | null;
  username: string | null;
  description: string | null;
  followCount: number;
  followingCount: number;
  setUser: (user: Partial<UserState>) => void; // Partial allows updating only some fields
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      username: null,
      followCount: 0,
      followingCount: 0,
      profilePicture: null,
      description: null,
      setUser: (user) => set((state) => ({ ...state, ...user })), // Update only the fields provided
      clearUser: () =>
        set({
          username: null,
          followCount: 0,
          followingCount: 0,
          profilePicture: null,
          description: null,
        }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
