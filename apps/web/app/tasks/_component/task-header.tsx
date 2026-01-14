"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { Ellipsis, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTasks } from "../_hooks/useTasks";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function TaskHeader({
  id,
  onOpenDialog,
}: {
  id: string;
  onOpenDialog: () => void;
}) {
  const {
    getTaskCollectionById,
    isTaskCollectionLoading,
    handlePatchTaskCollection,
    handleDeleteTaskCollection,
  } = useTasks();

  const data = getTaskCollectionById(id);

  const form = useForm({
    defaultValues: {
      taskName: "",
      details: "",
    },
  });

  useEffect(() => {
    if (!data) return;

    form.reset({
      taskName: data.tasksName ?? "",
      details: data.details ?? "",
    });
  }, [data?.tasksId, data?.updated]);

  return (
    <div className='mb-6 flex items-start gap-3'>
      <Form {...form}>
        <form className='flex-1 space-y-1'>
          <FormField
            control={form.control}
            name='taskName'
            render={({ field }) => (
              <FormControl>
                {isTaskCollectionLoading ? (
                  <Skeleton className='h-8 w-2/3' />
                ) : (
                  <input
                    {...field}
                    value={field.value ?? ""}
                    className='w-full text-2xl font-semibold outline-none'
                    onBlur={() => {
                      if (
                        field.value.trim() &&
                        field.value !== data?.tasksName
                      ) {
                        handlePatchTaskCollection({
                          tasksId: data!.tasksId,
                          tasksName: field.value.trim(),
                        });
                      }
                    }}
                  />
                )}
              </FormControl>
            )}
          />

          <FormField
            control={form.control}
            name='details'
            render={({ field }) =>
              isTaskCollectionLoading ? (
                <Skeleton className='h-4 w-1/2' />
              ) : (
                <input
                  {...field}
                  value={field.value ?? ""}
                  className='w-full text-sm text-muted-foreground outline-none'
                  onBlur={() => {
                    if (field.value !== data?.details) {
                      handlePatchTaskCollection({
                        tasksId: data!.tasksId,
                        details: field.value,
                      });
                    }
                  }}
                />
              )
            }
          />
        </form>
      </Form>

      <div className='flex items-center gap-2'>
        {isTaskCollectionLoading ? (
          <>
            <Skeleton className='h-9 w-28 rounded-md' />
            <Skeleton className='h-9 w-9 rounded-md' />
          </>
        ) : (
          <>
            <Button onClick={onOpenDialog}>
              <Plus className='mr-2 h-4 w-4' />
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
                  <Button variant='ghost' className='justify-start'>
                    Edit
                  </Button>

                  <Button
                    variant='ghost'
                    className='justify-start text-destructive'
                    onClick={() => handleDeleteTaskCollection(id)}
                  >
                    Delete
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </>
        )}
      </div>
    </div>
  );
}
