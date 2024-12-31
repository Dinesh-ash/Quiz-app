const express = require('express');
const router = express.Router();
const Score = require('../models/Score');
const verifyAdmin = require('../middleware/verifyAdmin');  // Import middleware
const jwt = require('jsonwebtoken');

// GET route to fetch all quiz scores (only for admin)
router.get('/admin/scores', verifyAdmin, async (req, res) => {
    try {
        const scores = await Score.find().populate('userId', 'email');  // Fetch scores and user info
        console.log("Fetched Scores:", scores); // Debugging scores
        res.status(200).json(scores);  // Return scores as JSON
    } catch (err) {
        console.error("Error retrieving scores:", err);  // Debugging error
        res.status(500).json({ message: 'Error retrieving scores', error: err });
    }
});

// POST route to save score
router.post('/save-score', async (req, res) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract token
    if (!token) {
        return res.status(401).json({ message: 'Token missing!' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode token
        const userId = decoded.userId;

        if (!userId) {
            return res.status(400).json({ message: 'Invalid token payload!' });
        }

        const { score, totalQuestions } = req.body;

        // Create and save score
        const newScore = new Score({
            userId,
            score,
            totalQuestions
        });

        await newScore.save();
        res.status(200).json({ message: 'Score saved successfully' });
    } catch (err) {
        console.error('Error saving score:', err);
        res.status(500).json({ message: 'Error saving score', error: err });
    }
});

module.exports = router;
