// frontend/src/components/AdminDashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation

const AdminDashboard = () => {
    const [scores, setScores] = useState([]);  // Store the scores
    const [loading, setLoading] = useState(true);  // Loading state
    const navigate = useNavigate();  // To navigate to other pages

    // Fetch scores from backend when component mounts
    useEffect(() => {
        const fetchScores = async () => {
            try {
                const token = localStorage.getItem('token'); // Get the token from localStorage
                if (!token) {
                    navigate('/login'); // Redirect to login if token doesn't exist
                    return;
                }

                const response = await axios.get('http://localhost:5000/api/score/admin/scores', {
                    headers: { Authorization: `Bearer ${token}` } // Send the token in the Authorization header
                });

                setScores(response.data); // Store the scores
                setLoading(false);
            } catch (err) {
                console.error('Error fetching scores:', err);
                setLoading(false);
                if (err.response && err.response.status === 403) {
                    navigate('/'); // Redirect to home if not an admin
                }
            }
        };

        fetchScores();
    }, [navigate]);

    // If data is still loading, show loading message
    if (loading) return <p>Loading scores...</p>;

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <h3>Quiz Scores</h3>
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Email</th>
                        <th>Score</th>
                        <th>Total Questions</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.map((score) => (
                        <tr key={score._id}>
                            <td>{score.userId._id}</td>
                            <td>{score.userId.email}</td>
                            <td>{score.score}</td>
                            <td>{score.totalQuestions}</td>
                            <td>{new Date(score.date).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
