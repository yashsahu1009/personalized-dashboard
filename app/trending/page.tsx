 "use client";

import { useEffect, useState } from "react";
import ContentCard from "@/components/ContentCard";
import Loader from "@/components/Loader";
import { fetchNews, fetchMovies } from "@/services/api";

type Item = {
  title: string;
  description: string;
  image: string;
  type: "news" | "movie";
};

export default function TrendingPage() {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrending = async () => {
      setLoading(true);

      try {
        const [news, movies] = await Promise.all([
          fetchNews(),
          fetchMovies("avengers"),
        ]);

        // ✅ Format news
        const formattedNews = (news || []).slice(0, 5).map((n: any) => ({
          title: n.title,
          description: n.description || "No description",
          image: n.urlToImage || "/placeholder.png",
          type: "news" as const,
        }));

        // ✅ Format movies
        const formattedMovies = (movies || []).slice(0, 5).map((m: any) => ({
          title: m.Title,
          description: `Year: ${m.Year}`,
          image: m.Poster || "/placeholder.png",
          type: "movie" as const,
        }));

        setData([...formattedNews, ...formattedMovies]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTrending();
  }, []);

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">🔥 Trending</h2>

      {loading ? (
        <div className="flex justify-center py-6">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {data.length > 0 ? (
            data.map((item, i) => <ContentCard key={i} {...item} />)
          ) : (
            <p className="text-gray-500 col-span-full text-center text-sm sm:text-base">
              No trending data found
            </p>
          )}
        </div>
      )}
    </div>
  );
}