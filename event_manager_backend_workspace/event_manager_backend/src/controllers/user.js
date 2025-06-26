const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');

/**
 * Controller for user registration and authentication.
 */
class UserController {
  // PUBLIC_INTERFACE
  /**
   * Register a new user.
   */
  async register(req, res) {
    try {
      const { email, password, name } = req.body;
      if (!email || !password || !name) {
        return res.status(400).json({ message: 'Name, email, and password are required.' });
      }
      const user = await UserModel.create({ email, password, name });
      return res.status(201).json(user);
    } catch (err) {
      return res.status(409).json({ message: err.message });
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Authenticate user and return JWT token.
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findByEmail(email);
      if (!user) return res.status(401).json({ message: 'Invalid credentials.' });
      const valid = await UserModel.validatePassword(user, password);
      if (!valid) return res.status(401).json({ message: 'Invalid credentials.' });
      // Do not include password in payload
      const payload = { id: user.id, email: user.email, name: user.name };
      const token = jwt.sign(payload, process.env.JWT_SECRET || 'supersecret', { expiresIn: '2h' });
      return res.status(200).json({ token, user: payload });
    } catch (err) {
      return res.status(500).json({ message: 'Failed to authenticate.' });
    }
  }
}

module.exports = new UserController();
