import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "!mao1501",
  database: process.env.DB_NAME || "evalyn",
  port: process.env.DB_PORT || 3306,
  connectionLimit: 20,
});

console.log('process.env.DB_HOST:', process.env.DB_HOST);
console.log('process.env.DB_USER:', process.env.DB_USER);

// Test the database connection
(async () => {
  try {
    const conn = await db.getConnection();
    console.log("✅ MySQL connected as id " + conn.threadId);
    conn.release(); // release back to pool
  } catch (err) {
    console.error("❌ MySQL connection failed:", err.message);
  }
})();

export default db;
