import { Pool } from "pg";
import { PrismaClient } from "@prisma/client";

const pool = new Pool({
  user: "gal",
  password: "lag",
  host: "localhost",
  port: 5433,
  database: "db",
});

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

async function testConnections() {
  console.log("Starting connection tests...\n");

  // Test pg connection
  try {
    console.log("Testing pg connection...");
    const client = await pool.connect();
    console.log("Successfully connected with pg");

    const result = await client.query("SELECT NOW()");
    console.log("pg query result:", result.rows[0]);

    client.release();
    await pool.end();

    console.log("pg test completed successfully\n");
  } catch (error) {
    console.error("Error in pg test:", error);
  }

  // Test Prisma connection
  try {
    console.log("Testing Prisma connection...");
    const result = await prisma.$queryRaw`SELECT NOW()`;
    console.log("Prisma query result:", result);

    await prisma.$disconnect();
    console.log("Prisma test completed successfully");
  } catch (error) {
    console.error("Error in Prisma test:", error);
  }
}

testConnections();
