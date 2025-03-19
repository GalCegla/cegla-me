// test-raw.ts
import prisma from "./src/lib/prisma";

async function main() {
  try {
    const posts = await prisma.post.findMany({
      select: { id: true, title: true },
      take: 1, // limit the query even if no data exists
    });
    console.log("FindMany result:", posts);
  } catch (error) {
    console.error("Error during findMany query:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
