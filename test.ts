// test-prisma.ts
import prisma from "./src/lib/prisma"; // Adjust the path if needed

async function main() {
  try {
    // For example, try to fetch posts
    const posts = await prisma.post.findMany({
      select: { id: true, title: true },
      take: 5,
    });
    console.log("Fetched posts:", posts);

    // Alternatively, you can count records to verify connection
    const count = await prisma.post.count();
    console.log("Total posts count:", count);
  } catch (error) {
    console.error("Error during Prisma query:", error);
  } finally {
    // Disconnect the Prisma Client to close open connections
    await prisma.$disconnect();
  }
}

main();
