import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Quiz from './components/Quiz';
import Landing from './components/Landing';
import Navbar from './components/Navbar'; // Import the Navbar component
import AdminDashboard from './components/AdminDashboard';  // Import the AdminDashboard component
import { jwtDecode } from 'jwt-decode'; // Use named import for jwtDecode

// Function to check if the user is admin
const checkIfAdmin = () => {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = jwtDecode(token);  // Decode token to get role
        return decodedToken.role === 'admin';  // Check if the role is 'admin'
    }
    return false;  // If no token, user is not admin
};

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
                
                {/* Protect the admin dashboard route and make sure only admin can access */}
                <Route 
                    path="/admin-dashboard" 
                    element={checkIfAdmin() ? <AdminDashboard /> : <Navigate to="/" />}
                />
                
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
