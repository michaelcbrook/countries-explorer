import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'countries-favorites';

/**
 * Custom hook to manage favorite countries with localStorage persistence
 */
export function useFavorites() {
    const [favorites, setFavorites] = useState(() => {
        // Initialize from localStorage
        try {
            const stored = localStorage.getItem(FAVORITES_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading favorites from localStorage:', error);
            return [];
        }
    });

    // Persist to localStorage whenever favorites change
    useEffect(() => {
        try {
            localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
        } catch (error) {
            console.error('Error saving favorites to localStorage:', error);
        }
    }, [favorites]);

    const toggleFavorite = (countryCode) => {
        setFavorites(prev => {
            if (prev.includes(countryCode)) {
                // Remove from favorites
                return prev.filter(code => code !== countryCode);
            } else {
                // Add to favorites
                return [...prev, countryCode];
            }
        });
    };

    const isFavorite = (countryCode) => {
        return favorites.includes(countryCode);
    };

    const clearFavorites = () => {
        setFavorites([]);
    };

    return {
        favorites,
        toggleFavorite,
        isFavorite,
        clearFavorites,
        favoritesCount: favorites.length
    };
}

