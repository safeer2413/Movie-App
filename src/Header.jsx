import React from 'react'

function Header({ state }) {
    const { theme, setTheme } = state
    return (
        <header className="w-full max-w-6xl flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold font-['Roboto_Slab'] bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                🎬 Movie <span className="text-blue-700">World</span>
            </h1>

            <div className="flex items-center gap-4">
                <button
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                    className={`relative w-14 h-8 flex items-center rounded-full transition-all duration-500 ${theme === "light" ? "bg-gray-300" : "bg-yellow-400"
                        }`}
                >
                    <span
                        className={`absolute w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-500 ${theme === "light" ? "translate-x-1" : "translate-x-7"
                            }`}
                    ></span>
                </button>

            </div>
        </header>

    )
}

export default Header