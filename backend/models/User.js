const mongoose = require('mongoose');

// Define the schema for the User
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' }, // Default role is 'user'
});

// No need for hashing the password anymore, store it as plaintext directly
const User = mongoose.model('User', userSchema);

module.exports = User;
