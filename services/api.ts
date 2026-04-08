 import axios from "axios";

const NEWS_API_KEY = "574de94b60804d76bfa60d7ea798e39c";
const OMDB_API_KEY = "1aa2ad36"; // Replace with your own key

// 📰 Fetch News dynamically based on query
export const fetchNews = async (query: string = "technology AND India") => {
  try {
    const res = await axios.get(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`
    );
    return res.data.status === "ok" ? res.data.articles || [] : [];
  } catch (error: any) {
    console.error("Error fetching news:", error.message);
    return [];
  }
};

// 🎬 Fetch Movies (OMDb) dynamically
export const fetchMovies = async (query: string = "avengers", page: number = 1) => {
  try {
    const res = await axios.get(
      `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}&type=movie&page=${page}`
    );
    return res.data.Search || [];
  } catch (error: any) {
    console.error("Error fetching movies:", error.message);
    return [];
  }
};

// 🐦 Mock Social Media API dynamically based on keyword
export const fetchSocialMediaPosts = async (keyword: string = "tech") => {
  try {
    const mockPosts = [
      { id: 1, user: "@tech_guru", content: `Check out the latest trends in #${keyword}!`, date: "2026-04-06T08:00:00Z" },
      { id: 2, user: "@dev_daily", content: `Our top tips for #${keyword} developers in 2026!`, date: "2026-04-05T15:30:00Z" },
      { id: 3, user: "@socialbuzz", content: `How #${keyword} is shaping the future of communication.`, date: "2026-04-04T12:15:00Z" },
    ];

    // Filter posts that include keyword
    const filteredPosts = mockPosts.filter(p =>
      p.content.toLowerCase().includes(keyword.toLowerCase())
    );

    await new Promise((resolve) => setTimeout(resolve, 500));
    return filteredPosts;
  } catch (error: any) {
    console.error("Error fetching social media posts:", error.message);
    return [];
  }
};