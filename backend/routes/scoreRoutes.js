// routes/scoreRoutes.js

const express = require('express');
const router = express.Router();
const Score = require('../models/Score');
const verifyAdmin = require('../middleware/verifyAdmin');  // Use the verifyAdmin middleware

// GET route to fetch all quiz scores (only accessible by admin)
// GET route to fetch all quiz scores (only accessible by admin)
router.get('/admin/scores', verifyAdmin, async (req, res) => {
    try {
        const scores = await Score.find().populate('userId', 'email');  // Populate user info
        res.status(200).json(scores);  // Return scores as JSON
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving scores', error: err });
    }
});

module.exports = router;
