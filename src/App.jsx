import { Routes, Route, Link, useLocation } from 'react-router'
import { FavoritesProvider, useFavoritesContext } from './context/FavoritesContext'
import Countries from './Countries'
import CountryDetail from './CountryDetail'
import Favorites from './Favorites'
import './App.css'

function Navigation() {
    const { favoritesCount } = useFavoritesContext();
    const location = useLocation();

    return (
        <nav className="app-nav">
            <Link 
                to="/" 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                aria-label="All Countries"
            >
                <span className="nav-icon">🌐</span>
                <span className="nav-text">All Countries</span>
            </Link>
            <Link 
                to="/favorites" 
                className={`nav-link ${location.pathname === '/favorites' ? 'active' : ''}`}
                aria-label={`Favorites ${favoritesCount > 0 ? `(${favoritesCount})` : ''}`}
            >
                <span className="nav-icon">★</span>
                <span className="nav-text">Favorites {favoritesCount > 0 && `(${favoritesCount})`}</span>
            </Link>
        </nav>
    );
}

function AppContent() {
    return (
        <>
            <header className="app-header">
                <h1>Countries Explorer</h1>
                <Navigation />
            </header>
            <main className="app-main">
                <Routes>
                    <Route path="/" element={<Countries />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/country/:code" element={<CountryDetail />} />
                </Routes>
            </main>
        </>
    );
}

function App() {
    return (
        <FavoritesProvider>
            <AppContent />
        </FavoritesProvider>
    );
}

export default App
