-- DropForeignKey
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_providerId_fkey";

-- CreateTable
CREATE TABLE "ProviderMeal" (
    "id" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "mealId" TEXT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "stock" INTEGER,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ProviderMeal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProviderMeal_providerId_mealId_key" ON "ProviderMeal"("providerId", "mealId");

-- AddForeignKey
ALTER TABLE "ProviderMeal" ADD CONSTRAINT "ProviderMeal_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProviderMeal" ADD CONSTRAINT "ProviderMeal_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
