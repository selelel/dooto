"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format, startOfDay, addDays } from "date-fns";
import { CalendarIcon, CheckSquare, Plus, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { Task } from "@/modules/tasks/types";
import { useTasks } from "../_hooks/useTasks";
import { StatusIconRender, StatusLabelRender } from "../utils";
import { Input } from "@/components/ui/input";

const taskSchema = z.object({
  taskName: z.string().min(2, "Task name must be at least 2 characters."),
  details: z.string().optional(),
  due: z.date().nullable().optional(),
});

type TaskFormValues = z.infer<typeof taskSchema>;

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task;
}

export default function TaskDialog({
  open,
  onOpenChange,
  task: initialTask,
}: TaskDialogProps) {
  const {
    handlePatchTasks,
    handleToggleStatus,
    getTaskById,
    handleCreateTask,
    getSubTaskById,
    handleDeleteTask,
  } = useTasks();
  const task = getTaskById(initialTask.taskId)!;

  const subTaskForm = useForm({
    defaultValues: {
      subTaskName: "",
    },
  });
  const subTasks = getSubTaskById(task.taskId) || [];
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      taskName: "",
      details: "",
      due: null,
    },
  });

  const [popoverOpen, setPopoverOpen] = useState(false);

  useEffect(() => {
    form.reset({
      taskName: task.taskName ?? "",
      details: task.details ?? "",
      due: task.due ? new Date(task.due) : null,
    });
  }, [task.taskId, task.updated, form]);

  const today = startOfDay(new Date());
  const tomorrow = addDays(today, 1);

  const currentDue = form.watch("due");

  const saveDue = (newDate: Date | null) => {
    if (
      (currentDue && newDate && currentDue.getTime() === newDate.getTime()) ||
      (!currentDue && !newDate)
    ) {
      return;
    }

    form.setValue("due", newDate);
    handlePatchTasks({
      taskId: task.taskId,
      due: newDate ?? undefined,
    });
  };

  const handleSubTaskSubmit = (d: any) => {
    handleCreateTask({
      id: initialTask.tasksId,
      taskName: d.subTaskName,
      details: "",
      due: undefined,
      subClassId: task.taskId,
    });
    subTaskForm.reset();
  };

  const formatDate = (date: Date | null) =>
    date ? format(date, "EEEE, MMMM d, yyyy") : "No due date";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className=''>
          <Form {...form}>
            <FormField
              control={form.control}
              name='taskName'
              render={({ field }) => (
                <DialogTitle className='mt-0!'>
                  <input
                    {...field}
                    value={field.value ?? ""}
                    className='w-full bg-transparent text-xl font-semibold outline-none'
                    placeholder='Task name'
                    onBlur={() => {
                      const trimmed = field.value?.trim() ?? "";
                      if (trimmed && trimmed !== task.taskName) {
                        handlePatchTasks({
                          taskId: task.taskId,
                          taskName: trimmed,
                        });
                      }
                    }}
                  />
                </DialogTitle>
              )}
            />
            <div className='flex items-center gap-2 text-sm'>
              <CalendarIcon className='h-4 w-4 text-muted-foreground' />
              <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                  <button
                    type='button'
                    className={cn(
                      "flex items-center gap-1.5 rounded px-2 py-1 text-xs",
                      "text-muted-foreground hover:bg-muted transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    )}
                  >
                    {formatDate(currentDue!)}
                  </button>
                </PopoverTrigger>

                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={currentDue ?? undefined}
                    onSelect={(d) => {
                      saveDue(d ?? null);
                      setPopoverOpen(false);
                    }}
                    disabled={(date) => date < today}
                  />
                </PopoverContent>
              </Popover>

              {!currentDue && (
                <div className='flex gap-1.5'>
                  <Badge
                    variant='outline'
                    className='cursor-pointer hover:bg-muted/80 text-xs px-2.5 py-0.5'
                    onClick={() => saveDue(today)}
                  >
                    Today
                  </Badge>
                  <Badge
                    variant='outline'
                    className='cursor-pointer hover:bg-muted/80 text-xs px-2.5 py-0.5'
                    onClick={() => saveDue(tomorrow)}
                  >
                    Tomorrow
                  </Badge>
                </div>
              )}
            </div>

            <FormField
              control={form.control}
              name='details'
              render={({ field }) => (
                <div className='rounded-lg border bg-muted/40 p-4 mt-2'>
                  <DialogDescription className='mb-2 text-xs font-medium text-muted-foreground'>
                    Description
                  </DialogDescription>
                  <textarea
                    {...field}
                    value={field.value ?? ""}
                    placeholder='Add details...'
                    className='min-h-20 w-full resize-none bg-transparent outline-none text-sm'
                    onBlur={() => {
                      if (field.value !== task.details) {
                        handlePatchTasks({
                          taskId: task.taskId,
                          details: field.value ?? "",
                        });
                      }
                    }}
                  />
                </div>
              )}
            />
          </Form>
        </DialogHeader>

        {!task.subClassId && (
          <div className='pt-4'>
            <div className='flex items-center gap-2 mb-3 text-sm font-medium text-muted-foreground'>
              <CheckSquare className='h-4 w-4' />
              Subtasks
            </div>

            {(subTasks ?? []).length === 0 ? (
              <div className='rounded-lg border border-dashed bg-muted/30 px-6 py-10 text-center'>
                <div className='mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-muted'>
                  <CheckSquare className='h-5 w-5 text-muted-foreground/70' />
                </div>
                <p className='text-sm font-medium text-muted-foreground'>
                  No subtasks yet
                </p>
                <p className='mt-1 text-xs text-muted-foreground/70'>
                  Break this task into smaller steps
                </p>
              </div>
            ) : (
              <div className='space-y-1 rounded-lg border bg-card/60 p-1 max-h-50 overflow-y-auto scrollbar-hide'>
                {subTasks.map((subtask) => (
                  <div
                    key={subtask.taskId}
                    onClick={() => handleToggleStatus(subtask)}
                    className={cn(
                      "group flex cursor-pointer items-center gap-3 rounded-md px-3 py-2",
                      "transition-colors hover:bg-muted/60",
                    )}
                  >
                    <div className='scale-75 text-muted-foreground'>
                      {StatusIconRender(subtask.status)}
                    </div>

                    <p className='flex-1 truncate text-sm'>
                      {subtask.taskName}
                    </p>

                    <Button
                      variant='ghost'
                      size='icon'
                      className='opacity-0 group-hover:opacity-100 transition-opacity'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTask(subtask.taskId);
                      }}
                    >
                      <Trash2 className='h-4 w-4 text-destructive' />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <Form {...subTaskForm}>
              <form
                onSubmit={subTaskForm.handleSubmit(handleSubTaskSubmit)}
                className='mt-3 flex items-center gap-2 pl-1'
              >
                <FormField
                  control={subTaskForm.control}
                  name='subTaskName'
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder='Add a subtask…'
                      className='h-9 flex-1 text-sm'
                      autoComplete='off'
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          subTaskForm.handleSubmit(handleSubTaskSubmit)();
                        }
                      }}
                    />
                  )}
                />

                <Button
                  type='submit'
                  size='sm'
                  variant='secondary'
                  className='h-9 px-3'
                  disabled={
                    subTaskForm.formState.isSubmitting ||
                    !subTaskForm.watch("subTaskName").trim()
                  }
                >
                  <Plus className='h-4 w-4' />
                </Button>
              </form>
            </Form>
          </div>
        )}
        <div className='flex gap-2 sm:gap-3'>
          <Button
            variant='outline'
            className='flex-1 gap-2'
            onClick={() => handleToggleStatus(task)}
          >
            {StatusIconRender(task.status)}
            {StatusLabelRender(task.status)}
          </Button>

          <Button variant='destructive' size='icon'>
            <Trash2 className='h-4 w-4' />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
