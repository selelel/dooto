'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ROUTES_CLIENT } from '@/constant/http';
import { useGetTaskCollection } from '@/modules/tasks/hooks';
import { POSTTasksCollectionResponseT, TaskStatus } from '@/modules/tasks/types';
import { List, Edit2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const COLOR_VARIANTS = ['primary', 'secondary', 'success', 'accent'] as const;
type ColorVariant = typeof COLOR_VARIANTS[number];

const getListColorClasses = (index: number) => {
  const color: ColorVariant = COLOR_VARIANTS[index % COLOR_VARIANTS.length]!;
  switch (color) {
    case 'primary':
      return {
        bg: 'bg-primary/10',
        active: 'bg-primary text-primary-foreground',
      };
    case 'secondary':
      return {
        bg: 'bg-secondary/10',
        active: 'bg-secondary text-secondary-foreground',
      };
    case 'success':
      return {
        bg: 'bg-success/10',
        active: 'bg-success text-success-foreground',
      };
    case 'accent':
      return {
        bg: 'bg-accent/10',
        active: 'bg-accent text-accent-foreground',
      };
  }
};

function TaskCollectionList() {
  const router = useRouter();
  const { data } = useGetTaskCollection();
  const taskCollection: POSTTasksCollectionResponseT[] = data?.data || [];

  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Set first list as active once data loads
  useEffect(() => {
    if (taskCollection.length > 0 && !selectedId) {
      setSelectedId(taskCollection[0]!.tasksId);
    }
    !!selectedId && router.push([ROUTES_CLIENT.PRIVATE.TASKS, selectedId].join('?id='))
  }, [taskCollection, selectedId]);

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <List className="w-4 h-4" />
          My Lists
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        {taskCollection.map((list, idx) => {
          const colors = getListColorClasses(idx);
          const isActive = selectedId === list.tasksId;
          const todoCount = list.tasks.filter(
            (t) => t.status !== TaskStatus.DONE
          ).length;

          return (
            <button
              key={list.tasksId}
              onClick={() => setSelectedId(list.tasksId)}
              className={`group w-full flex items-center justify-between px-3 py-2 rounded-lg transition ${
                isActive ? colors.active : `${colors.bg} hover:${colors.bg}`
              }`}
            >
              <span className="text-sm truncate">{list.tasksName}</span>

              <div className="flex items-center gap-2">
                {todoCount > 0 && (
                  <Badge variant="secondary" className="text-xs h-5">
                    {todoCount}
                  </Badge>
                )}
              </div>
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
}

export default TaskCollectionList;