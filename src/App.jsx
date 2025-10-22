import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import MovieSkeleton from "./MovieSkeleton";
import "./index.css";
import SkeletonButton from "./SkeletonButton";
import NoMoviesFound from "./NoMoviesFound";
import LanguageSection from "./LanguageSection";
import SearchBar from "./SearchBar";

const App = () => {
  const BASE_URL = "https://api.themoviedb.org/3";
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);

  const fetchByLanguage = async (lang = language) => {
    setLoading(true);
    const res = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&with_original_language=${lang}`
    );
    const data = await res.json();
    setMovies(data.results || []);
    setLoading(false);
  };

  const searchMovies = async (query) => {
    if (!query) return fetchByLanguage(language);
    setLoading(true);
    const res = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&with_original_language=${language}`
    );
    const data = await res.json();
    setMovies(data.results || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchByLanguage(language);
  }, [language]);

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);


  return (
    <div
      className={`min-h-screen flex flex-col items-center px-4 py-6 ${theme === "dark"
        ? "bg-gradient-to-r from-gray-900 to-gray-800 text-white"
        : "bg-gradient-to-r from-amber-300 to-orange-400 text-gray-900"
        }`}
    >
      {/* 🔹 Header Section */}
      <header className="w-full max-w-6xl mb-4 border rounded-lg p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          {/* Left: Title */}
          <h1 className="text-3xl md:text-4xl font-extrabold font-['Roboto_Slab'] bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-700">
            🎬 Movie <span className="text-blue-800">World</span>
          </h1>

          {/* Center: Search bar (only below on xs, inline on sm+) */}
          <div className="order-last sm:order-none w-full sm:flex-1 sm:mx-6">
            <div className="w-full flex justify-center sm:justify-center">
              <div className="w-full sm:w-80 md:w-96">
                <SearchBar state={{ searchTerm, setSearchTerm, searchMovies }} />
              </div>
            </div>
          </div>

          {/* Right: Theme toggle */}
          <div className="flex items-center justify-end gap-2">
            <span className="text-sm font-semibold">
              {theme === "light" ? "🌞 Light" : "🌙 Dark"}
            </span>
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className={`relative w-14 h-6 flex items-center rounded-full transition-all duration-500 ${theme === "light" ? "bg-amber-700" : "bg-yellow-400"
                }`}
            >
              <span
                className={`absolute w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-500 ${theme === "light" ? "translate-x-1" : "translate-x-7"
                  }`}
              ></span>
            </button>
          </div>
        </div>
      </header>


      {/* 🔹 Language Section */}
      <div className="flex flex-wrap justify-center text-gray-800 gap-3 mt-1">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonButton key={i} />)
          : movies.length > 0
            ? <LanguageSection state={{ loading, language, setLanguage }} />
            : ""}
      </div>

      {/* 🔹 Movie Cards Section */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-7 w-full max-w-6xl">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <MovieSkeleton key={i} />)
          : movies.length > 0
            ? movies.map((movie) => <MovieCard key={movie.id} movie={movie} theme={theme} />)
            : <NoMoviesFound />}
      </div>

      {/* 🔹 Footer */}
      <footer className="mt-10 text-sm opacity-70">
        © 2025 MovieWorld | Built with ❤️ React + TMDb API
      </footer>
    </div>
  );
};

export default App;
