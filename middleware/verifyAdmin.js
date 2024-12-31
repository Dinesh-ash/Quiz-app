const jwt = require('jsonwebtoken');

const verifyAdmin = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract token
    if (!token) {
        return res.status(401).json({ message: 'Access denied, token missing!' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode token
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied, admin only!' });
        }
        req.userId = decoded.userId; // Pass userId to the next middleware
        next();
    } catch (err) {
        console.error('Token verification error:', err);
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = verifyAdmin;
