
/*
<ai_context>
File provides a utility function to communicate with OpenAI's LLM API for dynamic workout plan and exercise cue generation based on structured user prompts.
This file is now refactored to use the 'ai' npm module and '@ai-sdk/openai'.
</ai_context>
*/

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

/**
 * Example function to generate a workout plan from structured user data.
 * This uses the 'ai' library with the '@ai-sdk/openai' model provider.
 */
export async function generateWorkoutPlan(prompt: string): Promise<string> {
  try {
    const { text } = await generateText({
      model: openai("gpt-3.5-turbo"),
      system: "You are a helpful assistant that generates workout plans based on user input.",
      prompt,
      temperature: 0.7
    });

    return text.trim();
  } catch (error) {
    console.error("AI library error:", error);
    throw new Error("Failed to generate workout plan");
  }
}
      