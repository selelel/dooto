"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import TimerCreateDialog from "./timer-create-dialog";

function TimerCreate() {
  const [open, onOpenChange] = useState(false);

  return (
    <>
      <TimerCreateDialog open={open} onOpenChange={onOpenChange} />
      <div className='w-full flex justify-end mb-6'>
        <Button
          onClick={() => onOpenChange(true)}
          className='bg-primary hover:bg-primary/90 h-10 px-4'
        >
          <Plus className='w-4 h-4 mr-2' />
          Add Timer
        </Button>
      </div>
    </>
  );
}

export default TimerCreate;
