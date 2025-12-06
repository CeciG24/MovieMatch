import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import "../App.css";
import "../index.css";

const API_KEY = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [filters, setFilters] = useState({ genre: "", year: "", type: "movie" });
  const [showFilteredResults, setShowFilteredResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch múltiples categorías
  const fetchMoviesByCategory = async (query, setter, type = "movie", year = "") => {
    try {
      let url = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&type=${type}&apikey=${API_KEY}`;
      if (year) {
        url += `&y=${year}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      if (data.Response === "True") {
        setter(data.Search.slice(0, 6));
      }
    } catch (err) {
      console.error(`Error fetching ${query}:`, err);
    }
  };

  const fetchAllMovies = async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchMoviesByCategory("movie", setTrendingMovies, "movie", "2025"),
        fetchMoviesByCategory("action", setActionMovies, "movie"),
        fetchMoviesByCategory("comedy", setComedyMovies, "movie"),
        fetchMoviesByCategory("game", setPopularSeries, "series"),
      ]);
    } catch (err) {
      setError("Error loading content");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllMovies();
  }, []);

  const applyFilters = async () => {
    const { genre, year, type } = filters;
    
    // Validación: al menos un filtro debe estar lleno
    if (!genre && !year) {
      alert("Por favor ingresa un género o año para filtrar");
      return;
    }

    // Determinar query de búsqueda
    let searchQuery = genre || (type === "series" ? "series" : "movie");

    try {
      setFilterLoading(true);
      setShowFilteredResults(true);
      
      // Construir URL con parámetros
      let url = `https://www.omdbapi.com/?s=${encodeURIComponent(searchQuery)}&type=${type}&apikey=${API_KEY}`;
      if (year) {
        url += `&y=${year}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      
      if (data.Response === "True") {
        setFilteredResults(data.Search);
        setError(null);
      } else {
        setFilteredResults([]);
        setError(`No se encontraron resultados para: ${searchQuery} ${year ? `(${year})` : ""}`);
      }
    } catch (err) {
      setError("Error al aplicar filtros");
      setFilteredResults([]);
    } finally {
      setFilterLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({ genre: "", year: "", type: "movie" });
    setShowFilteredResults(false);
    setFilteredResults([]);
    setError(null);
  };

  const MovieSection = ({ title, movies, emoji }) => (
    <section className="mb-12">
      <h2 className="text-white text-2xl font-bold mb-6 flex items-center gap-2">
        <span className="text-3xl">{emoji}</span>
        {title}
      </h2>
      {movies.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No hay resultados disponibles</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={{
                id: movie.imdbID,
                title: movie.Title,
                poster: movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg",
              }}
              onViewDetails={(id) => (window.location.href = `/movie/${id}`)}
              onAddToFavorites={(movie) => console.log("Favorite:", movie)}
            />
          ))}
        </div>
      )}
    </section>
  );

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section - Full width */}
      <section 
        className="relative h-screen flex items-center justify-center overflow-hidden mb-12 w-screen"
        style={{
          marginLeft: 'calc(-50vw + 50%)'
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-black/80 z-10"></div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Content */}
        <div className="relative z-20 text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Discover Your Next
            <span className="block bg-gradient-to-r from-purple-400 to-cyan-500 bg-clip-text text-transparent">
              Favorite Movie
            </span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Explore thousands of movies, save your favorites, and find your perfect match with Movie Tinder
          </p>
          
          {/* Search bar centrada */}
          <div className="max-w-2xl mx-auto mb-6">
            <SearchBar />
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎬</span>
              <span>Thousands of Movies</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <span>Top Rated</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              <span>Trending Now</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content sections */}
      <div className="px-6 pb-12 max-w-7xl mx-auto">
        {/* Filtros rápidos mejorados */}
        <div className="backdrop-blur-md bg-purple-900/20 border border-purple-500/30 rounded-xl p-6 mb-10 shadow-xl">
          <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
            <span>🔍</span>
            Filtros Rápidos
          </h3>
          
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex flex-col flex-1 min-w-[150px]">
              <label className="text-sm text-purple-200 mb-2 font-medium">Tipo</label>
              <select
                className="bg-black/40 backdrop-blur-md border border-purple-500/50 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                value={filters.type}
                onChange={(e) => setFilters(f => ({ ...f, type: e.target.value }))}
              >
                <option value="movie">🎬 Películas</option>
                <option value="series">📺 Series</option>
              </select>
            </div>

            <div className="flex flex-col flex-1 min-w-[200px]">
              <label className="text-sm text-purple-200 mb-2 font-medium">
                Género o Palabra Clave
              </label>
              <input
                className="bg-black/40 backdrop-blur-md border border-purple-500/50 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder="ej: action, comedy, star wars"
                value={filters.genre}
                onChange={(e) => setFilters(f => ({ ...f, genre: e.target.value }))}
              />
            </div>

            <div className="flex flex-col flex-1 min-w-[120px]">
              <label className="text-sm text-purple-200 mb-2 font-medium">Año</label>
              <input
                type="number"
                className="bg-black/40 backdrop-blur-md border border-purple-500/50 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder="ej: 2023"
                min="1900"
                max={new Date().getFullYear()}
                value={filters.year}
                onChange={(e) => setFilters(f => ({ ...f, year: e.target.value }))}
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={applyFilters}
                disabled={filterLoading}
                className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all px-6 py-2.5 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                {filterLoading ? "Buscando..." : "🔍 Buscar"}
              </button>

              {showFilteredResults && (
                <button
                  onClick={clearFilters}
                  className="bg-gray-700 hover:bg-gray-600 transition-all px-6 py-2.5 rounded-lg font-semibold text-white shadow-lg hover:scale-105 active:scale-95"
                >
                  ✖️ Limpiar
                </button>
              )}
            </div>
          </div>

          {/* Indicador de filtros activos */}
          {showFilteredResults && (
            <div className="mt-4 flex items-center gap-2 text-sm text-purple-200">
              <span className="font-semibold">Filtros activos:</span>
              <span className="bg-purple-500/30 px-3 py-1 rounded-full">
                {filters.type === "movie" ? "🎬 Películas" : "📺 Series"}
              </span>
              {filters.genre && (
                <span className="bg-purple-500/30 px-3 py-1 rounded-full">
                  {filters.genre}
                </span>
              )}
              {filters.year && (
                <span className="bg-purple-500/30 px-3 py-1 rounded-full">
                  {filters.year}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Loading spinner */}
        {(loading || filterLoading) && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
          </div>
        )}

        {/* Error message */}
        {error && !loading && !filterLoading && (
          <div className="text-center py-10 bg-red-900/20 border border-red-500/30 rounded-xl backdrop-blur-md">
            <p className="text-red-400 text-lg">⚠️ {error}</p>
          </div>
        )}

        {/* Resultados filtrados o contenido por defecto */}
        {!loading && !filterLoading && !error && (
          <>
            {showFilteredResults ? (
              <MovieSection 
                title={`Resultados para: ${filters.genre || filters.type} ${filters.year ? `(${filters.year})` : ""}`}
                movies={filteredResults} 
                emoji="🎯" 
              />
            ) : (
              <>
                <MovieSection title="Trending Now" movies={trendingMovies} emoji="🔥" />
                <MovieSection title="Action & Adventure" movies={actionMovies} emoji="💥" />
                <MovieSection title="Comedy Picks" movies={comedyMovies} emoji="😂" />
                <MovieSection title="Series Populares" movies={popularSeries} emoji="📺" />
              </>
            )}
          </>
        )}
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Home;