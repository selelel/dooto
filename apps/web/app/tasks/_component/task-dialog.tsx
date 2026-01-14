"use client";

import React, { Dispatch, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Task } from "@/modules/tasks/types";
import { useTasks } from "../_hooks/useTasks";
import { StatusIconRender } from "./task-row";

const taskSchema = z.object({
  taskName: z.string().min(2, "Task name must be at least 2 characters."),
  details: z.string().optional(),
  due: z.date().nullable().optional(),
});

export type TaskFormValues = z.infer<typeof taskSchema>;

interface TaskDialogProps {
  open: boolean;
  onOpenChange: Dispatch<React.SetStateAction<boolean>>;
  task: Task;
}

export default function TaskDialog({
  open,
  onOpenChange,
  task: initialTask,
}: TaskDialogProps) {
  const { handlePatchTasks, handleToggleStatus, getTaskById } = useTasks();
  const task = getTaskById(initialTask.taskId)!;

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      taskName: "",
      details: "",
      due: null,
    },
  });

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    if (!task) return;

    form.reset({
      taskName: task.taskName ?? "",
      details: task.details ?? "",
      due: task.due ? new Date(task.due) : null,
    });
  }, [task.taskId, task.updated]);

  const startOfDay = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const today = startOfDay(new Date());
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const handleDueChange = (newDate: Date | null) => {
    form.setValue("due", newDate);

    const prev = task.due ? new Date(task.due) : null;
    if (
      (prev && newDate && prev.getTime() === newDate.getTime()) ||
      (!prev && !newDate)
    ) {
      return;
    }

    handlePatchTasks({
      taskId: task.taskId,
      due: newDate ?? undefined,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Form {...form}>
        <DialogContent className='sm:max-w-lg space-y-6'>
          <DialogHeader>
            <div
              onClick={() => handleToggleStatus(task)}
              className='w-fit cursor-pointer rounded p-1 transition hover:opacity-40'
            >
              {StatusIconRender(task.status)}
            </div>

            {task.due && (
              <FormField
                control={form.control}
                name='due'
                render={({ field }) => {
                  const date = field.value;

                  return (
                    <FormItem>
                      <Popover>
                        <PopoverTrigger asChild>
                          <div className='flex cursor-pointer items-center text-xs text-muted-foreground'>
                            <CalendarIcon className='mr-2 h-3 w-4' />
                            {date?.toLocaleDateString("en-US", {
                              weekday: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0' align='start'>
                          <Calendar
                            mode='single'
                            selected={date ?? undefined}
                            onSelect={(d) => handleDueChange(d ?? null)}
                            disabled={(d) => d < startOfDay(new Date())}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  );
                }}
              />
            )}

            <FormField
              control={form.control}
              name='taskName'
              render={({ field }) => (
                <DialogTitle>
                  <input
                    {...field}
                    value={field.value ?? ""}
                    className='w-full outline-none'
                    onBlur={() => {
                      const trimmed = field.value.trim();
                      if (!trimmed || trimmed === task.taskName) return;

                      handlePatchTasks({
                        taskId: task.taskId,
                        taskName: trimmed,
                      });
                    }}
                  />
                </DialogTitle>
              )}
            />

            <FormField
              control={form.control}
              name='details'
              render={({ field }) => (
                <DialogDescription>
                  <textarea
                    {...field}
                    value={field.value ?? ""}
                    className='min-h-10 w-full resize-none outline-none'
                    onBlur={() => {
                      if (field.value === task.details) return;

                      handlePatchTasks({
                        taskId: task.taskId,
                        details: field.value ?? "",
                      });
                    }}
                  />
                </DialogDescription>
              )}
            />

            {!task.due && (
              <div className='flex gap-2 *:cursor-pointer'>
                <Badge variant='outline' onClick={() => handleDueChange(today)}>
                  Today
                </Badge>
                <Badge
                  variant='outline'
                  onClick={() => handleDueChange(tomorrow)}
                >
                  Tomorrow
                </Badge>

                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Badge variant='outline' className='cursor-pointer'>
                      Custom
                    </Badge>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0'>
                    <Calendar
                      mode='single'
                      onSelect={(d) => {
                        handleDueChange(d ?? null);
                        setIsPopoverOpen(false);
                      }}
                      disabled={(d) => d < startOfDay(new Date())}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </DialogHeader>
        </DialogContent>
      </Form>
    </Dialog>
  );
}
