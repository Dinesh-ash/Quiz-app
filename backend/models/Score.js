// models/Score.js

const mongoose = require('mongoose');

// Define schema for storing quiz scores
const scoreSchema = new mongoose.Schema({
    userId: { type: String, required: true },  // User who took the quiz
    score: { type: Number, required: true },   // User's score
    totalQuestions: { type: Number, required: true },  // Total number of questions in the quiz
    date: { type: Date, default: Date.now }    // Timestamp of when the score was saved
});

// Create a model for the score schema
const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;
