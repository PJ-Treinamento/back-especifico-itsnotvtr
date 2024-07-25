/*
  Warnings:

  - The primary key for the `likes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the `comments` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updated_at` to the `likes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_piuId_fkey";

-- AlterTable
ALTER TABLE "likes" DROP CONSTRAINT "likes_pkey",
DROP COLUMN "id",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "likes_pkey" PRIMARY KEY ("userId", "piuId");

-- DropTable
DROP TABLE "comments";

-- CreateTable
CREATE TABLE "comentarios" (
    "userId" TEXT NOT NULL,
    "piuId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comentarios_pkey" PRIMARY KEY ("userId","piuId")
);

-- AddForeignKey
ALTER TABLE "comentarios" ADD CONSTRAINT "comentarios_piuId_fkey" FOREIGN KEY ("piuId") REFERENCES "pius"("idpiu") ON DELETE CASCADE ON UPDATE CASCADE;
