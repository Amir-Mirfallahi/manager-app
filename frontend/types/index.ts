import { UUID } from "crypto";

export interface Task {
  id?: UUID;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  start_hour: string;
  end_hour: string;
}
