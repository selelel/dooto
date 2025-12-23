import React from 'react';
import { Progress } from '@/components/ui/progress';
import { TaskStatus, POSTTasksCollectionResponseT } from '@/modules/tasks/types';
import { Circle } from 'lucide-react';
import TaskItem from './tasks-item';

interface TaskListProps {
  taskGroup: POSTTasksCollectionResponseT;
}

const TaskCollection: React.FC<TaskListProps> = ({ taskGroup }) => {
  const totalTasks = taskGroup.tasks.length;
  const completedTasks = taskGroup.tasks.filter(task => task.status === TaskStatus.DONE).length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  // Sort tasks: IN_PROGRESS first, PENDING next, DONE last
  const sortedTasks = [...taskGroup.tasks].sort((a, b) => {
    const order = {
      [TaskStatus.IN_PROGRESS]: 0,
      [TaskStatus.PENDING]: 1,
      [TaskStatus.DONE]: 2,
    };
    return order[a.status] - order[b.status];
  });

  return (
    <>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Progress</span>
          <span className="text-sm">{completedTasks} of {totalTasks} completed</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {totalTasks > 0 ? (
        sortedTasks.map(task => <TaskItem key={task.taskId} task={task} />)
      ) : (
        <div className="text-center py-8">
          <Circle className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground mb-2">No tasks yet</p>
          <p className="text-sm text-muted-foreground">Add your first task to get started!</p>
        </div>
      )}
    </>
  );
};

export default TaskCollection;
