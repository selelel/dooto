/*
  Warnings:

  - You are about to drop the `task_collection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "task_collection" DROP CONSTRAINT "task_collection_subClassId_fkey";

-- DropForeignKey
ALTER TABLE "task_collection" DROP CONSTRAINT "task_collection_tasksId_fkey";

-- DropTable
DROP TABLE "task_collection";

-- CreateTable
CREATE TABLE "task" (
    "taskId" UUID NOT NULL,
    "tasksId" UUID NOT NULL,
    "taskName" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "due" TIMESTAMP(3) NOT NULL,
    "updated" TIMESTAMP(3) NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'PENDING',
    "tags" TEXT[],
    "details" TEXT,
    "subClassId" UUID,

    CONSTRAINT "task_pkey" PRIMARY KEY ("taskId")
);

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_subClassId_fkey" FOREIGN KEY ("subClassId") REFERENCES "task"("taskId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_tasksId_fkey" FOREIGN KEY ("tasksId") REFERENCES "tasks_collection"("tasksId") ON DELETE CASCADE ON UPDATE CASCADE;
