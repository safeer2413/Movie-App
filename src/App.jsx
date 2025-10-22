import { useEffect, useState } from "react";
import MovieCard from "./component/MovieCard";
import MovieSkeleton from "./component/MovieSkeleton";
import "./index.css";
import SkeletonButton from "./component/SkeletonButton";
import NoMoviesFound from "./component/NoMoviesFound";
import LanguageSection from "./component/LanguageSection";
import SearchBar from "./component/SearchBar";
import ToggleButton from "./component/ToggleButton";

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
    document.documentElement.classList.toggle("dark", theme === "dark");
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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          {/* 🔸 Title + Toggle (for mobile only) */}
          <div className="flex items-center justify-between w-full sm:w-auto">
            <h1 className="text-2xl md:text-3xl font-extrabold font-['Roboto_Slab'] bg-clip-text text-transparent bg-gradient-to-r from-amber-800 to-orange-500">
              🎬 Movie <span className="text-orange-800">World</span>
            </h1>

            {/* Toggle - visible only on mobile */}
            <div className="sm:hidden">
              <ToggleButton state={{ theme, setTheme }} />
            </div>
          </div>

          {/* 🔸 Search Bar (centered, responsive width) */}
          <div className="flex justify-center sm:flex-1 sm:justify-center">
            <div className="w-full sm:w-[65%] md:w-[50%] lg:w-[40%] xl:w-[30%]">
              <SearchBar state={{ searchTerm, setSearchTerm, searchMovies }} />
            </div>
          </div>

          {/* 🔸 Toggle (for larger screens) */}
          <div className="hidden sm:block">
            <ToggleButton state={{ theme, setTheme }} />
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
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 mt-7 w-full max-w-6xl">
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
