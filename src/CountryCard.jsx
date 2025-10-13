import { useNavigate } from 'react-router'
import { useFavoritesContext } from './context/FavoritesContext'
import { formatNumberWithCommas } from './utils/formatters'
import './CountryCard.css'

function CountryCard({ country }) {
    const navigate = useNavigate();
    const { toggleFavorite, isFavorite } = useFavoritesContext();
    const favorited = isFavorite(country.code);

    const handleClick = () => {
        navigate(`/country/${country.code}`);
    };

    const handleKeyDown = (e) => {
        // Navigate on Enter or Space key
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navigate(`/country/${country.code}`);
        }
    };

    const handleFavoriteClick = (e) => {
        e.stopPropagation(); // Prevent card navigation
        toggleFavorite(country.code);
    };

    const handleFavoriteKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(country.code);
        }
    };

    return (
        <div 
            className="country-card" 
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label={`View details for ${country.name.common}`}
        >
            <button
                className={`favorite-button ${favorited ? 'favorited' : ''}`}
                onClick={handleFavoriteClick}
                onKeyDown={handleFavoriteKeyDown}
                aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
                title={favorited ? 'Remove from favorites' : 'Add to favorites'}
            >
                {favorited ? '★' : '☆'}
            </button>
            <div className="country-flag">
                {country.flag}
            </div>
            <div className="country-details">
                <div className="country-name">{country.name.common}</div>
                {/* I removed the region from the UI because it's now redundant */}
                {/* <div className="country-region">Region: {country.region}</div> */}
                <div className="country-capitals">
                    {country.capitals.length === 0 ?
                        'Capital: N/A'
                    : country.capitals.length > 1 ?
                        `Capitals: ${country.capitals.join(', ')}`
                    :
                        `Capital: ${country.capitals[0]}`
                    }
                </div>
                <div className="country-population">
                    Population: {formatNumberWithCommas(country.population)}
                </div>
            </div>
        </div>
    );
}

export default CountryCard;

