import { PrismaClient } from "@prisma/client";

const { NODE_ENV } = process.env;

let prisma: PrismaClient;

if (NODE_ENV === "development") {
  prisma = createDevelopmentPrismaClient();
} else {
  prisma = new PrismaClient();
}

export default prisma;

/** Constructs a PrismaClient instance and memoizes it per process */
function createDevelopmentPrismaClient(): PrismaClient {
  // @ts-ignore
  if (!global.prisma) {
    // @ts-ignore
    global.prisma = new PrismaClient({
      log: ["query", "info", "warn", "error"],
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });

    // Add error handling for the connection
    // @ts-ignore
    global.prisma.$on("query", (e: any) => {
      console.log("Query: " + e.query);
      console.log("Params: " + e.params);
      console.log("Duration: " + e.duration + "ms");
    });

    // @ts-ignore
    global.prisma.$on("error", (e: any) => {
      console.error("Prisma Error:", e);
    });
  }

  // @ts-ignore
  return global.prisma;
}
