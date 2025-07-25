// database.js

const db = require('./db'); // Adjust path as needed based on your folder structure

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<Object|null>} A promise to the user object or null if not found.
 */
const getUserWithEmail = function (email) {
  const queryString = `SELECT * FROM users WHERE email = $1;`;
  const values = [email.toLowerCase()];

  return db.query(queryString, values)
    .then(res => res.rows[0] || null)
    .catch(err => {
      console.error('Error in getUserWithEmail:', err.message);
      return null;
    });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their ID.
 * @param {String} id The id of the user.
 * @return {Promise<Object|null>} A promise to the user object or null if not found.
 */
const getUserWithId = function (id) {
  const queryString = `SELECT * FROM users WHERE id = $1;`;
  const values = [id];

  return db.query(queryString, values)
    .then(res => res.rows[0] || null)
    .catch(err => {
      console.error('Error in getUserWithId:', err.message);
      return null;
    });
};
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, email: string, password: string}} user The user to add.
 * @return {Promise<Object|null>} A promise to the new user object or null on failure.
 */
const addUser = function (user) {
  const { name, email, password } = user;
  const queryString = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [name, email.toLowerCase(), password];

  return db.query(queryString, values)
    .then(res => res.rows[0])
    .catch(err => {
      console.error('Error in addUser:', err.message);
      return null;
    });
};
exports.addUser = addUser;