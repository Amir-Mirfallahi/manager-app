import { Task } from "@/types";

export const extractAndScheduleTasks = async (
  input: string,
  temperature: number
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}extract`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input, temperature }),
      }
    );

    // Check response
    if (!response.ok) {
      console.error("Server error:", response.statusText);
      return [];
    }

    // Get tasks from backend
    const tasks: Task[] = await response.json();

    return tasks;
  } catch (error) {
    return [];
  }
};
