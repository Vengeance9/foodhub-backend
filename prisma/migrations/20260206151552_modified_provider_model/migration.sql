/*
  Warnings:

  - Added the required column `address` to the `Provider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Provider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Provider" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "cuisineType" TEXT[],
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "website" TEXT;
