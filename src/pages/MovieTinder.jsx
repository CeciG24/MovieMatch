import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "../index.css";
import { useFavorites } from '../context/FavoritesContext';

const API_KEY = import.meta.env.VITE_API_KEY;

const MovieTinder = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [likedMovies, setLikedMovies] = useState([]);
  const [dislikedMovies, setDislikedMovies] = useState([]);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showMatches, setShowMatches] = useState(false);
  
  const { addToFavorites, favorites } = useFavorites();
  const cardRef = useRef(null);
  const navigate = useNavigate();

  // Queries variados para obtener películas diversas
  const searchQueries = [
    "action", "comedy", "drama", "thriller", "horror",
    "romance", "adventure", "sci-fi", "fantasy", "animation",
    "star", "war", "love", "time", "life"
  ];

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const randomQuery = searchQueries[Math.floor(Math.random() * searchQueries.length)];
      const randomPage = Math.floor(Math.random() * 5) + 1;
      
      const response = await fetch(
        `https://www.omdbapi.com/?s=${randomQuery}&type=movie&page=${randomPage}&apikey=${API_KEY}`
      );
      const data = await response.json();
      
      if (data.Response === "True") {
        // Obtener detalles completos de cada película
        const detailedMovies = await Promise.all(
          data.Search.slice(0, 10).map(async (movie) => {
            const detailResponse = await fetch(
              `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`
            );
            return await detailResponse.json();
          })
        );
        
        setMovies(detailedMovies.filter(m => m.Poster !== "N/A"));
      }
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSwipe = (direction) => {
    if (currentIndex >= movies.length) return;
    
    const currentMovie = movies[currentIndex];
    setSwipeDirection(direction);
    
    setTimeout(() => {
      if (direction === "right") {
        setLikedMovies([...likedMovies, currentMovie]);
        // Agregar a favoritos aquí
        addToFavorites({
          id: currentMovie.imdbID,
          title: currentMovie.Title,
          poster: currentMovie.Poster,
          year: currentMovie.Year,
          type: currentMovie.Type
        });
      } else {
        setDislikedMovies([...dislikedMovies, currentMovie]);
      }
      
      setCurrentIndex(currentIndex + 1);
      setSwipeDirection(null);
      
      // Cargar más películas si quedan pocas
      if (currentIndex >= movies.length - 3) {
        fetchMovies();
      }
    }, 300);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragOffset({ x: 0, y: 0 });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const newOffset = {
      x: e.movementX + dragOffset.x,
      y: e.movementY + dragOffset.y
    };
    
    setDragOffset(newOffset);
    
    // Determinar dirección basado en el drag
    if (Math.abs(newOffset.x) > 50) {
      if (newOffset.x > 0) {
        setSwipeDirection("right");
      } else {
        setSwipeDirection("left");
      }
    } else {
      setSwipeDirection(null);
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // Si el drag fue suficiente, hacer swipe
    if (Math.abs(dragOffset.x) > 100) {
      handleSwipe(dragOffset.x > 0 ? "right" : "left");
    }
    
    setDragOffset({ x: 0, y: 0 });
    setSwipeDirection(null);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setLikedMovies([]);
    setDislikedMovies([]);
    fetchMovies();
  };

  const currentMovie = movies[currentIndex];

  if (loading && movies.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white text-xl">Cargando películas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            🎬 Movie Tinder
          </h1>
          <p className="text-gray-400 text-lg mb-6">
            Desliza para descubrir tu próxima película favorita
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-6 mb-6">
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg px-6 py-3">
              <div className="text-2xl font-bold text-red-400">{dislikedMovies.length}</div>
              <div className="text-sm text-gray-400">❌ Nope</div>
            </div>
            <div className="bg-green-500/20 border border-green-500/50 rounded-lg px-6 py-3">
              <div className="text-2xl font-bold text-green-400">{likedMovies.length}</div>
              <div className="text-sm text-gray-400">❤️ Like</div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setShowMatches(!showMatches)}
              className="bg-purple-500/30 hover:bg-purple-500/50 border border-purple-500 px-4 py-2 rounded-lg text-white transition"
            >
              Ver Likes ({likedMovies.length})
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-white transition"
            >
              Reiniciar
            </button>
          </div>
        </div>

        {/* Matches modal */}
        {showMatches && likedMovies.length > 0 && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-gradient-to-b from-purple-900/90 to-black/90 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-white">❤️ Tus Likes</h2>
                <button
                  onClick={() => setShowMatches(false)}
                  className="text-white hover:text-red-400 text-3xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {likedMovies.map((movie) => (
                  <div
                    key={movie.imdbID}
                    className="group cursor-pointer"
                    onClick={() => {
                      setShowMatches(false);
                      navigate(`/movie/${movie.imdbID}`);
                    }}
                  >
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      className="w-full h-64 object-cover rounded-lg group-hover:scale-105 transition-transform"
                    />
                    <p className="text-white text-sm mt-2 font-medium line-clamp-2">
                      {movie.Title}
                    </p>
                    <p className="text-gray-400 text-xs">{movie.Year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Card stack */}
        <div className="relative h-[600px] flex items-center justify-center">
          {currentIndex >= movies.length ? (
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-white mb-4">
                ¡Has visto todas las películas!
              </h2>
              <p className="text-gray-400 mb-6">
                Tienes {likedMovies.length} películas en tu lista de favoritos
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleReset}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-3 rounded-lg text-white font-semibold transition"
                >
                  Cargar más películas
                </button>
                <button
                  onClick={() => setShowMatches(true)}
                  className="bg-green-500/30 border border-green-500 hover:bg-green-500/50 px-6 py-3 rounded-lg text-white font-semibold transition"
                >
                  Ver mis Likes
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Preview cards (stack effect) */}
              {movies.slice(currentIndex + 1, currentIndex + 3).map((movie, index) => (
                <div
                  key={movie.imdbID}
                  className="absolute w-full max-w-md"
                  style={{
                    transform: `scale(${1 - (index + 1) * 0.05}) translateY(${(index + 1) * 10}px)`,
                    zIndex: 10 - index,
                    opacity: 0.5 - index * 0.2
                  }}
                >
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      className="w-full h-[500px] object-cover"
                    />
                  </div>
                </div>
              ))}

              {/* Current card */}
              <div
                ref={cardRef}
                className="absolute w-full max-w-md cursor-grab active:cursor-grabbing"
                style={{
                  transform: `translateX(${dragOffset.x}px) translateY(${dragOffset.y}px) rotate(${dragOffset.x * 0.1}deg)`,
                  zIndex: 20,
                  transition: isDragging ? "none" : "transform 0.3s ease-out"
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <div className="bg-gradient-to-b from-purple-900/30 to-black/60 backdrop-blur-xl rounded-2xl overflow-hidden border-2 border-white/30 shadow-2xl relative">
                  {/* Swipe indicators */}
                  {swipeDirection === "right" && (
                    <div className="absolute top-8 left-8 bg-green-500 text-white px-6 py-3 rounded-xl font-bold text-2xl rotate-[-20deg] z-30 border-4 border-green-400">
                      ❤️ LIKE
                    </div>
                  )}
                  {swipeDirection === "left" && (
                    <div className="absolute top-8 right-8 bg-red-500 text-white px-6 py-3 rounded-xl font-bold text-2xl rotate-[20deg] z-30 border-4 border-red-400">
                      ❌ NOPE
                    </div>
                  )}

                  {/* Movie poster */}
                  <img
                    src={currentMovie.Poster}
                    alt={currentMovie.Title}
                    className="w-full h-[500px] object-cover"
                    draggable="false"
                  />

                  {/* Movie info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6">
                    <h2 className="text-white text-2xl font-bold mb-2">
                      {currentMovie.Title}
                    </h2>
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-gray-300">{currentMovie.Year}</span>
                      {currentMovie.imdbRating && currentMovie.imdbRating !== "N/A" && (
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400">⭐</span>
                          <span className="text-white font-semibold">
                            {currentMovie.imdbRating}
                          </span>
                        </div>
                      )}
                      <span className="text-gray-400">{currentMovie.Runtime}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {currentMovie.Genre && currentMovie.Genre.split(", ").map((genre, i) => (
                        <span
                          key={i}
                          className="bg-purple-500/30 border border-purple-500/50 px-2 py-1 rounded-full text-xs text-white"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-300 text-sm line-clamp-3">
                      {currentMovie.Plot}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Action buttons */}
        {currentIndex < movies.length && (
          <div className="flex justify-center gap-6 mt-8">
            <button
              onClick={() => handleSwipe("left")}
              className="w-16 h-16 bg-red-500/20 hover:bg-red-500/40 border-2 border-red-500 rounded-full flex items-center justify-center text-3xl hover:scale-110 active:scale-95 transition-all"
            >
              ❌
            </button>
            <button
              onClick={() => navigate(`/movie/${currentMovie.imdbID}`)}
              className="w-16 h-16 bg-blue-500/20 hover:bg-blue-500/40 border-2 border-blue-500 rounded-full flex items-center justify-center text-2xl hover:scale-110 active:scale-95 transition-all"
            >
              ℹ️
            </button>
            <button
              onClick={() => handleSwipe("right")}
              className="w-16 h-16 bg-green-500/20 hover:bg-green-500/40 border-2 border-green-500 rounded-full flex items-center justify-center text-3xl hover:scale-110 active:scale-95 transition-all"
            >
              ❤️
            </button>
          </div>
        )}

        {/* Instructions */}
        <div className="text-center mt-8 text-gray-400 text-sm">
          <p>💡 Arrastra la tarjeta o usa los botones para decidir</p>
          <p>← Desliza izquierda para rechazar | Desliza derecha para like →</p>
        </div>
      </div>
    </div>
  );
};

export default MovieTinder;
