/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `MoodJournal` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MoodJournal_date_key" ON "MoodJournal"("date");
