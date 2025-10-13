import { useState, useEffect } from 'react'
import RegionSection from './RegionSection'
import './Countries.css'

function Countries() {
    const [countriesByRegion, setCountriesByRegion] = useState({});
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
                    capitals: country.capital || [],
                    // The population of the country as a number
                    population: country.population
                }));
                
                // Group countries by region
                const grouped = formattedCountries.reduce((acc, country) => {
                    const region = country.region || 'Other';
                    if (!acc[region]) {
                        acc[region] = [];
                    }
                    acc[region].push(country);
                    return acc;
                }, {});
                
                // Sort countries within each region alphabetically by name
                Object.keys(grouped).forEach(region => {
                    grouped[region].sort((a, b) => 
                        a.name.common.localeCompare(b.name.common)
                    );
                });
                
                setCountriesByRegion(grouped);
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

    // Sort regions alphabetically
    const sortedRegions = Object.keys(countriesByRegion).sort();

    return (
        <div className="countries">
            {sortedRegions.map((region) => (
                <RegionSection
                    key={region}
                    region={region}
                    countries={countriesByRegion[region]}
                />
            ))}
        </div>
    )
}

export default Countries
