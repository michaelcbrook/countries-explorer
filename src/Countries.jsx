import { useState, useEffect } from 'react'
import './Countries.css'
import { Countries as CountriesApi } from '@yusifaliyevpro/countries';

function Countries() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all countries with specific fields
        async function fetchCountries() {
            try {
                setLoading(true);
                const data = await CountriesApi.getCountries({
                    fields: ["name", "capital"],
                });
                setCountries(data);
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
