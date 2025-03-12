
"use client";

/*
<ai_context>
File is responsible for the multi-step workout creation wizard of "My Workout" app,
previously just logging data. Now we POST to /api/plans to create a real plan in the database.
</ai_context>
*/

import { useState } from "react";
import { useRouter } from "next/navigation";

interface WizardData {
  name: string;
  goals: string;
  equipment: string;
}

export default function WorkoutWizardPage() {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<WizardData>({
    name: "",
    goals: "",
    equipment: "",
  });

  const steps = [
    {
      label: "Workout Name",
      content: (
        <textarea
          className="w-full border rounded p-2"
          rows={3}
          placeholder="e.g., 'Leg Day Routine'"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ),
    },
    {
      label: "Workout Goals",
      content: (
        <textarea
          className="w-full border rounded p-2"
          rows={3}
          placeholder="e.g., 'Build muscle, improve endurance'"
          value={formData.goals}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, goals: e.target.value }))
          }
        />
      ),
    },
    {
      label: "Equipment",
      content: (
        <textarea
          className="w-full border rounded p-2"
          rows={3}
          placeholder="e.g., 'Barbells, Dumbbells, Resistance Bands'"
          value={formData.equipment}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, equipment: e.target.value }))
          }
        />
      ),
    },
  ];

  const isLastStep = step === steps.length;

  const handleNext = () => {
    if (step < steps.length) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const handleSubmit = async () => {
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Hardcoded userId = 1 for now
          userId: 1,
          name: formData.name,
          goals: formData.goals,
          equipment: formData.equipment
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create workout plan");
      }

      // We could parse the created plan if needed, or just navigate
      // const createdPlan = await res.json();

      router.push("/workout/session");
    } catch (err) {
      setError("Unable to create plan. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Workout Creation Wizard</h1>

      {isLastStep ? (
        <div className="border rounded p-4">
          <h2 className="text-xl font-semibold mb-2">Confirm Your Workout</h2>
          <p className="mb-1">
            <strong>Name:</strong> {formData.name}
          </p>
          <p className="mb-1">
            <strong>Goals:</strong> {formData.goals}
          </p>
          <p className="mb-4">
            <strong>Equipment:</strong> {formData.equipment}
          </p>

          {error && <p className="text-red-500 mb-2">{error}</p>}

          <button
            onClick={handleSubmit}
            className="bg-foreground text-background px-4 py-2 rounded hover:opacity-80 disabled:opacity-50"
            disabled={submitting}
          >
            Submit
          </button>
          <button
            onClick={handleBack}
            className="bg-gray-300 px-3 py-1 rounded ml-2"
            disabled={submitting}
          >
            Back
          </button>
        </div>
      ) : (
        <div className="border rounded p-4">
          <h2 className="text-xl font-semibold mb-2">{steps[step].label}</h2>
          {steps[step].content}
          <div className="flex justify-between mt-4">
            <button
              onClick={handleBack}
              disabled={step === 0 || submitting}
              className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
            >
              Back
            </button>
            <div className="flex gap-2">
              <button
                onClick={handleSkip}
                className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
                disabled={submitting}
              >
                Skip
              </button>
              <button
                onClick={handleNext}
                className="bg-foreground text-background px-4 py-1 rounded hover:opacity-80 disabled:opacity-50"
                disabled={submitting}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
