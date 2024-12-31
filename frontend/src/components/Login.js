import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';  // Use named import

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            
            // Decode the token to check the role
            const decodedToken = jwtDecode(res.data.token);  // Decode the JWT token
            const role = decodedToken.role;

            // Store token in localStorage
            localStorage.setItem('token', res.data.token);

            setMessage('Login Successful!');
            
            // Navigate based on user role
            if (role === 'admin') {
                navigate('/admin-dashboard');  // Redirect to admin dashboard
            } else {
                navigate('/quiz');  // Redirect to quiz
            }
        } catch (err) {
            setMessage('Login failed!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email" 
                    required
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
