/*
  Warnings:

  - The primary key for the `comments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `likes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `pius` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `pius` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `pius` will be added. If there are existing duplicate values, this will fail.
  - The required column `idpiu` was added to the `pius` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_piuId_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_piuId_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_userId_fkey";

-- DropForeignKey
ALTER TABLE "pius" DROP CONSTRAINT "pius_userId_fkey";

-- AlterTable
ALTER TABLE "comments" DROP CONSTRAINT "comments_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "piuId" SET DATA TYPE TEXT,
ADD CONSTRAINT "comments_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "comments_id_seq";

-- AlterTable
ALTER TABLE "likes" DROP CONSTRAINT "likes_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "piuId" SET DATA TYPE TEXT,
ADD CONSTRAINT "likes_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "likes_id_seq";

-- AlterTable
ALTER TABLE "pius" DROP CONSTRAINT "pius_pkey",
DROP COLUMN "id",
ADD COLUMN     "idpiu" TEXT NOT NULL,
ADD CONSTRAINT "pius_pkey" PRIMARY KEY ("idpiu");

-- CreateIndex
CREATE UNIQUE INDEX "pius_userId_key" ON "pius"("userId");

-- AddForeignKey
ALTER TABLE "pius" ADD CONSTRAINT "pius_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_piuId_fkey" FOREIGN KEY ("piuId") REFERENCES "pius"("idpiu") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_piuId_fkey" FOREIGN KEY ("piuId") REFERENCES "pius"("idpiu") ON DELETE CASCADE ON UPDATE CASCADE;
