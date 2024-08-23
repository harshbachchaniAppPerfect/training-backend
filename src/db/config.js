import pg from "pg";
const { Pool } = pg;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  port: 5432,
});
const connectDB = async () => {
  try {
    await pool.connect();

    console.log(`\n PostgreSQL connected !!`);
  } catch (error) {
    console.log("PostgreSQL connection FAILED ", error);
    process.exit(1);
  }
};

export { pool, connectDB };
