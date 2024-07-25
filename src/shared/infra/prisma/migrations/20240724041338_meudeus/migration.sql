/*
  Warnings:

  - You are about to drop the `comentarios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "comentarios" DROP CONSTRAINT "comentarios_piuId_fkey";

-- DropTable
DROP TABLE "comentarios";

-- CreateTable
CREATE TABLE "comments" (
    "userId" TEXT NOT NULL,
    "piuId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("userId","piuId")
);

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_piuId_fkey" FOREIGN KEY ("piuId") REFERENCES "pius"("idpiu") ON DELETE CASCADE ON UPDATE CASCADE;
