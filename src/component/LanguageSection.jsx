import React from 'react'
import SkeletonButton from './SkeletonButton'

function LanguageSection({ state }) {
    const { loading, language, setLanguage } = state;

    return (
        <div className="flex flex-wrap justify-center text-gray-800 gap-3 mt-4">
            {loading
                ? Array.from({ length: 8 }).map((_, i) => <SkeletonButton key={i} />)
                : [
                    { code: "en", label: "English" },
                    { code: "hi", label: "Hindi" },
                    { code: "ml", label: "Malayalam" },
                    { code: "ta", label: "Tamil" },
                    { code: "te", label: "Telugu" },
                    { code: "kn", label: "Kannada" },
                ].map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${language === lang.code
                            ? "bg-yellow-700 text-white shadow-md"
                            : "bg-amber-200 dark:bg-gray-800 dark:text-gray-200 border border-gray-400 hover:bg-yellow-500 dark:hover:bg-gray-700"
                            }`}
                    >
                        {lang.label}
                    </button>
                ))}
        </div>
    )
}

export default LanguageSection