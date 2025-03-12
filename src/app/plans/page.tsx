
"use client";

/*
<ai_context>
File is responsible for displaying a list of workout plans, previously using mock data.
Now it fetches real plans from the database via /api/plans.
</ai_context>
*/

import { useEffect, useState } from "react";
import Link from "next/link";

interface WorkoutPlan {
  id: number;
  userId: number;
  name: string;
  goals: string | null;
  frequency: number | null;
  duration: number | null;
  equipment: string | null;
  createdAt: string;
}

export default function PlansPage() {
  const [plans, setPlans] = useState<WorkoutPlan[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPlans() {
      try {
        const res = await fetch("/api/plans");
        if (!res.ok) {
          throw new Error("Failed to fetch plans");
        }
        const data: WorkoutPlan[] = await res.json();
        setPlans(data);
      } catch (err) {
        setError("Error fetching plans");
      }
    }
    fetchPlans();
  }, []);

  return (
    <div className="p-4 min-h-screen flex flex-col gap-8">
      <h1 className="text-2xl font-bold">Workout Plans</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-col gap-4">
        {plans.map((plan) => (
          <div key={plan.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{plan.name}</h2>
            <p className="mb-1">
              <strong>Goals:</strong> {plan.goals ?? "N/A"}
            </p>
            <p className="mb-1">
              <strong>Frequency:</strong>{" "}
              {plan.frequency !== null ? `${plan.frequency} times/week` : "N/A"}
            </p>
            <p className="mb-2">
              <strong>Equipment:</strong> {plan.equipment ?? "N/A"}
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
