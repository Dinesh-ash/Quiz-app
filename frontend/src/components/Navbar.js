import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={{ backgroundColor: '#121212', padding: '10px 0', textAlign: 'center' }}>
            <Link to="/" style={{ margin: '0 15px', textDecoration: 'none', color: '#ffcc00' }}>
                Home
            </Link>
            <Link to="/register" style={{ margin: '0 15px', textDecoration: 'none', color: '#ffcc00' }}>
                Register
            </Link>
            <Link to="/login" style={{ margin: '0 15px', textDecoration: 'none', color: '#ffcc00' }}>
                Login
            </Link>
            <Link to="/quiz" style={{ margin: '0 15px', textDecoration: 'none', color: '#ffcc00' }}>
                Quiz
            </Link>
        </nav>
    );
};

export default Navbar;
