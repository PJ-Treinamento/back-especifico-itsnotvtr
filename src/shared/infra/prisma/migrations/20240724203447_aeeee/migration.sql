/*
  Warnings:

  - The primary key for the `comments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `comments` table. All the data in the column will be lost.
  - The primary key for the `likes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `likes` table. All the data in the column will be lost.
  - The required column `idcomment` was added to the `comments` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `idlike` was added to the `likes` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "comments" DROP CONSTRAINT "comments_pkey",
DROP COLUMN "id",
ADD COLUMN     "idcomment" TEXT NOT NULL,
ADD CONSTRAINT "comments_pkey" PRIMARY KEY ("idcomment");

-- AlterTable
ALTER TABLE "likes" DROP CONSTRAINT "likes_pkey",
DROP COLUMN "id",
ADD COLUMN     "idlike" TEXT NOT NULL,
ADD CONSTRAINT "likes_pkey" PRIMARY KEY ("idlike");
