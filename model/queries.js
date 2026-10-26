const pool = require("../db/pool");
``;
async function createUser(firstName, lastName, email, password) {
  await pool.query(
    "INSERT INTO users(first_name,last_name,email,password) VALUES($1,$2,$3,$4)",
    [firstName, lastName, email, password],
  );
}

async function getUser(email) {
  const result = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email],
  );
  return result.rows[0];
}

async function getUserById(id) {
  const result = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
  return result.rows[0];
}

async function createMessage(userId,title, message){
  await pool.query(
    "INSERT INTO messages(user_id,title,description,created_at) VALUES($1,$2,$3,$4)",
    [userId,title, message,new Date()],
  );
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  createMessage
};
