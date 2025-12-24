// store/useTaskStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Task {
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  start_hour: string;
  end_hour: string;
  hours: number;
}

interface TaskState {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  clearTasks: () => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      setTasks: (newTasks) => set({ tasks: newTasks }),
      clearTasks: () => set({ tasks: [] }),
    }),
    { name: "task-storage" }
  )
);
