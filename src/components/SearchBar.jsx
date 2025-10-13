import { useSearchContext } from '../context/SearchContext';
import './SearchBar.css';

function SearchBar() {
    const { searchQuery, setSearchQuery } = useSearchContext();

    return (
        <div className="search-bar">
            <input
                type="text"
                className="search-input"
                placeholder="Search countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search countries"
            />
            {searchQuery && (
                <button
                    className="search-clear"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                >
                    ✕
                </button>
            )}
        </div>
    );
}

export default SearchBar;

