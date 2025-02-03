"use client";

import { Home, Search, ShoppingBag } from "lucide-react";

const FooterBar = ({ currentFilter, setFilter }: { 
  currentFilter: "public" | "following"; 
  setFilter: (filter: "public" | "following") => void; 
  userProfilePicture: string; 
}) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-black border-t border-gray-700 flex justify-around p-2">
        <button
        className={`flex flex-col items-center ${
          currentFilter === "following" ? "text-white" : "text-gray-400"
        }`}
        onClick={() => setFilter("following")}
      >
        <Home size={24} />
      </button>
      <button
        className={`flex flex-col items-center ${
          currentFilter === "public" ? "text-white" : "text-gray-400"
        }`}
        onClick={() => setFilter("public")}
      >
        <Search size={24} />
      </button>
      
      

      <button className="flex flex-col items-center text-gray-400">
        <ShoppingBag size={24} />
      </button>
    </div>
  );
};

export default FooterBar;
