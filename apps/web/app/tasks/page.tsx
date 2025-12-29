"use client";

import { useSearchParams } from "next/navigation";
import TaskCollectionList from "./_component/taskcollection-list";
import TasksList from "./_component/tasks-list";
import { TasksProvider } from "./_hooks/useTasks";

function TodoListPage() {
  return (
    <div>
      <div className='mb-8'>
        <h1 className='font-semibold text-4xl mb-2'>Tasks 📝</h1>
        <p className='text-muted-foreground'>
          Stay organized with multiple lists for different areas of your life
        </p>
      </div>

      <div className='grid grid-cols-12 gap-6'>
        <div className='col-span-3'>
          <TaskCollectionList />
        </div>

        <div className='col-span-9'>
          <TasksList />
        </div>
      </div>
    </div>
  );
}

export default function CONTEXTED() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  return (
    <TasksProvider id={id}>
      <TodoListPage />
    </TasksProvider>
  );
}
