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
import TaskCollection from "./task-collection";
import { useTasks } from "../tasks/_hooks/useTasks";
import { Skeleton } from "@/components/ui/skeleton";
import { Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES_CLIENT } from "@/constant/http";
import { useRouter } from "next/navigation";

function DashboardTodoCarousel() {
  const router = useRouter();
  const { tasksCollection, isTaskCollectionLoading } = useTasks();
  const [carouselApi, setCarouselApi] = useState<any>(null);
  const [carouselProgress, setCarouselProgress] = useState(0);

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
      {isTaskCollectionLoading ? (
        <div>
          <Skeleton className='h-100 ' />
        </div>
      ) : tasksCollection.length === 0 ? (
        <Card className='shadow-sm min-h-112 flex items-center justify-center'>
          <div className='text-center space-y-4 max-w-sm'>
            <Circle className='w-14 h-14 mx-auto text-muted-foreground/40' />

            <CardHeader className='p-0'>
              <h3 className='text-lg font-semibold'>No task collections yet</h3>
            </CardHeader>

            <CardContent className='p-0 text-sm text-muted-foreground'>
              Create your first task collection to start organizing your work
              and tracking progress.
            </CardContent>

            <Button
              onClick={() => router.push(ROUTES_CLIENT.PRIVATE.TASKS)}
              className='mt-2'
            >
              Create task collection
            </Button>
          </div>
        </Card>
      ) : (
        <CarouselContent className='h-full min-h-full'>
          {tasksCollection.map((taskGroup) => (
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
      )}
    </Carousel>
  );
}

export default DashboardTodoCarousel;
