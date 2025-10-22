import React, { useEffect, useState } from "react";

function ModelPopup({ state, theme }) {
    const { movie, setShowModal, imgURL } = state;
    const [trailerUrl, setTrailerUrl] = useState(null);
    const API_KEY = import.meta.env.VITE_API_KEY;

    const fetchTrailer = async (movieId) => {
        const res = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
        );
        const data = await res.json();
        const trailer = data.results.find(
            (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        if (trailer) setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
    };

    const languageNames = {
        en: "English",
        hi: "Hindi",
        ml: "Malayalam",
        ta: "Tamil",
        te: "Telugu",
        kn: "Kannada",
        fr: "French",
        es: "Spanish",
        ja: "Japanese",
        ko: "Korean",
        zh: "Chinese",
    };

    useEffect(() => {
        fetchTrailer(movie.id);
    }, [movie]);

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            onClick={() => setShowModal(false)}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`
          rounded-lg overflow-y-auto w-11/12 md:w-2/3 lg:w-1/2 shadow-xl max-h-[95vh] border
          ${theme === "dark"
                        ? "bg-gray-900 border-amber-100 text-white"
                        : "bg-amber-100 border-transparent text-black"}
        `}
            >
                <img src={imgURL} alt={movie.title} className="w-full h-96 object-cover" />
                <div className="p-5">
                    <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
                    <p className="text-sm mb-4 leading-relaxed italic opacity-60">
                        {movie.overview || "No description available."}
                    </p>
                    <div className="flex justify-between text-sm opacity-80 mb-4">
                        <p>⭐ {movie.vote_average.toFixed(1)}</p>
                        <p>📅 {movie.release_date?.slice(0, 4) || "N/A"}</p>
                        <p>🎭 {languageNames[movie.original_language] || movie.original_language?.toUpperCase()}</p>

                    </div>

                    {trailerUrl && (
                        <a
                            href={trailerUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md mr-3"
                        >
                            ▶️ Play Trailer
                        </a>
                    )}

                    <button
                        onClick={() => setShowModal(false)}
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md"
                    >
                        Close ✖
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModelPopup;
