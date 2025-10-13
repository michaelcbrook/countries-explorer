import './CountryCard.css'

/**
 * Formats a number with commas as thousands separators
 * @param {number} num - The number to format
 * @returns {string} The formatted number string
 */
function formatNumberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function CountryCard({ country }) {
    return (
        <div className="country-card">
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

