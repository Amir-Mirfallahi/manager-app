import { Request, Response } from "express";
import { extractAndScheduleTasks } from "../services/extract-tasks";

export const handleTaskExtractionController = async (
  req: Request,
  res: Response
) => {
  try {
    const { input, temperature } = req.body;
    const tasks = await extractAndScheduleTasks(input, temperature);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "AI Processing Failed" });
  }
};
