import { pool } from "../db/config.js";
import { queryHandler } from "../utils/queryHandler.js";

const createProductTable = async () => {
  try {
    const res = await pool.query(`
            CREATE TABLE IF NOT EXISTS products(
	            product_id SERIAL PRIMARY KEY,
	            product_name TEXT NOT NULL,
	            amount DECIMAL(10,2) NOT NULL
            )   
        `);
    console.log("Products table created successfully");
  } catch (error) {
    console.log("Error creating Product table: ", error);
  }
};

const getProducts = (values) => {
  const query = `SELECT * FROM DBLINK(
	  'host=localhost 
	  user=postgres 
	  password=postgres 
	  dbname=product_db',
	  'SELECT * FROM products') as 
	  products(product_id int,product_name text,amount decimal)`;
  return queryHandler(query, values);
};

const checkProductExists = (values, client) => {
  const query = `
      SELECT * FROM products WHERE product_id=$1
      `;
  return queryHandler(query, values, client);
};

export { createProductTable, checkProductExists, getProducts };
