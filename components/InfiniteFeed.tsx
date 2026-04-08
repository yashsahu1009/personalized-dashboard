"use client";

import { useEffect, useRef, useState } from "react";
import ContentCard from "./ContentCard";
import {
  fetchNews,
  fetchMovies,
  fetchSocialMediaPosts,
} from "./api";

export default function InfiniteFeed() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loaderRef = useRef(null);

  // 🔥 Load Data
  const loadData = async () => {
    if (loading) return;

    setLoading(true);

    const [news, movies, social] = await Promise.all([
      fetchNews(page),
      fetchMovies("technology", page),
      fetchSocialMediaPosts(page),
    ]);

    const combined = [...news, ...movies, ...social];

    // remove duplicates
    setData((prev) => {
      const merged = [...prev, ...combined];
      const unique = merged.filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.id === item.id)
      );
      return unique;
    });

    setLoading(false);
  };

  // Load on page change
  useEffect(() => {
    loadData();
  }, [page]);

  // 👀 Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [loading]);

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>🔥 Infinite Feed</h2>

      {data.map((item) => (
        <ContentCard key={item.id} item={item} />
      ))}

      {/* Loader */}
      <div ref={loaderRef} style={{ padding: "20px", textAlign: "center" }}>
        {loading ? "Loading more..." : "Scroll down 👇"}
      </div>
    </div>
  );
}