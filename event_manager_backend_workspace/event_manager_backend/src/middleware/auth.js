const jwt = require('jsonwebtoken');

/**
 * Express middleware to authenticate using JWT in Authorization header.
 * Sets req.user on valid token.
 */
 // PUBLIC_INTERFACE
function authenticateJWT(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer token
  if (!token) {
    return res.status(401).json({ message: 'Access token required.' });
  }
  jwt.verify(token, process.env.JWT_SECRET || 'supersecret', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateJWT;
