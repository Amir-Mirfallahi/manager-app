// store/useTaskStore.ts
import { Task } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

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
