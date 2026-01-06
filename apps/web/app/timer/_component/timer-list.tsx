import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, RotateCcw } from "lucide-react";
import React from "react";
import { useTimer } from "../_context/timer-context";
import { Button } from "@/components/ui/button";
import Timer from "./timer";

function TimerList() {
  const { data } = useTimer();
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      {data.map((d, index) => (
        <Timer key={index} data={d} />
      ))}
    </div>
  );
}

export default TimerList;
