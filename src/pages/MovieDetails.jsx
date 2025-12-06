import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_API_KEY;

function MovieDetails() {
    const { id } = useParams(); // Obtiene el movieId de la URL
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}&plot=full`
                );
                const data = await response.json();
                
                if (data.Response === "True") {
                    setMovie(data);
                    setError(null);
                } else {
                    setError(data.Error || "Movie not found");
                }
            } catch (err) {
                setError("Error loading movie details");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchMovieDetails();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center px-6">
                <div className="text-center">
                    <p className="text-red-400 text-xl mb-4">⚠️ {error}</p>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-purple-500 hover:bg-purple-600 px-6 py-2 rounded-lg text-white transition"
                    >
                        Volver al inicio
                    </button>
                </div>
            </div>
        );
    }

    if (!movie) return null;

    return (
        <div className="min-h-screen pt-24 pb-12 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 flex items-center gap-2 text-purple-400 hover:text-purple-300 transition"
                >
                    <span>←</span>
                    <span>Volver</span>
                </button>

                {/* Movie content */}
                <div className="grid md:grid-cols-[300px,1fr] gap-8">
                    {/* Poster */}
                    <div className="flex justify-center md:justify-start">
                        <img
                            src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
                            alt={movie.Title}
                            className="rounded-xl shadow-2xl w-full max-w-sm border border-white/20"
                        />
                    </div>

                    {/* Details */}
                    <div className="text-white space-y-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-2">
                                {movie.Title}
                            </h1>
                            <p className="text-gray-400 text-lg">
                                {movie.Year} • {movie.Runtime} • {movie.Rated}
                            </p>
                        </div>

                        {/* Rating */}
                        {movie.imdbRating && (
                            <div className="flex items-center gap-4">
                                <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg px-4 py-2">
                                    <span className="text-yellow-400 font-bold text-xl">
                                        ⭐ {movie.imdbRating}
                                    </span>
                                    <span className="text-gray-400 text-sm ml-2">
                                        / 10
                                    </span>
                                </div>
                                {movie.imdbVotes && (
                                    <span className="text-gray-400">
                                        {movie.imdbVotes} votes
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Genre */}
                        <div className="flex flex-wrap gap-2">
                            {movie.Genre.split(', ').map((genre, index) => (
                                <span
                                    key={index}
                                    className="bg-purple-500/30 border border-purple-500/50 px-3 py-1 rounded-full text-sm"
                                >
                                    {genre}
                                </span>
                            ))}
                        </div>

                        {/* Plot */}
                        <div>
                            <h2 className="text-2xl font-bold mb-3">Sinopsis</h2>
                            <p className="text-gray-300 leading-relaxed">
                                {movie.Plot}
                            </p>
                        </div>

                        {/* Additional info */}
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 space-y-3">
                            {movie.Director && movie.Director !== "N/A" && (
                                <div className="flex">
                                    <span className="text-gray-400 w-32">Director:</span>
                                    <span className="text-white font-medium">{movie.Director}</span>
                                </div>
                            )}
                            {movie.Actors && movie.Actors !== "N/A" && (
                                <div className="flex">
                                    <span className="text-gray-400 w-32">Actors:</span>
                                    <span className="text-white font-medium">{movie.Actors}</span>
                                </div>
                            )}
                            {movie.Writer && movie.Writer !== "N/A" && (
                                <div className="flex">
                                    <span className="text-gray-400 w-32">Writer:</span>
                                    <span className="text-white font-medium">{movie.Writer}</span>
                                </div>
                            )}
                            {movie.Language && movie.Language !== "N/A" && (
                                <div className="flex">
                                    <span className="text-gray-400 w-32">Language:</span>
                                    <span className="text-white font-medium">{movie.Language}</span>
                                </div>
                            )}
                            {movie.Country && movie.Country !== "N/A" && (
                                <div className="flex">
                                    <span className="text-gray-400 w-32">Country:</span>
                                    <span className="text-white font-medium">{movie.Country}</span>
                                </div>
                            )}
                            {movie.Awards && movie.Awards !== "N/A" && (
                                <div className="flex">
                                    <span className="text-gray-400 w-32">Awards:</span>
                                    <span className="text-white font-medium">{movie.Awards}</span>
                                </div>
                            )}
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-4 pt-4">
                            <button
                                onClick={() => console.log("Add to favorites:", movie)}
                                className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg"
                            >
                                ❤️ Add to Favorites
                            </button>
                            {movie.imdbID && (
                                <a
                                    href={`https://www.imdb.com/title/${movie.imdbID}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-yellow-500/20 border border-yellow-500/50 hover:bg-yellow-500/30 px-6 py-3 rounded-lg font-semibold text-center transition-all hover:scale-105 active:scale-95"
                                >
                                    View on IMDb
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetails;