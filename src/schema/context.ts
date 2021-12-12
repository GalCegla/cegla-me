import type { PrismaClient } from "@prisma/client";

export type Context = {
  prisma: PrismaClient;
};
