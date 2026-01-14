"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES_CLIENT } from "@/constant/http";
import { TaskStatus } from "@/modules/tasks/types";
import { List } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TaskCollectionCreateDialog from "./taskcollection-create-dialog";
import { useTasks } from "../_hooks/useTasks";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const COLOR_VARIANTS = ["primary", "secondary", "success", "accent"] as const;
type ColorVariant = (typeof COLOR_VARIANTS)[number];

const getListColorClasses = (index: number) => {
  const color: ColorVariant = COLOR_VARIANTS[
    index % COLOR_VARIANTS.length
  ] as ColorVariant;
  return {
    primary: {
      bg: "bg-primary/10",
      active: "bg-primary text-primary-foreground",
    },
    secondary: {
      bg: "bg-secondary/10",
      active: "bg-secondary text-secondary-foreground",
    },
    success: {
      bg: "bg-success/10",
      active: "bg-success text-success-foreground",
    },
    accent: {
      bg: "bg-accent/10",
      active: "bg-accent text-accent-foreground",
    },
  }[color];
};

function TaskCollectionList() {
  const router = useRouter();
  const [open, onOpenChange] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const {
    tasksCollection,
    isCreatingTaskCollectionLoading,
    isTaskCollectionLoading,
  } = useTasks();

  useEffect(() => {
    if (!selectedId && tasksCollection.length > 0) {
      setSelectedId(tasksCollection[0]!.tasksId);
    }
  }, [tasksCollection, selectedId]);

  useEffect(() => {
    if (!selectedId) return;
    router.push([ROUTES_CLIENT.PRIVATE.TASKS, selectedId].join("?id="));
  }, [selectedId, router]);

  return (
    <>
      <TaskCollectionCreateDialog open={open} onOpenChange={onOpenChange} />

      <Card className='shadow-sm'>
        <CardHeader>
          <CardTitle className='text-lg flex items-center gap-2'>
            <List className='w-4' />
            My Lists
          </CardTitle>
        </CardHeader>

        <CardContent className='space-y-2'>
          {isTaskCollectionLoading && (
            <>
              {Array.from({ length: 1 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className={cn(
                    "h-9 w-full rounded-lg",
                    getListColorClasses(i).bg
                  )}
                />
              ))}
            </>
          )}

          {!isTaskCollectionLoading &&
            tasksCollection.map((list, idx) => {
              const colors = getListColorClasses(idx);
              const isActive = selectedId === list.tasksId;
              const todoCount =
                list.tasks?.filter((t) => t.status !== TaskStatus.DONE)
                  .length ?? 0;

              return (
                <button
                  key={list.tasksId}
                  type='button'
                  onClick={() => setSelectedId(list.tasksId)}
                  className={cn(
                    "group w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all",
                    "hover:opacity-90",
                    isActive ? colors.active : colors.bg
                  )}
                >
                  <span className='text-sm truncate'>{list.tasksName}</span>

                  {todoCount > 0 && (
                    <Badge variant='secondary' className='text-xs h-5'>
                      {todoCount}
                    </Badge>
                  )}
                </button>
              );
            })}

          {isCreatingTaskCollectionLoading && (
            <Skeleton
              className={cn(
                "h-9 w-full rounded-lg",
                getListColorClasses(tasksCollection.length).bg
              )}
            />
          )}

          {!isTaskCollectionLoading && tasksCollection.length === 0 && (
            <p className='text-sm text-center text-muted-foreground py-4'>
              No task lists yet
            </p>
          )}

          <Button
            variant='outline'
            onClick={() => onOpenChange(true)}
            className='w-full text-sm'
          >
            Create Task List
          </Button>
        </CardContent>
      </Card>
    </>
  );
}

export default TaskCollectionList;
