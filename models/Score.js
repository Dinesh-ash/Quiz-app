const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference User model
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Score', scoreSchema);
