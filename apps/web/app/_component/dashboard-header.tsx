import React from 'react'

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning ☀️";
  if (hour < 18) return "Good afternoon 🌤️";
  return "Good evening 🌙";
}

function DashboardHeader() {
    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
  return (
    <div className="mb-8">
        <h1 className="font-semibold text-4xl mb-2">{getGreeting()}</h1>
        <p className="text-muted-foreground">{today}</p>
      </div>
  )
}

export default DashboardHeader