/*
  Warnings:

  - A unique constraint covering the columns `[userId,providerId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_providerId_key" ON "Review"("userId", "providerId");
