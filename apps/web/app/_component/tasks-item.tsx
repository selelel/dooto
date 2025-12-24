import React from 'react';
import { CircleCheck, Circle } from 'lucide-react';
import { Task, TaskStatus } from '@/modules/tasks/types';
import { usePatchTask } from '@/modules/tasks/hooks';
import { useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { QueryKeys } from '@/constant/queryKeys';

interface TaskItemProps {
  task: {
    taskId: string;
    taskName: string;
    status: TaskStatus;
  };
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const queryClient = useQueryClient();
  const { mutate, isPending, data } = usePatchTask();
  const taskItem: Task = data?.data || task;
  let icon;
  let textClass = "";
  let iconClass = "w-5 h-5 shrink-0";

  switch (taskItem.status!) {
    case TaskStatus.DONE:
      icon = <CircleCheck className={`${iconClass} text-success`} />;
      textClass = "line-through text-muted-foreground";
      break;

    case TaskStatus.IN_PROGRESS:
      icon = <Circle className={`${iconClass} animate-pulse text-primary`} />;
      textClass = "text-primary";
      break;

    case TaskStatus.PENDING:
    default:
      icon = <Circle className={`${iconClass} text-muted-foreground`} />;
      textClass = "";
      break;
  }

  // Toggle function for status cycling
  const toggleStatus = () => {
    if (isPending) return; // prevent spamming mutations while loading

    let newStatus: TaskStatus;
    switch (taskItem.status) {
      case TaskStatus.PENDING:
        newStatus = TaskStatus.IN_PROGRESS;
        break;
      case TaskStatus.IN_PROGRESS:
        newStatus = TaskStatus.DONE;
        break;
      case TaskStatus.DONE:
      default:
        newStatus = TaskStatus.PENDING;
        break;
    }

    mutate(
      { taskId: task.taskId, status: newStatus },
      {
        onSuccess: () => {

          if(TaskStatus.PENDING === newStatus || TaskStatus.DONE === newStatus  ) {
            queryClient.invalidateQueries({queryKey: QueryKeys.TasksQueryKeys.parent('get-task-collection')}); // or specific query key you use
          }
        },
      }
    );
  };

  return (
    <div
      onClick={toggleStatus}
      className={`flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer ${
        isPending ? "opacity-60 pointer-events-none" : ""
      }`}
      title="Click to toggle task status"
    >
      {icon}
      <span className={textClass}>{taskItem.taskName}</span>
    </div>
  );
};

export default TaskItem;