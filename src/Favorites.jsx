import { useState, useEffect, useMemo } from 'react';
import { useFavoritesContext } from './context/FavoritesContext';
import { useSearchContext } from './context/SearchContext';
import SearchBar from './components/SearchBar';
import CountryCard from './CountryCard';
import './Favorites.css';

function Favorites() {
    const { favorites, clearFavorites } = useFavoritesContext();
    const { searchQuery } = useSearchContext();
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (favorites.length === 0) {
            setLoading(false);
            setCountries([]);
            return;
        }

        async function fetchFavoriteCountries() {
            try {
                setLoading(true);
                
                // Fetch all favorite countries in a single request
                const codes = favorites.join(',');
                const response = await fetch(
                    `https://restcountries.com/v3.1/alpha?codes=${codes}&fields=name,flag,population,region,capital,cca3`
                );
                
                if (!response.ok) {
                    throw new Error('Failed to fetch favorite countries');
                }
                
                const data = await response.json();
                
                // Format countries
                const formattedCountries = data.map(country => ({
                    name: country.name,
                    flag: country.flag,
                    region: country.region,
                    capitals: country.capital || [],
                    population: country.population,
                    code: country.cca3
                }));
                
                setCountries(formattedCountries);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchFavoriteCountries();
    }, [favorites]);

    // Filter countries based on search query (must be before conditional returns)
    const filteredCountries = useMemo(() => {
        if (!searchQuery.trim()) {
            return countries;
        }

        const query = searchQuery.toLowerCase();
        return countries.filter(country =>
            country.name.common.toLowerCase().includes(query) ||
            country.name.official.toLowerCase().includes(query) ||
            country.region.toLowerCase().includes(query) ||
            (country.capitals && country.capitals.some(cap => cap.toLowerCase().includes(query)))
        );
    }, [countries, searchQuery]);

    if (loading) {
        return (
            <div className="favorites-container">
                <div className="favorites-header">
                    <h2>Favorite Countries</h2>
                </div>
                <div className="favorites-content">
                    Loading favorite countries...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="favorites-container">
                <div className="favorites-header">
                    <h2>Favorite Countries</h2>
                </div>
                <div className="favorites-content">
                    <div className="error-message">Error: {error}</div>
                </div>
            </div>
        );
    }

    if (countries.length === 0) {
        return (
            <div className="favorites-container">
                <div className="favorites-header">
                    <h2>Favorite Countries</h2>
                </div>
                <div className="favorites-content">
                    <div className="empty-favorites">
                        <p className="empty-icon">⭐</p>
                        <p className="empty-message">You haven't favorited any countries yet.</p>
                        <p className="empty-hint">Click the star icon on any country to add it to your favorites!</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="favorites-container">
            <div className="favorites-title-row">
                <h2>Favorite Countries ({filteredCountries.length})</h2>
                <button 
                    className="clear-favorites-button"
                    onClick={clearFavorites}
                    aria-label="Clear all favorites"
                >
                    Clear All
                </button>
            </div>
            <div className="favorites-search">
                <SearchBar />
            </div>
            {filteredCountries.length === 0 ? (
                <div className="favorites-content">
                    <div className="no-results">
                        <p>No favorites found matching "{searchQuery}"</p>
                    </div>
                </div>
            ) : (
                <div className="favorites-grid">
                    {filteredCountries.map((country) => (
                        <CountryCard key={country.code} country={country} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Favorites;

