-- AddForeignKey
ALTER TABLE "tasks_collection" ADD CONSTRAINT "tasks_collection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
