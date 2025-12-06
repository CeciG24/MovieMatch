// src/context/FavoritesContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Cargar favoritos del localStorage al iniciar
  useEffect(() => {
    try {
      const stored = localStorage.getItem('movieFavorites');
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }, []);

  // Guardar favoritos en localStorage cada vez que cambien
  useEffect(() => {
    try {
      localStorage.setItem('movieFavorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }, [favorites]);

  // Agregar a favoritos
  const addToFavorites = (movie) => {
    setFavorites(prev => {
      // Evitar duplicados
      if (prev.some(fav => fav.id === movie.id)) {
        return prev;
      }
      return [...prev, { ...movie, addedAt: new Date().toISOString() }];
    });
  };

  // Eliminar de favoritos
  const removeFromFavorites = (movieId) => {
    setFavorites(prev => prev.filter(movie => movie.id !== movieId));
  };

  // Verificar si una película está en favoritos
  const isFavorite = (movieId) => {
    return favorites.some(movie => movie.id === movieId);
  };

  // Limpiar todos los favoritos
  const clearFavorites = () => {
    setFavorites([]);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    clearFavorites,
    favoritesCount: favorites.length
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};