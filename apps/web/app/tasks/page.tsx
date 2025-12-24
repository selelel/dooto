'use client';

import TaskCollectionList from "./_component/taskcollection-list";
import TasksList from "./_component/tasks-list";

export default function TodoListPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-semibold text-4xl mb-2">Tasks 📝</h1>
        <p className="text-muted-foreground">
          Stay organized with multiple lists for different areas of your life
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <TaskCollectionList />
        </div>

        <div className="col-span-9">
          <TasksList />
        </div>
      </div>
    </div>
  );
}