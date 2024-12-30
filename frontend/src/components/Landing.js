import React from 'react';
import './Landing.css'; // Import custom styles for the landing page

const Landing = () => {
    return (
        <div className="landing-container">
            <div className="overlay"></div> {/* Overlay for opacity */}
            <div className="landing-content">
                <h1>Welcome to the Quiz App</h1>
                <p>Test your knowledge and improve your skills.</p>
                <button
                    className="landing-button"
                    onClick={() => (window.location.href = '/register')}
                >
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default Landing;
