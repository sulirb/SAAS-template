const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

class User {
  static async create(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    try {
      const [result] = await connection.execute(
        'INSERT INTO users (email, password) VALUES (?, ?)',
        [email, hashedPassword]
      );
      return result.insertId;
    } finally {
      await connection.end();
    }
  }

  static async findByEmail(email) {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    try {
      const [rows] = await connection.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      return rows[0];
    } finally {
      await connection.end();
    }
  }
}

module.exports = User;