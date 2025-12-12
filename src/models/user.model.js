const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const UserModel = {
  async create(email, password) {
    const hashedPassword = bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
      [email, hashedPassword]
        );
        
    return result.rows[0]
    },
    
    async findByEmai(email) {
        const result = pool.query('SELECT * FROM users WHERE email = $1', [email])
        return result.rows[0];
    }
};


module.exports = UserModel