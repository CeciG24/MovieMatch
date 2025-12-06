import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

const Favorites = () => {
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("recent");
  const [filterType, setFilterType] = useState("all");

  // Filtrar por tipo
  const filteredFavorites = favorites.filter(movie => {
    if (filterType === "all") return true;
    return movie.type?.toLowerCase() === filterType;
  });

  // Ordenar
  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.addedAt) - new Date(a.addedAt);
      case "title":
        return a.title.localeCompare(b.title);
      case "year":
        return (b.year || 0) - (a.year || 0);
      default:
        return 0;
    }
  });

  const handleRemove = (movieId) => {
    if (window.confirm("¿Seguro que quieres eliminar esta película de favoritos?")) {
      removeFromFavorites(movieId);
    }
  };

  const handleClearAll = () => {
    if (window.confirm(`¿Seguro que quieres eliminar todos los ${favorites.length} favoritos?`)) {
      clearFavorites();
    }
  };

  // Componente MovieCard para favoritos (con botón de eliminar)
  const FavoriteMovieCard = ({ movie }) => (
    <div className="group relative w-full rounded-xl overflow-hidden cursor-pointer flex flex-col
      bg-white/5 backdrop-blur-xl border border-white/20
      shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
      hover:shadow-[0_8px_32px_0_rgba(138,43,226,0.5)]
      hover:-translate-y-2 hover:border-purple-400/50
      transition-all duration-300"
    >
      {/* Delete button overlay */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleRemove(movie.id);
        }}
        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-30 font-bold"
        title="Eliminar de favoritos"
      >
        ✕
      </button>

      {/* Favorite indicator */}
      <div className="absolute top-2 left-2 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center z-20 shadow-lg">
        ❤️
      </div>

      {/* Imagen */}
      <div 
        className="w-full h-72 overflow-hidden relative"
        onClick={() => navigate(`/movie/${movie.id}`)}
      >
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      {/* Info */}
      <div className="p-4 text-center bg-black/40 backdrop-blur-lg relative z-20">
        <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2 leading-tight">
          {movie.title}
        </h3>
        
        {movie.year && (
          <p className="text-gray-400 text-xs mb-3">{movie.year}</p>
        )}

        {movie.addedAt && (
          <p className="text-gray-500 text-xs mb-3">
            Agregado: {new Date(movie.addedAt).toLocaleDateString()}
          </p>
        )}

        <button
          onClick={() => navigate(`/movie/${movie.id}`)}
          className="w-full px-3 py-2 text-xs rounded-lg font-medium
          bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20
          text-white transition-all duration-200 hover:scale-105 active:scale-95"
        >
          Ver detalles
        </button>
      </div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
          -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>
    </div>
  );

  // Vista de lista
  const MovieListItem = ({ movie }) => (
    <div className="flex gap-4 p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 transition-all group">
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-24 h-36 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform"
        onClick={() => navigate(`/movie/${movie.id}`)}
      />
      <div className="flex-1">
        <h3 className="text-white font-bold text-lg mb-1">{movie.title}</h3>
        <p className="text-gray-400 text-sm mb-2">{movie.year || "N/A"}</p>
        {movie.addedAt && (
          <p className="text-gray-500 text-xs mb-3">
            Agregado: {new Date(movie.addedAt).toLocaleDateString()}
          </p>
        )}
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="text-xs px-3 py-1.5 bg-purple-500/30 hover:bg-purple-500/50 rounded-lg text-white transition"
          >
            Ver detalles
          </button>
          <button
            onClick={() => handleRemove(movie.id)}
            className="text-xs px-3 py-1.5 bg-red-500/30 hover:bg-red-500/50 rounded-lg text-white transition"
          >
            ✕ Eliminar
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2 text-purple-400 hover:text-purple-300 transition"
          >
            <span>←</span>
            <span>Volver</span>
          </button>

          <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center gap-3">
                <span className="text-5xl">❤️</span>
                Mis Favoritos
              </h1>
              <p className="text-gray-400 text-lg">
                {favorites.length} {favorites.length === 1 ? "película guardada" : "películas guardadas"}
              </p>
            </div>

            {favorites.length > 0 && (
              <button
                onClick={handleClearAll}
                className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 px-5 py-2.5 rounded-lg text-white font-semibold transition hover:scale-105 active:scale-95"
              >
                🗑️ Limpiar todo
              </button>
            )}
          </div>
        </div>

        {/* Controls - Solo mostrar si hay favoritos */}
        {favorites.length > 0 && (
          <div className="bg-purple-900/20 backdrop-blur-md border border-purple-500/30 rounded-xl p-6 mb-8">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              {/* Filtros y ordenamiento */}
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex flex-col">
                  <label className="text-sm text-purple-200 mb-2 font-medium">Filtrar por tipo</label>
                  <select
                    className="bg-black/40 backdrop-blur-md border border-purple-500/50 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value="all">📚 Todos ({favorites.length})</option>
                    <option value="movie">🎬 Películas</option>
                    <option value="series">📺 Series</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm text-purple-200 mb-2 font-medium">Ordenar por</label>
                  <select
                    className="bg-black/40 backdrop-blur-md border border-purple-500/50 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="recent">🕒 Más reciente</option>
                    <option value="title">🔤 Título (A-Z)</option>
                    <option value="year">📅 Año</option>
                  </select>
                </div>
              </div>

              {/* View mode toggle */}
              <div className="flex gap-2 bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-lg p-1.5">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-4 py-2 rounded-md transition font-medium ${
                    viewMode === "grid"
                      ? "bg-purple-500 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  ⊞ Grid
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-4 py-2 rounded-md transition font-medium ${
                    viewMode === "list"
                      ? "bg-purple-500 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  ☰ Lista
                </button>
              </div>
            </div>

            {/* Filtros activos indicator */}
            {(filterType !== "all" || sortBy !== "recent") && (
              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                <span className="text-purple-200 font-medium">Filtros activos:</span>
                {filterType !== "all" && (
                  <span className="bg-purple-500/30 px-3 py-1 rounded-full text-white">
                    {filterType === "movie" ? "🎬 Películas" : "📺 Series"}
                  </span>
                )}
                {sortBy !== "recent" && (
                  <span className="bg-purple-500/30 px-3 py-1 rounded-full text-white">
                    {sortBy === "title" ? "🔤 Por título" : "📅 Por año"}
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Empty state */}
        {favorites.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-8xl mb-6">💔</div>
            <h2 className="text-3xl font-bold text-white mb-3">
              No tienes favoritos aún
            </h2>
            <p className="text-gray-400 max-w-md text-lg mb-8">
              Explora películas y series, y agrégalas a tus favoritos para verlas aquí
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/")}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-3 rounded-lg text-white font-semibold transition hover:scale-105 active:scale-95 shadow-lg"
              >
                🎬 Explorar películas
              </button>
              <button
                onClick={() => navigate("/tinder")}
                className="bg-purple-500/30 hover:bg-purple-500/50 border border-purple-500 px-8 py-3 rounded-lg text-white font-semibold transition hover:scale-105 active:scale-95"
              >
                💘 Movie Tinder
              </button>
            </div>
          </div>
        )}

        {/* No results after filtering */}
        {favorites.length > 0 && sortedFavorites.length === 0 && (
          <div className="text-center py-20 bg-purple-900/20 border border-purple-500/30 rounded-xl backdrop-blur-md">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-white mb-2">
              No hay resultados con estos filtros
            </h2>
            <p className="text-gray-400 mb-6">
              Intenta cambiar los filtros para ver más contenido
            </p>
            <button
              onClick={() => {
                setFilterType("all");
                setSortBy("recent");
              }}
              className="bg-purple-500 hover:bg-purple-600 px-6 py-2 rounded-lg text-white transition"
            >
              Limpiar filtros
            </button>
          </div>
        )}

        {/* Grid view */}
        {viewMode === "grid" && sortedFavorites.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {sortedFavorites.map((movie) => (
              <FavoriteMovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

        {/* List view */}
        {viewMode === "list" && sortedFavorites.length > 0 && (
          <div className="space-y-4">
            {sortedFavorites.map((movie) => (
              <MovieListItem key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
