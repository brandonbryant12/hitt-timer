
"use client";

/*
<ai_context>
File is responsible for the user dashboard home screen of "My Workout" app.
</ai_context>
*/

import Link from "next/link";

export default function DashboardPage() {
  // For now, we use placeholder data for "today's workout"
  const nextWorkout = {
    title: "Leg Day",
    scheduledDate: new Date().toLocaleDateString(),
  };

  return (
    <div className="p-4 min-h-screen flex flex-col gap-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <section className="border p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">Today's Workout</h2>
        <p className="mb-2">Workout: {nextWorkout.title}</p>
        <p className="mb-4">Scheduled for: {nextWorkout.scheduledDate}</p>
        <button className="bg-foreground text-background px-4 py-2 rounded transition-colors hover:opacity-80">
          Start Workout
        </button>
      </section>
      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Quick Actions</h2>
        <div className="flex gap-2">
          <Link
            href="/plans"
            className="bg-gray-200 dark:bg-gray-800 px-4 py-2 rounded text-center hover:opacity-80"
          >
            View Workout Plans
          </Link>
          <Link
            href="/plans/new"
            className="bg-gray-200 dark:bg-gray-800 px-4 py-2 rounded text-center hover:opacity-80"
          >
            Create New Plan
          </Link>
        </div>
      </section>
    </div>
  );
}
      