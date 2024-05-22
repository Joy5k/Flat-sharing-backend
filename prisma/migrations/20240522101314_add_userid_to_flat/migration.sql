/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Flat` table. All the data in the column will be lost.
  - You are about to drop the column `photos` on the `Flat` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Flat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Flat" DROP CONSTRAINT "Flat_ownerId_fkey";

-- AlterTable
ALTER TABLE "Flat" DROP COLUMN "ownerId",
DROP COLUMN "photos",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Photo" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "flatId" TEXT NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Flat" ADD CONSTRAINT "Flat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_flatId_fkey" FOREIGN KEY ("flatId") REFERENCES "Flat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
