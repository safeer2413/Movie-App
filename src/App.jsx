import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import MovieSkeleton from "./MovieSkeleton";
import "./index.css";
import SkeletonButton from "./SkeletonButton";
import NoMoviesFound from "./NoMoviesFound";
import LanguageSection from "./LanguageSection";
import SearchBar from "./SearchBar";
import Header from "./Header";

const App = () => {

  const BASE_URL = "https://api.themoviedb.org/3";
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState("light");
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
  }, [theme]);

  return (
    <div
      className={`min-h-screen flex flex-col items-center px-4 py-6 ${theme === "dark"
        ? "bg-gradient-to-r from-gray-900 to-gray-800 text-white"
        : "bg-gradient-to-r from-blue-100 to-indigo-200 text-gray-900"
        }`}
    >
      {/* Header */}
      <div><Header state={{ theme, setTheme }} /></div>

      {/* Search */}
      <div><SearchBar state={{ searchTerm, setSearchTerm, searchMovies }} /></div>

      {/* Language Section */}
      <div className="flex flex-wrap justify-center text-gray-800 gap-3 mt-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonButton key={i} />)
          : movies.length > 0
            ? <LanguageSection state={{ loading, language, setLanguage }} />
            : ""
        }
      </div>

      {/* Movie Card */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5 w-full max-w-6xl">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <MovieSkeleton key={i} />)
          : movies.length > 0
            ? movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
            : <NoMoviesFound />
        }
      </div>

      {/* Footer */}
      <footer className="mt-10 text-sm opacity-70">
        © 2025 MovieWorld | Built with ❤️ React + TMDb API
      </footer>
    </div>
  );
};

export default App;