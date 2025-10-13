import { useState } from 'react'
import CountryCard from './CountryCard'
import './RegionSection.css'

function RegionSection({ region, countries }) {
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="region-section">
            <div className="region-header" onClick={toggleExpanded}>
                <h2 className="region-title">
                    <span className={`region-arrow ${isExpanded ? 'expanded' : ''}`}>▶</span>
                    {region}
                    <span className="region-count">({countries.length})</span>
                </h2>
            </div>
            
            {isExpanded && (
                <div className="region-countries">
                    {countries.map((country, index) => (
                        <CountryCard key={index} country={country} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default RegionSection;

