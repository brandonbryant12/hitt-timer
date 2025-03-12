
"use client";

/*
<ai_context>
File is responsible for the main workout session interface of "My Workout" app, including real-time exercise cues, voice notes, and navigation.
This file is updated to demonstrate Whisper WASM client-side integration for offline voice-to-text.
</ai_context>
*/

import { useState } from "react";
import { useWhisper } from "@/hooks/useWhisper";

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

  // placeholder for dynamic LLM-generated exercise cues
  const [exerciseCues] = useState<Record<number, string>>({
    1: "Keep your chest up",
    2: "Brace your core",
    3: "Maintain a neutral spine",
  });

  // placeholder for voice note input in textareas
  const [voiceNotes, setVoiceNotes] = useState<Record<number, string>>({});

  // Integrate the Whisper hook (client-side WASM logic)
  const {
    isRecording,
    transcript,
    startRecording,
    stopRecording,
    clearTranscript
  } = useWhisper();

  // Example: store the final transcript in the text area when we stop
  const finalizeTranscript = () => {
    if (!isRecording) {
      setVoiceNotes((prev) => ({
        ...prev,
        [currentExercise.id]: transcript,
      }));
      clearTranscript();
    }
  };

  const handleVoiceNoteChange = (exerciseId: number, note: string) => {
    setVoiceNotes((prev) => ({ ...prev, [exerciseId]: note }));
  };

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

  return (
    <div className="min-h-screen p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Workout Session</h1>
      <div className="border p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">{currentExercise.name}</h2>
        <p>Sets: {currentExercise.sets}</p>
        <p>Reps: {currentExercise.reps}</p>
        <p className="italic mb-2">{exerciseCues[currentExercise.id]}</p>

        <div className="flex gap-2 items-center mb-2">
          <button
            className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
            onClick={isRecording ? stopRecording : startRecording}
          >
            {isRecording ? "Stop Recording" : "Start Recording"}
          </button>
          <button
            className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
            onClick={finalizeTranscript}
            disabled={isRecording}
          >
            Use Transcript
          </button>
        </div>

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
      