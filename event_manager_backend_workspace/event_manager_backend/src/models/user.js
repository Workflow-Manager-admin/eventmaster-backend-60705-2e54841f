const bcrypt = require('bcrypt');

const users = []; // In-memory user store; replace with DB in production

class UserModel {
  /**
   * Create and store a new user.
   * @param {Object} userData 
   * @returns {Object}
   */
  // PUBLIC_INTERFACE
  static async create(userData) {
    if (await this.findByEmail(userData.email)) throw new Error('User already exists');
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = {
      id: users.length + 1,
      email: userData.email,
      name: userData.name,
      password: hashedPassword,
    };
    users.push(user);
    return { id: user.id, email: user.email, name: user.name };
  }

  /**
   * Find a user by email.
   * @param {string} email 
   * @returns {Object|null}
   */
  // PUBLIC_INTERFACE
  static async findByEmail(email) {
    return users.find(u => u.email === email) || null;
  }

  /**
   * Validate user password.
   * @param {Object} user 
   * @param {string} password 
   * @returns {boolean}
   */
  // PUBLIC_INTERFACE
  static async validatePassword(user, password) {
    return await bcrypt.compare(password, user.password);
  }
}

module.exports = UserModel;
