const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Fetch all questions
router.get('/', async (req, res) => {
    const { category, difficulty } = req.query;
    const filters = {};
    if (category) filters.category = category;
    if (difficulty) filters.difficulty = difficulty;

    try {
        const questions = await Question.find(filters);
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
