import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Define the user state interface
interface UserState {
  profilePicture: string | null;
  setProfile: (url: string) => void;
}

// Zustand store with persistence
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      profilePicture: null,
      setProfile: (url: string) => set({ profilePicture: url }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage), // Avoids SSR issues
    }
  )
);
