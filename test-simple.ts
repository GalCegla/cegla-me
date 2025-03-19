import { PrismaClient } from "@prisma/client";

async function main() {
  console.log("Starting test...");

  const prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

  try {
    console.log("Attempting to connect...");
    await prisma.$connect();
    console.log("Successfully connected to the database");

    console.log("Attempting raw query...");
    // Try a simple raw query first
    const rawResult = await prisma.$queryRaw`SELECT 1 as test`;
    console.log("Raw query result:", rawResult);

    // Try a simple model query
    console.log("Attempting model query...");
    const count = await prisma.post.count();
    console.log("Post count:", count);
  } catch (error: any) {
    console.error("Error details:", {
      name: error?.name,
      message: error?.message,
      stack: error?.stack,
      code: error?.code,
      meta: error?.meta,
    });
  } finally {
    console.log("Disconnecting...");
    await prisma.$disconnect();
    console.log("Disconnected");
  }
}

// Add a timeout to the entire operation
const timeout = setTimeout(() => {
  console.error("Test timed out after 10 seconds");
  process.exit(1);
}, 10000);

main()
  .then(() => {
    clearTimeout(timeout);
    process.exit(0);
  })
  .catch((error) => {
    clearTimeout(timeout);
    console.error("Test failed:", error);
    process.exit(1);
  });
