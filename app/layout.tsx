 "use client";

import "./globals.css";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <html lang="en">
      <body className="flex h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
        
        <Sidebar darkMode={darkMode} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            search=""
            setSearch={() => {}}
          />

          <div className="p-6 overflow-y-auto">
            {children}
          </div>
        </div>

      </body>
    </html>
  );
}