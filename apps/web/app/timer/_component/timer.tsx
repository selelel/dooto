import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { POSTTimerResponse } from "@/modules/timer/types";
import { Trash2, RotateCcw } from "lucide-react";
import React, { useState } from "react";
import { useSinceTimer } from "../_hooks/use-since-timer";
import TimerViewDialog from "./timer-view-dialog";
import { useTimer } from "../_context/timer-context";

function Timer({ data }: { data: POSTTimerResponse }) {
  const { handleRelapseTimer, handleDeleteTimer } = useTimer();
  const [open, openOnChange] = useState(false);
  const { days, hours, minutes, seconds } = useSinceTimer(
    new Date(data.lastRelapseAt)
  );

  return (
    <>
      <TimerViewDialog open={open} onOpenChange={openOnChange} data={data} />
      <Card className='pop-up-scale-animation shadow-md border-l-4 bg-success/50 border border-success group justify-between'>
        <CardHeader className='pb-3'>
          <div className='flex items-start justify-between'>
            <div className='flex-1'>
              <CardTitle className='text-lg'>{data.habitName}</CardTitle>
              <p className='text-xs text-muted-foreground mt-1'>
                Since {new Date(data.lastRelapseAt).toLocaleDateString()}
              </p>
            </div>

            <Button
              variant='ghost'
              size='sm'
              onClick={() => handleDeleteTimer(data.id)}
              className='opacity-0 group-hover:opacity-100 transition-opacity'
            >
              <Trash2 className='w-4 h-4 text-destructive' />
            </Button>
          </div>
        </CardHeader>

        <CardContent
          className='cursor-pointer'
          onClick={() => {
            openOnChange(true);
          }}
        >
          <div className='text-center mb-4'>
            {days > 0 ? (
              <>
                <div className='text-5xl font-bold'>{days}</div>
                <div className='text-xl text-muted-foreground mt-1'>
                  {days === 1 ? "Day" : "Days"}
                </div>
                <div className='text-xl font-bold'>
                  {hours}h {minutes}m {seconds}s
                </div>
              </>
            ) : hours > 0 ? (
              <>
                <div className='text-5xl font-bold'>
                  {hours}h {minutes}m {seconds}s
                </div>
                <div className='text-xl text-muted-foreground mt-1'>Hours</div>
              </>
            ) : minutes > 0 ? (
              <>
                <div className='text-5xl font-bold'>
                  {minutes}m {seconds}s
                </div>
                <div className='text-xl text-muted-foreground mt-1'>
                  Minutes
                </div>
              </>
            ) : (
              <>
                <div className='text-5xl font-bold'>{seconds}s</div>
                <div className='text-xl text-muted-foreground mt-1'>
                  Seconds
                </div>
              </>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => {
              handleRelapseTimer(data.id);
            }}
            variant='outline'
            className='w-full'
          >
            <RotateCcw className='w-4 h-4 mr-2' />
            Reset Timer
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default Timer;
