 "use client";

import { useEffect, useState } from "react";
import ContentCard from "@/components/ContentCard";

type Item = {
  title: string;
  description: string;
  image: string;
  type: "news" | "movie" | "social";
};

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Item[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(data);
  }, []);

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">❤️ Favorites</h1>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {favorites.map((item, i) => (
            <ContentCard key={i} {...item} />
          ))}
        </div>
      ) : (
        <p className="text-gray-300">No favorites yet</p>
      )}
    </div>
  );
}