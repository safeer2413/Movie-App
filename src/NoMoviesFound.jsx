import React from "react";

const NoMoviesFound = () => {
    return (
        <div className="col-span-full flex flex-col  items-center justify-center mt-16 text-center">
            <span className="text-6xl mb-4 animate-bounce">🎬</span>
            <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                No Movies Found
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
                Try searching with another keyword or changing the language filter.
            </p>
        </div>
    );
};

export default NoMoviesFound;