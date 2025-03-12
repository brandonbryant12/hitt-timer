
"use client";

/*
<ai_context>
File is responsible for the multi-step workout creation wizard of "My Workout" app, including placeholders for voice-to-text input, skipping steps, and final submission.
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

  const handleSubmit = () => {
    console.log("Wizard Data:", formData);
    // After user finishes wizard, navigate to a placeholder workout session page
    router.push("/workout/session");
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
          <button
            onClick={handleSubmit}
            className="bg-foreground text-background px-4 py-2 rounded hover:opacity-80"
          >
            Submit
          </button>
          <button
            onClick={handleBack}
            className="bg-gray-300 px-3 py-1 rounded ml-2"
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
              disabled={step === 0}
              className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
            >
              Back
            </button>
            <div className="flex gap-2">
              <button
                onClick={handleSkip}
                className="bg-gray-300 px-3 py-1 rounded"
              >
                Skip
              </button>
              <button
                onClick={handleNext}
                className="bg-foreground text-background px-4 py-1 rounded hover:opacity-80"
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
      