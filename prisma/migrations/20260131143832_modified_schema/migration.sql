/*
  Warnings:

  - You are about to drop the column `isAvailable` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `providerId` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `mealId` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `ProviderMeal` table. All the data in the column will be lost.
  - Added the required column `ProvidermealId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_mealId_fkey";

-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "isAvailable",
DROP COLUMN "price",
DROP COLUMN "providerId";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "mealId",
ADD COLUMN     "ProvidermealId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProviderMeal" DROP COLUMN "stock";

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_ProvidermealId_fkey" FOREIGN KEY ("ProvidermealId") REFERENCES "ProviderMeal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
