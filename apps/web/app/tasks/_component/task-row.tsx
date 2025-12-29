import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Task, TaskStatus } from "@/modules/tasks/types";
import { CircleCheck, Circle, Calendar, Trash2 } from "lucide-react";
import { useState } from "react";
import TaskDialog from "./task-dialog";
import { useTasks } from "../_hooks/useTasks";

export const StatusIconRender = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.DONE:
      return <CircleCheck className='text-success' />;
    case TaskStatus.IN_PROGRESS:
      return <Circle className='animate-pulse text-primary' />;
    case TaskStatus.PENDING:
    default:
      return <Circle className='text-muted-foreground' />;
  }
};

export default function TaskRow({
  task,
  faded = false,
}: {
  task: Task;
  faded?: boolean;
}) {
  const [open, onOpenChange] = useState(false);
  const { handleToggleStatus, handleDeleteTask } = useTasks();
  return (
    <>
      <TaskDialog open={open} onOpenChange={onOpenChange} task={task} />
      <div
        className={`active:opacity-60 flex items-center gap-3 p-4 rounded-xl border transition ${
          faded ? "opacity-60" : ""
        }`}
      >
        <div
          onClick={() => handleToggleStatus(task)}
          className='cursor-pointer hover:opacity-30 hover:scale-90 duration-300'
        >
          {StatusIconRender(task.status)}
        </div>

        <div
          onClick={() => onOpenChange(true)}
          className='flex-1 cursor-pointer'
        >
          <p
            className={cn(
              task.status === TaskStatus.DONE
                ? "line-through text-muted-foreground"
                : "",
              "select-none"
            )}
          >
            {task.taskName}
          </p>
          <p
            className={cn(
              task.status === TaskStatus.DONE
                ? "line-through text-muted-foreground"
                : "",
              "text-xs"
            )}
          >
            {task.details}
          </p>

          {task.due && (
            <div className='flex items-center gap-2 mt-1'>
              <Calendar className='w-3 h-3 text-muted-foreground' />
              <span className='text-xs text-muted-foreground'>
                {new Date(task.due).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        <Button
          variant='ghost'
          size='sm'
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteTask(task.taskId);
          }}
        >
          <Trash2 className='w-4 h-4 text-destructive' />
        </Button>
      </div>
    </>
  );
}
