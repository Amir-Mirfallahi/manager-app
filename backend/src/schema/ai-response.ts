import { z } from "zod";

const TaskSchema = z.object({
  title: z.string(),
  description: z.string(),
  // Use an enum to force the AI to choose specific levels
  priority: z
    .enum(["High", "Medium", "Low"])
    .describe("The urgency of the task"),
  // Time fields
  start_hour: z
    .string()
    .describe("The start time in 24-hour format (e.g., 09:00)"),
  end_hour: z.string().describe("The end time in 24-hour format (e.g., 10:30)"),
  hours: z.number().describe("Total duration in hours"),
});

export const TaskListSchema = z.object({
  tasks: z
    .array(TaskSchema)
    .describe("A list of tasks, logically ordered by time."),
});
