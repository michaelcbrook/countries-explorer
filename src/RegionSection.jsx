import { useState } from 'react'
import CountryCard from './CountryCard'
import './RegionSection.css'

function RegionSection({ region, countries }) {
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const handleKeyDown = (e) => {
        // Toggle on Enter or Space key
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleExpanded();
        }
    };

    return (
        <div className="region-section">
            <div 
                className="region-header" 
                onClick={toggleExpanded}
                onKeyDown={handleKeyDown}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                aria-controls={`region-${region}-content`}
                aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${region} region`}
            >
                <h2 className="region-title">
                    <span className={`region-arrow ${isExpanded ? 'expanded' : ''}`}>▶</span>
                    {region}
                    <span className="region-count">({countries.length})</span>
                </h2>
            </div>
            
            {isExpanded && (
                <div 
                    className="region-countries"
                    id={`region-${region}-content`}
                    role="region"
                    aria-label={`${region} countries`}
                >
                    {countries.map((country, index) => (
                        <CountryCard key={index} country={country} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default RegionSection;

