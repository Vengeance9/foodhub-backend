/*
  Warnings:

  - You are about to drop the column `mealId` on the `Review` table. All the data in the column will be lost.
  - Added the required column `providerMealId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_mealId_fkey";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "mealId",
ADD COLUMN     "providerMealId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_providerMealId_fkey" FOREIGN KEY ("providerMealId") REFERENCES "ProviderMeal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
