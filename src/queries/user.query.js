import { pool } from "../db/config.js";
import { queryHandler } from "../utils/queryHandler.js";
const createUserTable = async () => {
  try {
    const res = await pool.query(`
          CREATE TABLE IF NOT EXISTS users(
	          user_id Serial PRIMARY KEY,
	          email TEXT UNIQUE NOT NULL,
	          user_password TEXT NOT NULL,
	          username TEXT NOT NULL,
	          address TEXT NOT NULL
          )
      `);
    console.log("Users table created successfully");
  } catch (error) {
    console.log("Error creating Users table: ", error);
  }
};

const createUser = async (values) => {
  const query = `
        INSERT INTO users(email, user_password, username, address) 
          VALUES($1, $2, $3, $4) RETURNING *`;
  return queryHandler(query, values);
};

const getUser = (values) => {
  const query = `SELECT * FROM users WHERE email=$1`;
  return queryHandler(query, values);
};
const checkUserExists = (values, client) => {
  const query = `SELECT * FROM users WHERE user_id=$1`;
  return queryHandler(query, values, client);
};

export { createUserTable, createUser, getUser, checkUserExists };
