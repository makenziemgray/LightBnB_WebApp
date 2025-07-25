// db/database.js

const db = require('./db'); // PostgreSQL connection

//
// Users
//

/**
 * Fetch a user by their email.
 * @param {string} email - The user's email.
 * @returns {Promise<object|null>} Resolves to user object or null if not found.
 */
const getUserWithEmail = (email) => {
  const query = `SELECT * FROM users WHERE email = $1;`;
  const values = [email.toLowerCase()];

  return db.query(query, values)
    .then(res => res.rows[0] || null)
    .catch(err => {
      console.error('getUserWithEmail error:', err.message);
      return null;
    });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Fetch a user by their ID.
 * @param {string|number} id - The user's ID.
 * @returns {Promise<object|null>} Resolves to user object or null if not found.
 */
const getUserWithId = (id) => {
  const query = `SELECT * FROM users WHERE id = $1;`;
  const values = [id];

  return db.query(query, values)
    .then(res => res.rows[0] || null)
    .catch(err => {
      console.error('getUserWithId error:', err.message);
      return null;
    });
};
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, email: string, password: string}} user - The new user.
 * @returns {Promise<object|null>} Resolves to the created user object or null on failure.
 */
const addUser = ({ name, email, password }) => {
  const query = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [name, email.toLowerCase(), password];

  return db.query(query, values)
    .then(res => res.rows[0])
    .catch(err => {
      console.error('addUser error:', err.message);
      return null;
    });
};
exports.addUser = addUser;