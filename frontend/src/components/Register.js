import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Add custom styles for the register page

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', { email, password });
            setMessage(res.data.message);
        } catch (err) {
            setMessage(err.response?.data?.message || 'Error registering user');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <h2 className="register-header">Register</h2>
                <form onSubmit={handleRegister}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="register-input"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="register-input"
                    />
                    <button type="submit" className="register-btn" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                    {message && <p className="register-message">{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default Register;
