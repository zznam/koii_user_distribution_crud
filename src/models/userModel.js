import pool from "../config/db.js";

export const getAllUsersService = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

export const getUserByIdService = async (id) => {
  const result = await pool.query("SELECT * FROM users where id = $1", [id]);
  return result.rows[0];
};

export const getUserByEmailService = async (email) => {
  const result = await pool.query("SELECT * FROM users where email = $1", [email]);
  return result.rows[0];
};

export const createUserService = async (koii_main_account_pubkey, email, last_distribution_at) => {
  if (!last_distribution_at) last_distribution_at = new Date(0);
  const result = await pool.query(
    "INSERT INTO users (koii_main_account_pubkey, email, last_distribution_at) VALUES ($1, $2, $3) RETURNING *",
    [koii_main_account_pubkey, email, last_distribution_at]
  );
  return result.rows[0];
};

export const updateUserService = async (id, koii_main_account_pubkey, email, last_distribution_at) => {
  let query = "UPDATE users SET koii_main_account_pubkey=$1, email=$2";
  const values = [koii_main_account_pubkey, email, id];
  if (last_distribution_at) {
    const date = new Date(last_distribution_at);
    query += ", last_distribution_at=$4";
    values.push(date);
  }

  query += " WHERE id=$3 RETURNING *";

  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteUserService = async (id) => {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
