import React, { useEffect, useState } from 'react'

function ModelPopup({ state }) {

    const { movie, setShowModal, imgURL } = state
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

    useEffect(() => {
        fetchTrailer(movie.id);
    }, [movie]);

    return (

        <div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            onClick={() => setShowModal(false)}
        >
            <div
                className="bg-white dark:bg-gray-900 rounded-lg overflow-y-auto w-11/12 md:w-2/3 lg:w-1/2 shadow-xl max-h-[95vh]"
                onClick={(e) => e.stopPropagation()}
            >

                <img
                    src={imgURL}
                    alt={movie.title}
                    className="w-full h-96 object-cover"
                />
                <div className="p-5">
                    <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                        {movie.overview || "No description available."}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                        <p>⭐ {movie.vote_average.toFixed(1)}</p>
                        <p>📅 {movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}</p>
                        <p>🎭 {movie.original_language?.toUpperCase()}</p>
                    </div>

                    <div className="flex gap-3 mt-5">
                        {trailerUrl && (
                            <a
                                href={trailerUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md"
                            >
                                ▶️ Play Trailer
                            </a>
                        )}
                    </div>


                    <button
                        onClick={() => setShowModal(false)}
                        className="mt-5 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md"
                    >
                        Close ✖
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModelPopup