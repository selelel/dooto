import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { QueryKeys } from "@/constant/queryKeys";
import { logger } from "@/lib/logger";
import { Ellipsis, Plus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { useTasks } from "../_hooks/useTasks";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDeleteTaskCollectionById } from "@/modules/tasks/hooks";
import { useRouter } from "next/navigation";
import { ROUTES_CLIENT } from "@/constant/http";

export default function TaskHeader({
  form,
  id,
  onOpenDialog,
}: {
  form: UseFormReturn<
    {
      taskName: string;
      details: string;
    },
    any,
    {
      taskName: string;
      details: string;
    }
  >;
  id: string;
  onOpenDialog: () => void;
}) {
  const router = useRouter();
  const {
    patchTaskCollection,
    taskCollectionData,
    queryClient,
    handleDeleteTaskCollection,
  } = useTasks();

  const handleDelete = () => {
    handleDeleteTaskCollection(id);
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
                <input
                  className='text-2xl mb-2'
                  {...field}
                  onBlur={() => {
                    if (field.value !== taskCollectionData?.tasksName) {
                      patchTaskCollection(
                        { tasksId: id!, tasksName: field.value },
                        {
                          onSuccess: () => {
                            queryClient.invalidateQueries({
                              queryKey: QueryKeys.TasksQueryKeys.parent(
                                "get-task-collection"
                              ),
                            });
                          },
                          onError: (err: any) => logger.error(err),
                        }
                      );
                    }
                  }}
                />
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
                    if (field.value !== taskCollectionData?.details) {
                      patchTaskCollection(
                        { tasksId: id!, details: field.value },
                        {
                          onSuccess: () => {
                            queryClient.invalidateQueries({
                              queryKey: QueryKeys.TasksQueryKeys.parent(
                                "get-task-collection"
                              ),
                            });
                          },
                          onError: (err: any) => logger.error(err),
                        }
                      );
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
