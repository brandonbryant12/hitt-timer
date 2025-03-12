
"use client";

/*
<ai_context>
File is responsible for displaying a list of workout plans, using mock data for demonstration.
</ai_context>
*/

import Link from "next/link";

interface WorkoutPlan {
  id: number;
  name: string;
  goals: string;
  frequency: number;
}

export default function PlansPage() {
  const mockPlans: WorkoutPlan[] = [
    {
      id: 1,
      name: "Beginner Strength",
      goals: "Build foundational strength",
      frequency: 3,
    },
    {
      id: 2,
      name: "Endurance Training",
      goals: "Improve cardio endurance",
      frequency: 4,
    },
    {
      id: 3,
      name: "Full Body Sculpt",
      goals: "Tone and strengthen entire body",
      frequency: 5,
    },
  ];

  return (
    <div className="p-4 min-h-screen flex flex-col gap-8">
      <h1 className="text-2xl font-bold">Workout Plans</h1>
      <div className="flex flex-col gap-4">
        {mockPlans.map((plan) => (
          <div key={plan.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{plan.name}</h2>
            <p className="mb-1">
              <strong>Goals:</strong> {plan.goals}
            </p>
            <p className="mb-2">
              <strong>Frequency:</strong> {plan.frequency} times/week
            </p>
            <Link
              href={`/plans/${plan.id}`}
              className="bg-foreground text-background px-3 py-1 rounded hover:opacity-80 inline-block"
            >
              View Plan
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
      