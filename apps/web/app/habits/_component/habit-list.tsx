import React from "react";
import HabitItem from "./habit-item";
import { useHabits } from "../_context/habit-context";

function HabitList() {
  const { habitsData } = useHabits();
  const habits = habitsData || [];

  return (
    <div className='space-y-4'>
      {habits.map((habit) => (
        <HabitItem key={habit.id} id={habit.id} />
      ))}
    </div>
  );
}

export default HabitList;
