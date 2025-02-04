"use client";

import { usePathname, useRouter } from "next/navigation";
import { Home, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";

const FooterBar = ({
  currentFilter,
  setFilter,
}: {
  currentFilter: "public" | "following" | "store";
  setFilter: (filter: "public" | "following" | "store") => void;
}) => {
  const pathname = usePathname(); // Get the current route
  const router = useRouter(); // For navigation

  const handleNavigation = (filter: "public" | "following") => {
    if (pathname === "/store") {
      router.push("/feed"); // Redirect to feed page
    } else {
      setFilter(filter);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black border-t border-gray-700 flex justify-around p-2">
      <button
        className={`flex flex-col items-center ${
          currentFilter === "following" ? "text-white" : "text-gray-400"
        }`}
        onClick={() => handleNavigation("following")}
      >
        <Home size={24} />
      </button>
      <button
        className={`flex flex-col items-center ${
          currentFilter === "public" ? "text-white" : "text-gray-400"
        }`}
        onClick={() => handleNavigation("public")}
      >
        <Search size={24} />
      </button>

      <Link
        href="/store"
        className={`flex flex-col items-center ${
          currentFilter === "store" ? "text-white" : "text-gray-400"
        }`}
      >
        <ShoppingBag size={24} />
      </Link>
    </div>
  );
};

export default FooterBar;
