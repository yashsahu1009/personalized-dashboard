 "use client";

import { ChangeEvent, KeyboardEvent, useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState("");

  // Sync search input with URL
  useEffect(() => {
    const urlSearch = new URLSearchParams(window.location.search).get("search") || "";
    setSearch(urlSearch);
  }, [pathname]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  const handleSearchKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const trimmed = search.trim();
      router.push(trimmed === "" ? pathname : `${pathname}?search=${trimmed}`);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-4 bg-white/10 backdrop-blur-lg gap-3 sm:gap-0">
      {/* SEARCH */}
      <div className="flex items-center gap-2 bg-white/10 px-3 sm:px-4 py-2 rounded-full w-full sm:w-1/2">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search news, movies or social..."
          className="bg-transparent outline-none w-full text-sm sm:text-base"
          value={search}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKey}
        />
      </div>
    </div>
  );
}