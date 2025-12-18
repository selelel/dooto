-- CreateTable
CREATE TABLE "Habit" (
    "id" UUID NOT NULL,
    "habitName" TEXT NOT NULL,
    "details" TEXT,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID NOT NULL,

    CONSTRAINT "Habit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HabitContribution" (
    "habitId" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HabitContribution_pkey" PRIMARY KEY ("habitId","date")
);

-- CreateIndex
CREATE INDEX "Habit_userId_idx" ON "Habit"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Habit_userId_habitName_key" ON "Habit"("userId", "habitName");

-- AddForeignKey
ALTER TABLE "Habit" ADD CONSTRAINT "Habit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HabitContribution" ADD CONSTRAINT "HabitContribution_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
