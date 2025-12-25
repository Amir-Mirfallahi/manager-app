"use server";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { TaskListSchema } from "../schema/ai-response";
import "dotenv/config";

export async function extractAndScheduleTasks(
  userInput: string,
  temperature: number = 0
) {
  try {
    const model = new ChatOpenAI({
      model: "gpt-5-mini",
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      configuration: {
        baseURL: "https://api.avalai.ir/v1",
        defaultHeaders: {
          "HTTP-Referer": "https://taskflow-ai.ir/",
          "X-Title": "TaskFlow AI",
        },
      },
      temperature,
    });

    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `You are a scheduling assistant. 
      Your goal is to extract tasks from the user's input and:
      1. Assign a priority (High/Medium/Low) based on the user's tone and context.
      2. Assign a logical 'start_hour' and 'end_hour' for each task.
      3. If the user doesn't specify a start time, assume the day starts at 09:00 and sequence the tasks chronologically.
      4. Ensure tasks do not overlap.
      5. Return the tasks sorted by their start time.
      6. All of your response must be in Persian.`,
      ],
      ["human", "{input}"],
    ]);

    const structuredLlm = model.withStructuredOutput(TaskListSchema);
    const chain = prompt.pipe(structuredLlm);
    const response = await chain.invoke({ input: userInput });
    return response.tasks;
  } catch (error) {
    console.error(error);

    return [];
  }
}
