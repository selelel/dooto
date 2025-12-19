-- CreateTable
CREATE TABLE "BadHabitTimer" (
    "id" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "habitName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastRelapseAt" TIMESTAMP(3),
    "longestStreakSeconds" INTEGER NOT NULL,
    "currentStreakSeconds" INTEGER NOT NULL,
    "relapsesCount" INTEGER NOT NULL,

    CONSTRAINT "BadHabitTimer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BadHabitTimer_userId_idx" ON "BadHabitTimer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "BadHabitTimer_userId_habitName_key" ON "BadHabitTimer"("userId", "habitName");

-- AddForeignKey
ALTER TABLE "BadHabitTimer" ADD CONSTRAINT "BadHabitTimer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
