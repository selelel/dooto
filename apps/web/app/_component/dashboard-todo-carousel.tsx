'use client';
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Progress } from '@/components/ui/progress';
import { CircleCheck, Circle } from 'lucide-react'
import React, { useEffect, useState }from 'react'

const tasks = [
    { id: 1, text: "Morning meditation", completed: true },
    { id: 2, text: "Review project proposal", completed: false },
    { id: 3, text: "Team meeting at 2pm", completed: false },
    { id: 4, text: "Work on design mockups", completed: false },
  ];
const completedTasks = tasks.filter((t) => t.completed).length;
const progress = (completedTasks / tasks.length) * 100;


function DashboardTodoCarousel() {
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

        return () => carouselApi.off("select", updateProgress);
        }, [carouselApi]);

    return (
        <Carousel setApi={setCarouselApi} opts={{ loop: true }} className="space-y-3">
            <Progress value={carouselProgress} className="h-2 bg-secondary/20" innerClassName='bg-secondary/30' />
            <CarouselContent>
                {Array.from({length: 3}, (_, idx) => (
                    <CarouselItem key={idx}>
                    <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle>Today's Tasks</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Progress</span>
                        <span className="text-sm">{completedTasks} of {tasks.length} completed</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    </div>

                    {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <div
                        key={task.id}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                        {task.completed ? (
                            <CircleCheck className="w-5 h-5 text-success shrink-0" />
                        ) : (
                            <Circle className="w-5 h-5 text-muted-foreground shrink-0" />
                        )}
                        <span
                            className={task.completed ? "line-through text-muted-foreground" : ""}
                        >
                            {task.text}
                        </span>
                        </div>
                    ))
                    ) : (
                    <div className="text-center py-8">
                        <Circle className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                        <p className="text-muted-foreground mb-2">No tasks yet</p>
                        <p className="text-sm text-muted-foreground">
                        Add your first task to get started!
                        </p>
                    </div>
                    )}

                    <Button className="w-full mt-4 bg-primary hover:bg-primary/90">
                    View All Tasks
                    </Button>
                </CardContent>
                </Card>
                </CarouselItem>))}
            </CarouselContent>
            </Carousel>
    )
    }

export default DashboardTodoCarousel