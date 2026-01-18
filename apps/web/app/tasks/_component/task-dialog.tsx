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
  } = useTasks();
  const task = getTaskById(initialTask.taskId)!;

  const subTaskForm = useForm({
    defaultValues: {
      subTaskName: "",
    },
  });

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
      taskName: d,
      details: "",
      due: undefined,
      subClassId: task.subClassId,
    });
  };

  const formatDate = (date: Date | null) =>
    date ? format(date, "EEEE, MMMM d, yyyy") : "No due date";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className=''>
          <Form {...form}>
            <div
              onClick={() => handleToggleStatus(task)}
              className='w-fit cursor-pointer rounded p-1 transition hover:opacity-70 active:scale-95'
            >
              {StatusIconRender(task.status)}
            </div>
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
          <div className='space-y-3 pt-2'>
            <p className='text-sm font-medium flex items-center gap-2'>
              <CheckSquare className='h-4 w-4 text-primary' />
              Subtasks
            </p>

            <div className='space-y-2'>
              {/* Example: placeholder for existing subtasks */}
              {/* You can map real subtasks here later */}
              {/* {(task.subtasks ?? []).map(...)} */}

              {/* Empty state (optional) */}
              {/* {task.subtasks?.length === 0 && (
              <p className="text-xs text-center text-muted-foreground py-4">
                No subtasks yet — add one below
              </p>
            )} */}

              {/* Add new subtask form */}
              <Form {...subTaskForm}>
                <form
                  onSubmit={subTaskForm.handleSubmit(handleSubTaskSubmit)}
                  className='flex items-center gap-2 pl-8'
                >
                  <FormField
                    control={subTaskForm.control}
                    name='subTaskName'
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder='Add subtask...'
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
                    <Plus className='h-4 w-4 mr-1' />
                    Add
                  </Button>
                </form>
              </Form>
            </div>
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
