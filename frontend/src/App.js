import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Quiz from './components/Quiz';
import Landing from './components/Landing';
import Navbar from './components/Navbar'; // Import the Navbar component

function App() {
    const location = useLocation(); // Hook to get current location

    // Conditionally render Navbar based on the current route
    const showNavbar = location.pathname !== '/quiz';

    return (
        <div>
            {showNavbar && <Navbar />} {/* Only show Navbar if not on /quiz */}
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/quiz" element={<Quiz />} />
            </Routes>
        </div>
    );
}

export default function AppWrapper() {
    return (
        <Router>  {/* Wrapping the App component in Router */}
            <App />
        </Router>
    );
}
