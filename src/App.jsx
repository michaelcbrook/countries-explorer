import { Routes, Route } from 'react-router'
import Countries from './Countries'
import CountryDetail from './CountryDetail'
import './App.css'

function App() {
    return (
        <>
            <h1>Countries Explorer</h1>
            <Routes>
                <Route path="/" element={<Countries />} />
                <Route path="/country/:code" element={<CountryDetail />} />
            </Routes>
        </>
    )
}

export default App
