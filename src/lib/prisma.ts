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
    global.prisma = new PrismaClient();
  }

  // @ts-ignore
  return global.prisma;
}
