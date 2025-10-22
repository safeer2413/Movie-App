import { useState } from "react";
import ModelPopup from "./ModelPopup";

const MovieCard = ({ movie, theme }) => {
  const [showModal, setShowModal] = useState(false);

  const imgURL = movie.poster_path
    ? `https://image.tmdb.org/t/p/w400${movie.poster_path}`
    : "https://placehold.co/400x600?text=No+Image";

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className={`
          rounded-lg overflow-hidden shadow-md hover:scale-105 hover:shadow-lg 
          transition-all duration-300 cursor-pointer border
          ${theme === "dark"
            ? "bg-gray-900 border-amber-100 text-white"
            : "bg-amber-100 border-transparent text-black"}
        `}
      >
        <img src={imgURL} alt={movie.title} className="w-full object-cover" />
        <div className="p-3">
          <h3 className="font-semibold text-lg truncate">{movie.title}</h3>
          <p className="text-sm mt-1 opacity-80">
            ⭐ {movie.vote_average.toFixed(1)} | 📅 {movie.release_date?.slice(0, 4) || "N/A"}
          </p>
        </div>
      </div>

      {showModal && (
        <ModelPopup state={{ movie, imgURL, setShowModal }} theme={theme} />
      )}
    </>
  );
};

export default MovieCard;
