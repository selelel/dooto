"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { QueryKeys } from "@/constant/queryKeys";
import { logger } from "@/lib/logger";
import { Ellipsis, Plus } from "lucide-react";
import { useForm, UseFormReturn } from "react-hook-form";
import { useTasks } from "../_hooks/useTasks";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { POSTTasksCollectionResponseT } from "@/modules/tasks/types";
import { useEffect } from "react";

export default function TaskHeader({
  data,
  onOpenDialog,
}: {
  data: POSTTasksCollectionResponseT;
  onOpenDialog: () => void;
}) {
  const form = useForm({
    defaultValues: {
      taskName: data?.tasksName ?? "",
      details: data?.details ?? "",
    },
  });

  useEffect(() => {
    form.reset({
      taskName: data?.tasksName,
      details: data?.details,
    });
  }, [data]);

  const { handlePatchTaskCollection, handleDeleteTaskCollection } = useTasks();

  const handleDelete = () => {
    handleDeleteTaskCollection(data.tasksId);
  };
  return (
    <div className='flex justify-center gap-2 mb-6'>
      <Form {...form}>
        <form className='w-full'>
          <div className='w-full flex flex-col -space-y-20'>
            <FormField
              control={form.control}
              name='taskName'
              render={({ field }) => (
                <FormControl>
                  <input
                    className='text-2xl mb-2'
                    {...field}
                    value={field.value ?? ""}
                    onBlur={() => {
                      if (field.value !== data?.tasksName) {
                        handlePatchTaskCollection({
                          tasksId: data.tasksId!,
                          tasksName: field.value,
                        });
                      }
                    }}
                  />
                </FormControl>
              )}
            />

            <FormField
              control={form.control}
              name='details'
              render={({ field }) => (
                <input
                  className='text-sm text-muted-foreground'
                  {...field}
                  onBlur={() => {
                    if (field.value !== data?.details) {
                      handlePatchTaskCollection({
                        tasksId: data.tasksId!,
                        details: field.value,
                      });
                    }
                  }}
                />
              )}
            />
          </div>
        </form>
      </Form>
      <Button onClick={onOpenDialog}>
        <Plus className='w-4 h-4 mr-2' />
        Add Task
      </Button>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant='no-style'>
            <Ellipsis className='rotate-90' />
          </Button>
        </PopoverTrigger>

        <PopoverContent className='w-40 p-2'>
          <div className='flex flex-col gap-1'>
            <Button
              variant='ghost'
              className='justify-start'
              // onClick={handleEdit}
            >
              Edit
            </Button>

            <Button
              variant='ghost'
              className='justify-start text-destructive hover:text-destructive'
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
