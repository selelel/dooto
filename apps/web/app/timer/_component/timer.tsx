import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { POSTTimerResponse } from "@/modules/timer/types";
import { Trash2, RotateCcw } from "lucide-react";
import React from "react";
import { useSinceTimer } from "../_hooks/use-since-timer";

function Timer({ data }: { data: POSTTimerResponse }) {
  const { days, hours, minutes, seconds } = useSinceTimer(
    new Date(data.lastRelapseAt)
  );

  return (
    <Card className='shadow-md border-l-4 border-success bg-success group'>
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
            onClick={() => console.log("delete")}
            className='opacity-0 group-hover:opacity-100 transition-opacity'
          >
            <Trash2 className='w-4 h-4 text-destructive' />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
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
              <div className='text-xl text-muted-foreground mt-1'>Minutes</div>
            </>
          ) : (
            <>
              <div className='text-5xl font-bold'>{seconds}s</div>
              <div className='text-xl text-muted-foreground mt-1'>Seconds</div>
            </>
          )}
        </div>

        <Button variant='outline' className='w-full'>
          <RotateCcw className='w-4 h-4 mr-2' />
          Reset Timer
        </Button>
      </CardContent>
    </Card>
  );
}

export default Timer;
