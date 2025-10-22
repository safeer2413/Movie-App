import React from 'react'

function ToggleButton({ state }) {
    const { theme, setTheme } = state;

    return (

        <div className="flex items-center justify-end gap-2">
            <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className={`relative w-16 h-8 rounded-full borde transition-all duration-500 shadow-md flex items-center
      ${theme === "light"
                        ? "bg-amber-700 shadow-gray-900/50"
                        : "bg-gray-900 shadow-amber-400/50"}
    `}
            >
                {/* ☀️ Light icon */}
                <span
                    className={`absolute left-1 text-white text-lg transition-all duration-500
        ${theme === "light" ? "opacity-100 scale-100 z-[3]" : "opacity-0 scale-0"}
      `}
                >
                    ☀️
                </span>

                {/* 🌙 Dark icon */}
                <span
                    className={`absolute right-1 text-white text-lg transition-all duration-500
        ${theme === "dark" ? "opacity-100 scale-100 z-[3]" : "opacity-0 scale-0"}
      `}
                >
                    🌙
                </span>

                {/* ⚪ Knob */}
                <span
                    className={`absolute w-6 h-6 bg-[#F2F2F2] rounded-full shadow-lg transform transition-transform duration-500
        ${theme === "light" ? "translate-x-1" : "translate-x-9"}
      `}
                ></span>
            </button>
        </div>
    )
}

export default ToggleButton