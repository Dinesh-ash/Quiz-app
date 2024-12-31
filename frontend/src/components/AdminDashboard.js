import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScores = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get('http://localhost:5000/api/score/get-scores', {
                    headers: {
                        Authorization: `Bearer ${token}`  // Attach JWT token in the Authorization header
                    }
                });
                setScores(res.data);  // Set fetched scores
            } catch (err) {
                console.error("Error fetching scores:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchScores();
    }, []);

    if (loading) return <p>Loading scores...</p>;

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <h3>Scores</h3>
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Score</th>
                        <th>Total Questions</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.map((score) => (
                        <tr key={score._id}>
                            <td>{score.userId}</td>
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
