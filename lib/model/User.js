const pool = require('../utils/pool');

module.exports = class User {
  id;
  userName;
  passwordHash;
  userRole;

  constructor(row) {
    this.id = row.id;
    this.userName = row.user_name;
    this.passwordHash = row.password_hash;
    this.userRole = row.user_role;
  }

  static async insert(user) {
    const { rows } = await pool.query(
      `INSERT INTO users (
        user_name,
        password_hash,
        user_role
      ) VALUES ($1, $2, $3)
      RETURNING *`,
      [user.userName, user.passwordHash, user.userRole]
    );
    
    return new User(rows[0]);
  }

  static async findByUserName(userName) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE user_name=$1',
      [userName]
    );

    return new User(rows[0]);
  }

  toJSON() {
    const obj = { ...this };
    delete obj.passwordHash;

    return obj;
  }

};
