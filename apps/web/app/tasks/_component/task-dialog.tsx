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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Task } from "@/modules/tasks/types";
import { logger } from "@/lib/logger";
import { useTasks } from "../_hooks/useTasks";
import { StatusIconRender } from "./task-row";

/** Define your Zod schema for task creation */
const taskSchema = z.object({
  taskName: z.string().min(2, {
    message: "Task name must be at least 2 characters.",
  }),
  details: z.string().optional(),
  due: z.date().optional(),
});

export type TaskFormValues = z.infer<typeof taskSchema>;

interface TaskDialogProps {
  open: boolean;
  onOpenChange: Dispatch<React.SetStateAction<boolean>>;
  task: Task;
}

function TaskDialog({ open, onOpenChange, task }: TaskDialogProps) {
  const { handlePatchTasks, handleToggleStatus } = useTasks();
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      taskName: task.taskName,
      details: task.details || "",
      due: task.due ?? null,
    },
  });
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  logger.info(task);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Form {...form}>
        <form className='space-y-6'>
          <DialogContent className='sm:max-w-lg'>
            <DialogHeader>
              <div
                onClick={() => handleToggleStatus(task)}
                className='p-1 rounded cursor-pointer hover:opacity-30 duration-300 w-fit'
              >
                {StatusIconRender(task.status)}
              </div>
              <FormField
                control={form.control}
                name='due'
                render={({ field }) => {
                  const date =
                    field.value instanceof Date
                      ? field.value
                      : typeof field.value === "string"
                        ? new Date(field.value)
                        : undefined;

                  const startOfDay = (d: Date) =>
                    new Date(d.getFullYear(), d.getMonth(), d.getDate());

                  const today = startOfDay(new Date());
                  const tomorrow = new Date(today);
                  tomorrow.setDate(today.getDate() + 1);

                  return (
                    <FormItem className='flex flex-col space-y-2'>
                      {date && (
                        <Popover>
                          <PopoverTrigger asChild>
                            <div
                              className={`flex items-center w-full justify-start text-left text-xs cursor-pointer ${
                                !date ? "text-muted-foreground" : ""
                              }`}
                            >
                              <CalendarIcon className='mr-2 h-3 w-4' />
                              <span>
                                {date.toLocaleDateString("en-US", {
                                  weekday: "long",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                          </PopoverTrigger>
                          <PopoverContent className='w-auto p-0' align='start'>
                            <Calendar
                              mode='single'
                              selected={date}
                              onSelect={(selectedDate) => {
                                field.onChange(selectedDate ?? undefined);
                              }}
                              disabled={(d) => d < startOfDay(new Date())}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      )}
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name='taskName'
                render={({ field }) => (
                  <DialogTitle>
                    <input
                      className='w-full'
                      {...field}
                      onBlur={() => {
                        if (field.value !== task?.taskName) {
                          handlePatchTasks({
                            taskId: task.taskId!,
                            taskName: field.value,
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
                  <DialogDescription>
                    <textarea
                      className='w-full h-fit min-h-10 resize-none'
                      {...field}
                      onBlur={() => {
                        if (field.value !== task.details) {
                          handlePatchTasks({
                            taskId: task.taskId!,
                            details: field.value,
                          });
                        }
                      }}
                    />
                  </DialogDescription>
                )}
              />
              <FormField
                control={form.control}
                name='due'
                render={({ field }) => {
                  const date =
                    field.value instanceof Date
                      ? field.value
                      : typeof field.value === "string"
                        ? new Date(field.value)
                        : undefined;

                  // Utility to compare two dates (ignoring time)
                  const isSameDate = (d1?: Date | null, d2?: Date | null) => {
                    if (!d1 && !d2) return true;
                    if (!d1 || !d2) return false;
                    return (
                      d1.getFullYear() === d2.getFullYear() &&
                      d1.getMonth() === d2.getMonth() &&
                      d1.getDate() === d2.getDate()
                    );
                  };

                  const handleDueChange = (newDate: Date | undefined) => {
                    field.onChange(newDate);
                    if (!isSameDate(newDate ?? null, task.due ?? null)) {
                      handlePatchTasks({
                        taskId: task.taskId!,
                        due: newDate ?? task.due,
                      });
                    }
                  };

                  const startOfDay = (d: Date) =>
                    new Date(d.getFullYear(), d.getMonth(), d.getDate());
                  const today = startOfDay(new Date());
                  const tomorrow = new Date(today);
                  tomorrow.setDate(today.getDate() + 1);

                  return (
                    <FormItem className='flex flex-col space-y-2'>
                      {!date && (
                        <div className='flex gap-2'>
                          <Badge
                            variant='outline'
                            className='cursor-pointer'
                            onClick={() => handleDueChange(today)}
                          >
                            Today
                          </Badge>
                          <Badge
                            variant='outline'
                            className='cursor-pointer'
                            onClick={() => handleDueChange(tomorrow)}
                          >
                            Tomorrow
                          </Badge>
                          <Popover
                            open={isPopoverOpen}
                            onOpenChange={setIsPopoverOpen}
                          >
                            <PopoverTrigger asChild>
                              <Badge
                                variant='outline'
                                className='cursor-pointer'
                                onClick={() => setIsPopoverOpen(true)}
                              >
                                Custom
                              </Badge>
                            </PopoverTrigger>
                            <PopoverContent
                              className='w-auto p-0'
                              align='start'
                            >
                              <Calendar
                                mode='single'
                                selected={date}
                                onSelect={(selectedDate) => {
                                  handleDueChange(selectedDate ?? undefined);
                                  setIsPopoverOpen(false);
                                }}
                                disabled={(d) => d < startOfDay(new Date())}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </DialogHeader>

            {/* <FormField
              control={form.control}
              name="status"DS
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. pending, in-progress, done" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
}

export default TaskDialog;
