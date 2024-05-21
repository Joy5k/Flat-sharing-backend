/*
  Warnings:

  - You are about to drop the `Testimonial` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tip` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Testimonial" DROP CONSTRAINT "Testimonial_userId_fkey";

-- DropTable
DROP TABLE "Testimonial";

-- DropTable
DROP TABLE "Tip";
