import React from "react";
import { useFavorites } from "../context/FavoritesContext";

const MovieCard = ({ movie, onViewDetails }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const isInFavorites = isFavorite(movie.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isInFavorites) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <div
      className="group w-48 rounded-xl overflow-hidden cursor-pointer flex flex-col
      bg-white/5 dark:bg-white/5 backdrop-blur-xl 
      border border-white/20 dark:border-white/10
      shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
      hover:shadow-[0_8px_32px_0_rgba(138,43,226,0.5)]
      hover:-translate-y-2 hover:border-purple-400/50
      transition-all duration-300 relative"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-cyan-500/0 
        group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-cyan-500/10 
        transition-all duration-300 rounded-xl pointer-events-none z-10"></div>

      {/* Favorite indicator */}
      {isInFavorites && (
        <div className="absolute top-2 left-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center z-20 shadow-lg">
          ❤️
        </div>
      )}

      {/* Imagen */}
      <div className="w-full h-72 overflow-hidden relative">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      {/* Info con glassmorphism más pronunciado */}
      <div className="p-4 text-center bg-black/40 dark:bg-black/60 backdrop-blur-lg relative z-20">
        <h3 className="text-white font-semibold text-sm mb-3 line-clamp-2 leading-tight">
          {movie.title}
        </h3>

        {/* Acciones */}
        <div className="flex justify-between gap-2">
          <button
            onClick={() => onViewDetails(movie.id)}
            className="flex-1 px-3 py-2 text-xs rounded-lg font-medium
            bg-white/10 hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/15
            backdrop-blur-md border border-white/20
            text-white transition-all duration-200
            hover:scale-105 active:scale-95"
          >
            Details
          </button>

          <button
            onClick={handleFavoriteClick}
            className={`flex-1 px-3 py-2 text-xs rounded-lg font-medium
            backdrop-blur-md transition-all duration-200
            hover:scale-105 active:scale-95
            shadow-lg ${
              isInFavorites
                ? "bg-gradient-to-r from-red-600/90 to-pink-600/90 hover:from-red-700/90 hover:to-pink-700/90 border border-red-400/50 shadow-red-500/30"
                : "bg-gradient-to-r from-red-500/70 to-pink-500/70 hover:from-red-500/90 hover:to-pink-500/90 border border-red-400/30 shadow-red-500/20"
            }`}
          >
            {isInFavorites ? "❤️ Saved" : "❤️ Save"}
          </button>
        </div>
      </div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
          -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>
    </div>
  );
};

export default MovieCard;