/*
  Warnings:

  - Added the required column `rating` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Rating" AS ENUM ('GOOD', 'OK', 'BAD');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "rating" "Rating" NOT NULL;
