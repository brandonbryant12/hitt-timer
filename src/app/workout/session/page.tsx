
"use client";

/*
<ai_context>
File is responsible for the main workout session interface of "My Workout" app, including real-time exercise cues, voice notes, and navigation.
</ai_context>
*/

import { useState } from "react";

interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: number;
  description?: string;
}

export default function WorkoutSessionPage() {
  const exercises: Exercise[] = [
    { id: 1, name: "Squats", sets: 4, reps: 10, description: "Focus on form" },
    { id: 2, name: "Bench Press", sets: 3, reps: 12, description: "Keep your back flat" },
    { id: 3, name: "Deadlift", sets: 3, reps: 8 },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentExercise = exercises[currentIndex];

  // placeholder for voice note input
  const [voiceNotes, setVoiceNotes] = useState<Record<number, string>>({});

  // placeholder for dynamic LLM-generated exercise cues
  const [exerciseCues, setExerciseCues] = useState<Record<number, string>>({
    1: "Keep your chest up",
    2: "Brace your core",
    3: "Maintain a neutral spine",
  });

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleVoiceNoteChange = (exerciseId: number, note: string) => {
    setVoiceNotes((prev) => ({ ...prev, [exerciseId]: note }));
  };

  return (
    <div className="min-h-screen p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Workout Session</h1>
      <div className="border p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">{currentExercise.name}</h2>
        <p>Sets: {currentExercise.sets}</p>
        <p>Reps: {currentExercise.reps}</p>
        <p className="italic mb-2">{exerciseCues[currentExercise.id]}</p>
        <textarea
          className="w-full border rounded p-2 mb-2"
          rows={3}
          placeholder="Voice note transcription..."
          value={voiceNotes[currentExercise.id] || ""}
          onChange={(e) =>
            handleVoiceNoteChange(currentExercise.id, e.target.value)
          }
        />
        <div className="flex justify-between">
          <button
            className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
            disabled={currentIndex === 0}
            onClick={handlePrevious}
          >
            Previous
          </button>
          <button
            className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
            disabled={currentIndex === exercises.length - 1}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
      