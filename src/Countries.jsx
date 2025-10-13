import { useState, useEffect } from 'react'
import './Countries.css'

/**
 * Formats a number with commas as thousands separators
 * @param {number} num - The number to format
 * @returns {string} The formatted number string
 */
function formatNumberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function Countries() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all countries from REST Countries API
        async function fetchCountries() {
            try {
                setLoading(true);
                const response = await fetch(
                    'https://restcountries.com/v3.1/all?fields=name,flag,population,region,capital'
                );
                
                if (!response.ok) {
                    throw new Error('Failed to fetch countries');
                }
                
                const data = await response.json();

                console.log(data);
                
                // Transform the API response to match our component's expected format
                const formattedCountries = data.map(country => ({
                    // Object where name.common holds the common name of the country
                    name: country.name,
                    // The flag of the country as a string (special character)
                    flag: country.flag,
                    // The continent or region the country belongs to
                    region: country.region,
                    // Array of capital cities as strings. Some countries may have multiple
                    // capital cities. Some may not have any. So take that into account.
                    capitals: country.capital,
                    // The population of the country as a number
                    population: country.population
                }));
                
                setCountries(formattedCountries);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchCountries();
    }, []);

    if (loading) {
        return <div className="countries">Loading countries...</div>;
    }

    if (error) {
        return <div className="countries">Error: {error}</div>;
    }

    return (
        <div className="countries">
            <div className="countries-list">
                {countries.map((country, index) => (
                    <div key={index} className="country">
                        <div className="country-flag">
                            {country.flag}
                        </div>
                        <div className="country-details">
                            <div className="country-name">{country.name.common}</div>
                            <div className="country-region">Region: {country.region}</div>
                            <div className="country-capitals">
                                {country.capitals.length===0 ?
                                    'Capital: N/A'
                                : country.capitals.length > 1 ?
                                    `Capitals: ${country.capitals.join(', ')}`
                                :
                                    `Capital: ${country.capitals[0]}`
                                }
                            </div>
                            <div className="country-population">Population: {formatNumberWithCommas(country.population)}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Countries
