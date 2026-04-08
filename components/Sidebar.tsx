 "use client";

import { useState } from "react";
import { Home, Star, TrendingUp, Settings, Menu, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menu = [
    { name: "Home", icon: <Home size={18} />, path: "/" },
    { name: "Trending", icon: <TrendingUp size={18} />, path: "/trending" },
    { name: "Favorites", icon: <Star size={18} />, path: "/favorites" },
    { name: "Settings", icon: <Settings size={18} />, path: "/settings" },
  ];

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white/10 dark:bg-black/30 backdrop-blur-lg">
        <h1 className="text-2xl font-bold">🚀 DashUI</h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen w-64 bg-white/10 dark:bg-black/30 backdrop-blur-xl border-r border-white/10 dark:border-gray-700 p-6 flex flex-col justify-between
          transform transition-transform duration-300 ease-in-out z-20
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:flex
        `}
      >
        <div>
          <h1 className="text-2xl font-bold mb-10 hidden md:block">🚀 DashUI</h1>

          <nav className="space-y-3">
            {menu.map((item) => (
              <div
                key={item.name}
                onClick={() => {
                  router.push(item.path);
                  setIsOpen(false); // Close mobile menu
                }}
                className={`flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer transition ${
                  pathname === item.path
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : "hover:bg-white/10 dark:hover:bg-black/20"
                }`}
              >
                {item.icon}
                {item.name}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-10 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}