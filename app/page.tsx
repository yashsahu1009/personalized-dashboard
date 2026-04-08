 "use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import ContentCard from "@/components/ContentCard";
import Loader from "@/components/Loader";
import { fetchNews, fetchMovies, fetchSocialMediaPosts } from "@/services/api";

type Item = {
  id: string;
  title: string;
  description: string;
  image: string;
  type: "news" | "movie" | "social";
};

export default function Dashboard() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const [allData, setAllData] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [visibleType, setVisibleType] = useState<"all" | "news" | "movie" | "social">("all");
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Reset data on search change
  useEffect(() => {
    setAllData([]);
    setPage(1);
  }, [searchQuery]);

  // Fetch data
  const loadData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const [news, social] = await Promise.all([
        fetchNews(searchQuery || "technology AND India"),
        fetchSocialMediaPosts(searchQuery || "tech"),
      ]);
      const movies = await fetchMovies(searchQuery || "avengers", page);

      const formattedNews = (news || []).map((n, i) => ({
        id: n.url || `news-${page}-${i}`,
        title: n.title,
        description: n.description || "No description",
        image: n.urlToImage || "/placeholder.png",
        type: "news" as const,
      }));

      const formattedSocial = (social || []).map((s, i) => ({
        id: s.id || `social-${page}-${i}`,
        title: s.user,
        description: s.content,
        image: "/placeholder.png",
        type: "social" as const,
      }));

      const formattedMovies = (movies || []).map((m, i) => ({
        id: m.imdbID || `movie-${page}-${i}`,
        title: m.Title,
        description: `Year: ${m.Year}`,
        image: m.Poster && m.Poster !== "N/A" ? m.Poster : "/placeholder.png",
        type: "movie" as const,
      }));

      const combined = [...formattedNews, ...formattedMovies, ...formattedSocial];

      // Merge and remove duplicates
      setAllData((prev) =>
        combined.concat(prev).filter((item, index, self) => index === self.findIndex((t) => t.id === item.id))
      );

    } catch (err) {
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [page, searchQuery]);

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) setPage((prev) => prev + 1);
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loading]);

  // Filtered data based on tab
  const visibleData = visibleType === "all" ? allData : allData.filter((d) => d.type === visibleType);

  return (
    <>
      <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">
        {searchQuery ? `🔍 Results for "${searchQuery}"` : "👋 Welcome Back"}
      </h2>

      {/* CATEGORY TABS */}
      <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-6">
        {["all", "news", "movie", "social"].map((t) => (
          <button
            key={t}
            className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base ${
              visibleType === t ? "bg-blue-500 text-white" : "bg-white/10 text-gray-300"
            }`}
            onClick={() => setVisibleType(t as any)}
          >
            {t === "all" ? "Overview" : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* CONTENT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {visibleData
          .filter((item) => item && item.title)
          .map((item, i) => (
            <ContentCard
              key={item.id || i}
              title={item.title || "No Title"}
              description={item.description || "No description"}
              image={item.image || "/placeholder.png"}
              type={item.type || "news"}
            />
          ))}
      </div>

      {/* LOADER */}
      <div ref={loaderRef} className="flex justify-center items-center py-6">
        {loading && <Loader />}
      </div>
    </>
  );
}