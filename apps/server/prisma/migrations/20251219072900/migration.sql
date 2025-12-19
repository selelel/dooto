/*
  Warnings:

  - Added the required column `details` to the `BadHabitTimer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BadHabitTimer" ADD COLUMN     "details" TEXT NOT NULL;
