import { createContext, useContext } from 'react';
import { useFavorites } from '../hooks/useFavorites';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
    const favorites = useFavorites();

    return (
        <FavoritesContext.Provider value={favorites}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavoritesContext() {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavoritesContext must be used within a FavoritesProvider');
    }
    return context;
}

