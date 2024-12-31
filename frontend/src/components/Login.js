import React, { useState, useEffect } from 'react';  // Import useEffect
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Optional: Add custom styles for the login form

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);  // State to track form validity

    const navigate = useNavigate();  // Use navigate hook for redirection

    // Function to handle input change and enable/disable the Quiz button
    const handleInputChange = () => {
        // Enable the button if both email and password are entered
        if (email && password) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    };

    useEffect(() => {
        handleInputChange(); // Call the function to check if form is valid on initial load or when email/password changes
    }, [email, password]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
    
        // Ensure email and password are provided
        if (!email || !password) {
            setMessage('Please enter both email and password');
            setLoading(false);
            return;
        }
    
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
    
            // Store token in localStorage
            localStorage.setItem('token', res.data.token);
    
            setMessage('Login Successful!');
            navigate('/quiz');  // Redirect to the quiz page
        } catch (err) {
            // Show detailed error message from backend
            setMessage(err.response?.data?.message || 'Login failed!');
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="login-container">
            <div className="login-form">
                <h2 className="login-header">Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="login-input"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="login-input"
                    />
                    <button type="submit" className="login-btn" disabled={!isFormValid || loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    {message && <p className="login-message">{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;
