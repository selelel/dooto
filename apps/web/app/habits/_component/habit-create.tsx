"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import HabitCreateDialog from "./habit-create-dialog";

function HabitCreate() {
  const [open, onOpenChange] = useState(false);

  return (
    <>
      <HabitCreateDialog open={open} onOpenChange={onOpenChange} />
      <div className='w-full flex justify-end mb-6'>
        <Button
          onClick={() => onOpenChange(true)}
          className='bg-primary hover:bg-primary/90 h-10 px-4'
        >
          <Plus className='w-4 h-4 mr-2' />
          Add Habit
        </Button>
      </div>
    </>
  );
}

export default HabitCreate;
