import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleTaskExtractionController } from "./controllers/task-extraction";
const app = express();
app.use(express.json());
app.use(cors());

app.post("/extract", handleTaskExtractionController);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
