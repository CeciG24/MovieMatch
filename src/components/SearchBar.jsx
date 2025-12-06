import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SearchBar() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <form 
            onSubmit={handleSearch}
            className="backdrop-blur-md bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 rounded-xl p-3 shadow-lg transition-all hover:shadow-xl hover:bg-white/15 dark:hover:bg-black/25"
        >
            <div className="flex items-center gap-3">
                <input 
                    type="text" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search movies..." 
                    className="flex-1 bg-white/20 dark:bg-white/10 border-none rounded-lg px-4 py-2.5 text-white placeholder-gray-300 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-all"
                />
                <button 
                    type="submit"
                    className="bg-gradient-to-r from-purple-500 to-cyan-500 dark:from-purple-600 dark:to-cyan-600 hover:from-purple-600 hover:to-cyan-600 dark:hover:from-purple-700 dark:hover:to-cyan-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-all hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                >
                    Search
                </button>
            </div>
        </form>
    );
}

export default SearchBar;