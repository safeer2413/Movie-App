import React from 'react'

function SearchBar({ state }) {

    const { searchTerm, setSearchTerm, searchMovies } = state;
    return (
        <div className="flex mb-6 w-full max-w-3xl">
            <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && searchMovies(searchTerm)}
                placeholder="Search for movies..."
                className="flex-grow p-3 rounded-l-md border dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none"
            />
            <button
                onClick={() => searchMovies(searchTerm)}
                className="bg-blue-600 text-white px-5 rounded-r-md hover:bg-blue-700 transition-all"
            >
                🔍
            </button>
        </div>
    )
}

export default SearchBar