 "use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react"; // Only Heart exists in lucide-react

type Props = {
  title: string;
  description: string;
  image: string;
  type: "news" | "movie" | "social";
  url?: string;
};

export default function ContentCard({ title, description, image, type, url }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    const exists = favs.some((item: any) => item.title === title && item.type === type);
    setIsFavorite(exists);
  }, [title, type]);

  const handleRedirect = () => {
    if ((type === "news" || type === "movie") && url) {
      window.open(url, "_blank");
    } else if (type === "social") {
      window.open("https://twitter.com", "_blank");
    }
  };

  const toggleFavorite = () => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (isFavorite) {
      const updated = favs.filter((item: any) => !(item.title === title && item.type === type));
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      favs.push({ title, description, image, type, url });
      localStorage.setItem("favorites", JSON.stringify(favs));
      setIsFavorite(true);
    }
  };

  return (
    <div className="group relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2">
      
      {/* IMAGE */}
      {image && image !== "N/A" && (
        <div className="overflow-hidden">
          <img
            src={image}
            alt={title || "content image"}
            className="w-full h-40 sm:h-48 md:h-52 lg:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      )}

      {/* FAVORITE ICON */}
      <button
        onClick={toggleFavorite}
        className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1 rounded-full bg-black/40 hover:bg-black/60 transition"
      >
        <Heart className={isFavorite ? "text-red-500" : "text-white"} size={20} />
      </button>

      <div className="p-3 sm:p-4">
        {/* TYPE BADGE */}
        <span
          className={`inline-block px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-full mb-2 font-medium ${
            type === "news"
              ? "bg-blue-500/20 text-blue-400"
              : type === "movie"
              ? "bg-purple-500/20 text-purple-400"
              : "bg-green-500/20 text-green-400"
          }`}
        >
          {(type ?? "news").toUpperCase()}
        </span>

        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white line-clamp-2">
          {title}
        </h3>

        <p className="text-[10px] sm:text-sm text-gray-300 mt-1 sm:mt-2 line-clamp-3">
          {description}
        </p>

        {/* VIEW BUTTON */}
        <button
          onClick={handleRedirect}
          className="mt-3 sm:mt-4 w-full py-1.5 sm:py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs sm:text-sm font-medium hover:opacity-90 transition"
        >
          View Details →
        </button>
      </div>
    </div>
  );
}