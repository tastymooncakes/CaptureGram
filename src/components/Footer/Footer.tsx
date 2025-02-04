"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Home, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";

const FooterBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  
  const currentFilter = searchParams.get("filter") || "following";

  const handleNavigation = (filter: "public" | "following") => {
    router.push(`/feed?filter=${filter}`);
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
        href="/store?filter=store"
        className={`flex flex-col items-center ${
          currentFilter === "store" || pathname === "/store" ? "text-white" : "text-gray-400"
        }`}
      >
        <ShoppingBag size={24} />
      </Link>
    </div>
  );
};

export default FooterBar;
