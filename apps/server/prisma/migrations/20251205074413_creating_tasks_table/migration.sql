-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('DONE', 'IN_PROGRESS', 'PENDING');

-- CreateTable
CREATE TABLE "tasks_collection" (
    "tasksId" UUID NOT NULL,
    "tasksName" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "due" TIMESTAMP(3) NOT NULL,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasks_collection_pkey" PRIMARY KEY ("tasksId")
);

-- CreateTable
CREATE TABLE "task_collection" (
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

    CONSTRAINT "task_collection_pkey" PRIMARY KEY ("taskId")
);

-- AddForeignKey
ALTER TABLE "task_collection" ADD CONSTRAINT "task_collection_subClassId_fkey" FOREIGN KEY ("subClassId") REFERENCES "task_collection"("taskId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_collection" ADD CONSTRAINT "task_collection_tasksId_fkey" FOREIGN KEY ("tasksId") REFERENCES "tasks_collection"("tasksId") ON DELETE CASCADE ON UPDATE CASCADE;
