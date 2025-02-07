import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Define the user state interface
interface UserState {
  profilePicture: string | null;
  displayName: string | null;
  description: string | null;
  followCount: number;
  followingCount: number;
  setUser: (url: Partial<UserState>) => void;
  clearUser: () => void;
}

// Zustand store with persistence
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      displayName: null,
      followCount: 0,
      followingCount: 0,
      profilePicture: null,
      description: null,
      setUser: (user) => set((state) => ({ ...state, ...user })),
      clearUser: () => set({
        displayName: null,
        followCount: 0,
        followingCount: 0,
        profilePicture: null,
        description: null
      })
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage), // Avoids SSR issues
    }
  )
);
