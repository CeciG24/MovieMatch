import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import "../App.css";
import "../index.css";

const API_KEY = import.meta.env.VITE_API_KEY;

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Obtener el query de la URL
  const query = searchParams.get("q") || "";

  useEffect(() => {
    const fetchSearchResults = async () => {
      // Si no hay query, no buscar
      if (!query.trim()) {
        setResults([]);
        setError(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${API_KEY}`
        );
        const data = await response.json();
        
        if (data.Response === "True") {
          setResults(data.Search);
          setError(null);
        } else {
          setResults([]);
          setError(data.Error || `No se encontraron resultados para "${query}"`);
        }
      } catch (err) {
        setError("Error al buscar películas");
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Search bar */}
        <div className="mb-8">
          <SearchBar />
        </div>

        {/* Header con query y resultados */}
        {query && (
          <div className="mb-8">
            <button
              onClick={() => navigate(-1)}
              className="mb-4 flex items-center gap-2 text-purple-400 hover:text-purple-300 transition"
            >
              <span>←</span>
              <span>Volver</span>
            </button>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Resultados de búsqueda
            </h1>
            <p className="text-gray-400 text-lg">
              Mostrando resultados para: <span className="text-purple-400 font-semibold">"{query}"</span>
            </p>
            {!loading && results.length > 0 && (
              <p className="text-gray-500 text-sm mt-1">
                {results.length} {results.length === 1 ? "resultado encontrado" : "resultados encontrados"}
              </p>
            )}
          </div>
        )}

        {/* Estado vacío inicial */}
        {!query && !loading && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Busca tu película favorita
            </h2>
            <p className="text-gray-400 max-w-md">
              Usa la barra de búsqueda para encontrar películas, series y más
            </p>
          </div>
        )}

        {/* Loading spinner */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
          </div>
        )}

        {/* Error message */}
        {error && !loading && (
          <div className="text-center py-10 bg-red-900/20 border border-red-500/30 rounded-xl backdrop-blur-md">
            <div className="text-5xl mb-4">😞</div>
            <p className="text-red-400 text-xl mb-4">⚠️ {error}</p>
            <p className="text-gray-400 mb-6">
              Intenta con otro término de búsqueda
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-purple-500 hover:bg-purple-600 px-6 py-2 rounded-lg text-white transition"
            >
              Volver al inicio
            </button>
          </div>
        )}

        {/* Resultados */}
        {!loading && !error && results.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {results.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={{
                  id: movie.imdbID,
                  title: movie.Title,
                  poster: movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg",
                }}
                onViewDetails={(id) => navigate(`/movie/${id}`)}
                onAddToFavorites={(movie) => console.log("Favorite:", movie)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;