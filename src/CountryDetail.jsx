import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useFavoritesContext } from './context/FavoritesContext'
import { formatNumberWithCommas } from './utils/formatters'
import './CountryDetail.css'

function CountryDetail() {
    const { code } = useParams();
    const navigate = useNavigate();
    const { toggleFavorite, isFavorite } = useFavoritesContext();
    const favorited = isFavorite(code);
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCountryDetails() {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://restcountries.com/v3.1/alpha/${code}`
                );
                
                if (!response.ok) {
                    throw new Error('Failed to fetch country details');
                }
                
                const data = await response.json();
                setCountry(data[0]);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchCountryDetails();
    }, [code]);

    if (loading) {
        return <div className="country-detail-container">Loading country details...</div>;
    }

    if (error) {
        return (
            <div className="country-detail-container">
                <div className="error-message">Error: {error}</div>
                <button onClick={() => navigate('/')} className="back-button">
                    ← Back to Countries
                </button>
            </div>
        );
    }

    if (!country) {
        return <div className="country-detail-container">Country not found</div>;
    }

    return (
        <div className="country-detail-container">
            <div className="detail-actions">
                <button onClick={() => navigate('/')} className="back-button">
                    ← Back to Countries
                </button>
                <button 
                    onClick={() => toggleFavorite(code)} 
                    className={`favorite-detail-button ${favorited ? 'favorited' : ''}`}
                    aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
                >
                    <span className="favorite-icon">{favorited ? '★' : '☆'}</span>
                    <span className="favorite-text">{favorited ? 'Remove from Favorites' : 'Add to Favorites'}</span>
                </button>
            </div>

            <div className="country-detail">
                <div className="country-detail-header">
                    <div className="country-detail-flag">{country.flag}</div>
                    <h1 className="country-detail-name">{country.name.common}</h1>
                    {country.name.official !== country.name.common && (
                        <p className="country-detail-official">({country.name.official})</p>
                    )}
                    {country.name.nativeName && (
                        <p className="country-detail-native">
                            Native: {Object.values(country.name.nativeName).map(n => n.common).join(', ')}
                        </p>
                    )}
                </div>

                <div className="country-detail-content">
                    <div className="detail-section">
                        <h2>General Information</h2>
                        <div className="detail-grid">
                            <div className="detail-item">
                                <span className="detail-label">Region:</span>
                                <span className="detail-value">{country.region || 'N/A'}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Subregion:</span>
                                <span className="detail-value">{country.subregion || 'N/A'}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Capital:</span>
                                <span className="detail-value">
                                    {country.capital ? country.capital.join(', ') : 'N/A'}
                                </span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Population:</span>
                                <span className="detail-value">
                                    {formatNumberWithCommas(country.population)}
                                </span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Area:</span>
                                <span className="detail-value">
                                    {formatNumberWithCommas(country.area)} km²
                                </span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Timezones:</span>
                                <span className="detail-value">
                                    {country.timezones ? country.timezones.join(', ') : 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="detail-section">
                        <h2>Languages & Currencies</h2>
                        <div className="detail-grid">
                            <div className="detail-item">
                                <span className="detail-label">Native Name:</span>
                                <span className="detail-value">
                                    {country.name.nativeName 
                                        ? Object.values(country.name.nativeName).map(n => n.common).join(', ')
                                        : 'N/A'}
                                </span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Languages:</span>
                                <span className="detail-value">
                                    {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}
                                </span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Currencies:</span>
                                <span className="detail-value">
                                    {country.currencies 
                                        ? Object.values(country.currencies)
                                            .map(curr => `${curr.name} (${curr.symbol})`)
                                            .join(', ')
                                        : 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="detail-section">
                        <h2>Bordering Countries</h2>
                        {country.borders && country.borders.length > 0 ? (
                            <div className="border-countries">
                                {country.borders.map((border) => (
                                    <button
                                        key={border}
                                        className="border-country-button"
                                        onClick={() => navigate(`/country/${border}`)}
                                    >
                                        {border}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <p className="no-borders">No bordering countries (island nation or territory)</p>
                        )}
                    </div>

                    <div className="detail-section">
                        <h2>Other Details</h2>
                        <div className="detail-grid">
                            {country.continents && (
                                <div className="detail-item">
                                    <span className="detail-label">Continents:</span>
                                    <span className="detail-value">{country.continents.join(', ')}</span>
                                </div>
                            )}
                            <div className="detail-item">
                                <span className="detail-label">Country Codes:</span>
                                <span className="detail-value">
                                    {country.cca2} / {country.cca3} / {country.ccn3}
                                </span>
                            </div>
                            {country.tld && (
                                <div className="detail-item">
                                    <span className="detail-label">Top Level Domain:</span>
                                    <span className="detail-value">{country.tld.join(', ')}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {country.flags && (
                        <div className="detail-section">
                            <h2>Flag</h2>
                            <img 
                                src={country.flags.svg || country.flags.png} 
                                alt={`Flag of ${country.name.common}`}
                                className="country-flag-image"
                            />
                        </div>
                    )}

                    {country.coatOfArms && country.coatOfArms.svg && (
                        <div className="detail-section">
                            <h2>Coat of Arms</h2>
                            <img 
                                src={country.coatOfArms.svg || country.coatOfArms.png} 
                                alt={`Coat of Arms of ${country.name.common}`}
                                className="country-coat-of-arms-image"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CountryDetail;

