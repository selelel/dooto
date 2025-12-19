-- CreateEnum
CREATE TYPE "Mood" AS ENUM ('HAPPY', 'SAD', 'ANXIOUS', 'EXCITED', 'CALM', 'ANGRY');

-- CreateTable
CREATE TABLE "MoodJournal" (
    "id" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "note" TEXT NOT NULL,
    "mood" "Mood" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MoodJournal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MoodJournal_userId_idx" ON "MoodJournal"("userId");

-- AddForeignKey
ALTER TABLE "MoodJournal" ADD CONSTRAINT "MoodJournal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
