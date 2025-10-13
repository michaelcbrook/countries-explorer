import { useState, useEffect } from 'react'
import './Countries.css'

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
                    'https://restcountries.com/v3.1/all?fields=name,capital,population'
                );
                
                if (!response.ok) {
                    throw new Error('Failed to fetch countries');
                }
                
                const data = await response.json();
                
                // Transform the API response to match our component's expected format
                const formattedCountries = data.map(country => ({
                    name: country.name.common,
                    capital: country.capital ? country.capital[0] : 'N/A',
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
                        <h2>{country.name}</h2>
                        <p>{country.capital}</p>
                        <p>{country.population}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Countries
