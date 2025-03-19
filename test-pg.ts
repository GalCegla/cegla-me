import { Pool } from "pg";

const pool = new Pool({
  user: "gal",
  password: "lag",
  host: "localhost",
  port: 5433,
  database: "db",
});

async function testConnection() {
  try {
    console.log("Testing PostgreSQL connection...");
    const client = await pool.connect();
    console.log("Successfully connected to PostgreSQL");

    const result = await client.query("SELECT NOW()");
    console.log("Query result:", result.rows[0]);

    client.release();
    await pool.end();

    console.log("Test completed successfully");
  } catch (error) {
    console.error("Error testing connection:", error);
  }
}

testConnection();
