import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { QueryKeys } from "@/constant/queryKeys";
import { logger } from "@/lib/logger";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";



export default function TaskHeader({
  form,
  taskCollectionData,
  patchTaskCollection,
  queryClient,
  id,
  onOpenDialog,
}: {
  form: UseFormReturn<{
    taskName: string;
    details: string;
}, any, {
    taskName: string;
    details: string;
}>
  taskCollectionData?: { tasksName: string; details: string }
  patchTaskCollection: (data: any, options?: any) => void
  queryClient: ReturnType<typeof useQueryClient>
  id: string | null
  onOpenDialog: () => void
}) {
  return (
    <div className="flex justify-center gap-2 mb-6">
      <Form {...form}>
        <form className="w-full">
          <div className="w-full flex flex-col -space-y-20">
            <FormField
              control={form.control}
              name="taskName"
              render={({ field }) => (
                <input
                  className="text-2xl mb-2"
                  {...field}
                  onBlur={() => {
                    if (field.value !== taskCollectionData?.tasksName) {
                      patchTaskCollection(
                        { tasksId: id!, tasksName: field.value },
                        {
                          onSuccess: () => {
                            queryClient.invalidateQueries({
                              queryKey: QueryKeys.TasksQueryKeys.parent('get-task-collection'),
                            })
                          },
                          onError: (err:any) => logger.error(err),
                        }
                      )
                    }
                  }}
                />
              )}
            />

            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <input
                  className="text-sm text-muted-foreground"
                  {...field}
                  onBlur={() => {
                    if (field.value !== taskCollectionData?.details) {
                      patchTaskCollection(
                        { tasksId: id!, details: field.value },
                        {
                          onSuccess: () => {
                            queryClient.invalidateQueries({
                              queryKey: QueryKeys.TasksQueryKeys.parent('get-task-collection'),
                            })
                          },
                          onError: (err:any) => logger.error(err),
                        }
                      )
                    }
                  }}
                />
              )}
            />
          </div>
        </form>
      </Form>
      <Button onClick={onOpenDialog}>
        <Plus className="w-4 h-4 mr-2" />
        Add Task
      </Button>
    </div>
  )
}