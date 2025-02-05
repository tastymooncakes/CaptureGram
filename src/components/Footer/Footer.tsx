"use client";

import { usePathname } from "next/navigation";
import { Home, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";

const FooterBar = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black border-t border-gray-700 flex justify-around p-2">
      

      <Link
        href="/feed"
        className={`flex flex-col items-center ${
          pathname === "/feed" ? "text-white" : "text-gray-400"
        }`}
      >
        <Home size={24} />
      </Link>

      <Link
        href="/publicfeed"
        className={`flex flex-col items-center ${
          pathname === "/publicfeed" ? "text-white" : "text-gray-400"
        }`}
      >
        <Search size={24} />
      </Link>

      <Link
        href="/store"
        className={`flex flex-col items-center ${
          pathname === "/store" ? "text-white" : "text-gray-400"
        }`}
      >
        <ShoppingBag size={24} />
      </Link>
    </div>
  );
};

export default FooterBar;
