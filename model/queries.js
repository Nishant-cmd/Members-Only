const pool = require("../db/pool");
``;
async function createUser(firstName, lastName, email, password) {
  await pool.query(
    "INSERT INTO users(first_name,last_name,email,password) VALUES($1,$2,$3,$4)",
    [firstName, lastName, email, password],
  );
}

async function getUser(email) {
  const result = await pool.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);
  return result.rows[0];
}

async function getUserById(id) {
  const result = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
  return result.rows[0];
}

async function createMessage(userId, title, message) {
  await pool.query(
    "INSERT INTO messages(user_id,title,description,created_at) VALUES($1,$2,$3,$4)",
    [userId, title, message, new Date()],
  );
}

async function getAllMessages() {
  const result = await pool.query("SELECT u.first_name, u.last_name,u.status, m.title, m.description, to_char(m.created_at,'YYYY/MM/DD, HH12:MI:SS AM') AS created_at FROM messages m JOIN users u ON m.user_id = u.id");
  return result.rows;
}

async function getUserMessage(userId) {
  const result = await pool.query(
    "SELECT u.first_name, u.last_name, u.status, m.title, m.description, to_char(m.created_at,'YYYY/MM/DD, HH12:MI:SS AM') AS created_at FROM messages m JOIN users u ON m.user_id = u.id WHERE m.user_id=$1",
    [userId],
  );
  return result.rows;
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  createMessage,
  getAllMessages,
  getUserMessage,
};
