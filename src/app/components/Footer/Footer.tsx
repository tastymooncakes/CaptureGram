// components/FooterBar.tsx
"use client";

import { usePathname } from "next/navigation";
import { Home, Search, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { useUserStore } from "../../localStorage/userStore"; // Import Zustand store

const FooterBar = () => {
  const pathname = usePathname();
  const { profilePicture } = useUserStore();

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black border-t border-gray-700 flex justify-around p-2">
      <Link href="/feed" className={`flex flex-col items-center ${pathname === "/feed" ? "text-white" : "text-gray-400"}`}>
        <Home size={24} />
      </Link>

      <Link href="/publicfeed" className={`flex flex-col items-center ${pathname === "/publicfeed" ? "text-white" : "text-gray-400"}`}>
        <Search size={24} />
      </Link>

      <Link href="/store" className={`flex flex-col items-center ${pathname === "/store" ? "text-white" : "text-gray-400"}`}>
        <ShoppingBag size={24} />
      </Link>

      <Link href="/user-profile" className={`flex flex-col items-center ${pathname === "/user-profile" ? "text-white" : "text-gray-400"}`}>
        {profilePicture ? (
          <img src={profilePicture} alt="User Profile" className="w-6 h-6 rounded-full" />
        ) : (
          <User size={24} />
        )}
      </Link>
    </div>
  );
};

export default FooterBar;
