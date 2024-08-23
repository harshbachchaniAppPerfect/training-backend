import { pool } from "../db/config.js";
import { handleDatabaseError } from "../utils/handleDBError.js";
import { queryHandler } from "../utils/queryHandler.js";

const createTransactionTable = async () => {
  try {
    const res = await pool.query(`
            CREATE TABLE IF NOT EXISTS transactions(
	            transaction_id SERIAL PRIMARY KEY,
	            user_id INT NOT NULL,
              product_id INT NOT NULL,
	            transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	            amount DECIMAL(10,2) NOT NULL,
	            FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
              FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
            )   
        `);
    console.log("Transaction table created successfully");
  } catch (error) {
    console.log("Error creating Transaction table: ", error);
  }
};

const createTransaction = (values) => {
  const query = `
        INSERT INTO transactions(user_id,product_id,amount) 
        VALUES($1, $2, $3) RETURNING *`;
  return queryHandler(query, values);
};

const getTransactions = (values) => {
  const query = ` 
        SELECT ts.amount AS Amount,email,address,product_name 
	        FROM transactions ts INNER JOIN users u ON u.user_id=ts.user_id 
	        AND ts.user_id=$1  
	        INNER JOIN products pr ON pr.product_id=ts.product_id`;
  return queryHandler(query, values);
};

const getTransactionsByProduct = async (values) => {
  const query = ` 
       SELECT tr.user_id,us.email,ARRAY_AGG(distinct pr.product_name ORDER BY pr.product_name) as products
	      FROM transactions tr INNER JOIN products pr USING(product_id) 
	      INNER JOIN users us USING(user_id) GROUP BY tr.user_id,us.email`;
  return queryHandler(query, values);
};

const gettransactionsordered = async () => {
  const query = `SELECT 
    jsonb_object_agg(user_id, transactions) AS user_transactions
    FROM (
        SELECT 
            us.user_id, 
            json_agg(
                json_build_object(
                    'transaction_id', tr.transaction_id,
                    'username', us.username,
                    'date', tr.transaction_date,
                    'product', pr.product_name
                )
            ) AS transactions
        FROM 
            transactions tr
        INNER JOIN 
            products pr 
        ON 
            tr.product_id = pr.product_id
        INNER JOIN 
            users us 
        ON 
            us.user_id = tr.user_id
        GROUP BY 
            us.user_id
    ) AS aggregated_transactions;`;
  return queryHandler(query);
};
export {
  createTransactionTable,
  createTransaction,
  getTransactions,
  getTransactionsByProduct,
  gettransactionsordered,
};
