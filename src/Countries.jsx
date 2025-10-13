import { useState, useEffect, useMemo } from 'react'
import { useSearchContext } from './context/SearchContext'
import SearchBar from './components/SearchBar'
import RegionSection from './RegionSection'
import './Countries.css'

function Countries() {
    const { searchQuery } = useSearchContext();
    const [countriesByRegion, setCountriesByRegion] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all countries from REST Countries API
        async function fetchCountries() {
            try {
                setLoading(true);
                const response = await fetch(
                    'https://restcountries.com/v3.1/all?fields=name,flag,population,region,capital,cca3'
                );
                
                if (!response.ok) {
                    throw new Error('Failed to fetch countries');
                }
                
                const data = await response.json();

                // Uncomment this to log the data to the console
                // console.log(data);
                
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
                    population: country.population,
                    // The 3-letter country code
                    code: country.cca3
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

    // Filter countries based on search query (must be before conditional returns)
    const filteredCountriesByRegion = useMemo(() => {
        if (!searchQuery.trim()) {
            return countriesByRegion;
        }

        const query = searchQuery.toLowerCase();
        const filtered = {};

        Object.keys(countriesByRegion).forEach(region => {
            const matchingCountries = countriesByRegion[region].filter(country =>
                country.name.common.toLowerCase().includes(query) ||
                country.name.official.toLowerCase().includes(query) ||
                country.region.toLowerCase().includes(query) ||
                (country.capitals && country.capitals.some(cap => cap.toLowerCase().includes(query)))
            );

            if (matchingCountries.length > 0) {
                filtered[region] = matchingCountries;
            }
        });

        return filtered;
    }, [countriesByRegion, searchQuery]);

    if (loading) {
        return <div className="countries">Loading countries...</div>;
    }

    if (error) {
        return <div className="countries">Error: {error}</div>;
    }

    // Sort regions alphabetically
    const sortedRegions = Object.keys(filteredCountriesByRegion).sort();

    return (
        <div className="countries">
            <div className="countries-header">
                <h2>All Countries</h2>
                <SearchBar />
            </div>
            {sortedRegions.length === 0 ? (
                <div className="no-results">
                    <p>No countries found matching "{searchQuery}"</p>
                </div>
            ) : (
                sortedRegions.map((region) => (
                    <RegionSection
                        key={region}
                        region={region}
                        countries={filteredCountriesByRegion[region]}
                    />
                ))
            )}
        </div>
    )
}

export default Countries
