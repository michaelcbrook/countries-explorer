import { useNavigate } from 'react-router'
import { formatNumberWithCommas } from './utils/formatters'
import './CountryCard.css'

function CountryCard({ country }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/country/${country.code}`);
    };

    return (
        <div className="country-card" onClick={handleClick}>
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

