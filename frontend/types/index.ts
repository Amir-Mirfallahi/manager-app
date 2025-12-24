export interface Task {
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  start_hour: string;
  end_hour: string;
  hours: number;
}
