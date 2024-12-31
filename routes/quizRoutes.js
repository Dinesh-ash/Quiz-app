const express = require('express');
const router = express.Router();
const Question = require('../models/Question'); // Import the Question model

// Route to fetch quiz questions from MongoDB
router.get('/', async (req, res) => {
    try {
        const questions = await Question.find();  // Fetch all questions from MongoDB
        res.json(questions);  // Return the questions as JSON response
    } catch (err) {
        console.error('Error fetching questions:', err);
        res.status(500).json({ message: 'Error fetching questions', error: err });
    }
});

module.exports = router;
