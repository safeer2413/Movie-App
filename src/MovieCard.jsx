import { useState } from "react";
import ModelPopup from "./ModelPopup";

const MovieCard = ({ movie }) => {
  const [showModal, setShowModal] = useState(false);

  const imgURL = movie.poster_path
    ? `https://image.tmdb.org/t/p/w400${movie.poster_path}`
    : "https://placehold.co/400x600?text=No+Image";

  return (
    <>
      {/* 🎞️ Movie Card */}
      <div
        onClick={() => setShowModal(true)}
        className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer"
      >
        <img
          src={imgURL}
          alt={movie.title}
          className="w-full h-80 object-cover"
        />
        <div className="p-3">
          <h3 className="font-semibold text-lg truncate">{movie.title}</h3>
          <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
            ⭐ {movie.vote_average.toFixed(1)} | 📅 {movie.release_date.slice(0, 4) || "N/A"}
          </p>
        </div>
      </div>

      {/* 🎬 Modal Popup */}
      {showModal && (
        <ModelPopup state={{movie, imgURL, setShowModal}}/>
      )}
    </>
  );
};

export default MovieCard;
