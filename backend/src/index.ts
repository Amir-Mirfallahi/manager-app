import "dotenv/config";
import express from "express";
import { Request, Response } from "express";
import { extractAndScheduleTasks } from "./services/extract-tasks";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

export const handleTaskExtraction = async (req: Request, res: Response) => {
  try {
    const { input, temperature } = req.body;
    const tasks = await extractAndScheduleTasks(input, temperature);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "AI Processing Failed" });
  }
};

app.post("/extract", handleTaskExtraction);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
