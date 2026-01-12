"use client";

import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { POSTTasksCollectionResponseT } from "@/modules/tasks/types";
import TaskCollection from "./task-collection";
import { UseQueryResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

function DashboardTodoCarousel({
  query,
}: {
  query: UseQueryResult<AxiosResponse<any, any, {}>, Error>;
}) {
  const { data, error } = query;
  const [carouselApi, setCarouselApi] = useState<any>(null);
  const [carouselProgress, setCarouselProgress] = useState(0);

  const taskCollection: POSTTasksCollectionResponseT[] = data?.data || [];

  useEffect(() => {
    if (!carouselApi) return;

    const updateProgress = () => {
      const total = carouselApi.scrollSnapList().length;
      const current = carouselApi.selectedScrollSnap();
      setCarouselProgress(((current + 1) / total) * 100);
    };

    updateProgress();
    carouselApi.on("select", updateProgress);

    const interval = setInterval(() => {
      carouselApi.scrollNext();
    }, 2500);

    return () => {
      carouselApi.off("select", updateProgress);
      clearInterval(interval);
    };
  }, [carouselApi]);

  if (error) return <p>Error loading tasks.</p>;
  if (!data) return <p>Loading tasks...</p>;
  if (taskCollection.length === 0)
    return (
      <div className='text-center py-8'>
        <p className='text-muted-foreground mb-2'>No task collections found.</p>
      </div>
    );

  return (
    <Carousel
      setApi={setCarouselApi}
      opts={{ loop: true }}
      className='space-y-3'
    >
      <Progress
        value={carouselProgress}
        className='h-2 bg-primary/20'
        innerClassName='bg-primary/30'
      />
      <CarouselContent className='h-full min-h-full'>
        {taskCollection.map((taskGroup) => (
          <CarouselItem key={taskGroup.tasksId}>
            <Card className='shadow-sm min-h-112'>
              <CardHeader>
                <CardTitle>{taskGroup.tasksName}</CardTitle>
                <CardDescription>{taskGroup.details}</CardDescription>
              </CardHeader>
              <CardContent className='space-y-3'>
                <TaskCollection taskGroup={taskGroup} />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default DashboardTodoCarousel;
