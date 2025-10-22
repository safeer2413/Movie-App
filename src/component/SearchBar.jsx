import React from "react";

function SearchBar({ state }) {
    const { searchTerm, setSearchTerm, searchMovies } = state;

    return (
        <div className="flex h-10 w-full">
            <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && searchMovies(searchTerm)}
                placeholder="Search for movies..."
                className="flex-grow p-3 rounded-l-md border dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none"
            />
            <button
                onClick={() => searchMovies(searchTerm)}
                className="bg-amber-700 text-white px-5 rounded-r-md hover:bg-yellow-600 transition-all"
            >
                🔍
            </button>
        </div>
    );
}

export default SearchBar;
