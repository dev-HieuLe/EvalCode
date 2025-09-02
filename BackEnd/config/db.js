import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "!mao1501",
  database: process.env.DB_NAME || "evalyn",
  connectionLimit: 20,
});

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
