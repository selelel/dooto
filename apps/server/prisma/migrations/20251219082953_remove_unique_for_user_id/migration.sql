/*
  Warnings:

  - A unique constraint covering the columns `[habitName]` on the table `BadHabitTimer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "BadHabitTimer_userId_habitName_key";

-- CreateIndex
CREATE UNIQUE INDEX "BadHabitTimer_habitName_key" ON "BadHabitTimer"("habitName");
