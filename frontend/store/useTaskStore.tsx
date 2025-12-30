// store/useTaskStore.ts
import { Task } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type sorting = "priority:asc" | "priority:desc" | "time:asc" | "time:desc";

interface TaskState {
  tasks: Task[];
  sorting: sorting;
  setTasks: (tasks: Task[]) => void;
  clearTasks: () => void;
  setSorting: (newSorting: sorting) => void;
  editTask: (id: string, updates: Partial<Task>) => void;
  removeTask: (id: string) => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      sorting: "priority:asc",
      setTasks: (newTasks) => set({ tasks: newTasks }),
      clearTasks: () => set({ tasks: [] }),
      setSorting: (newSorting) => set({ sorting: newSorting }),
      editTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          ),
        })),
      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
    }),
    { name: "task-storage" }
  )
);
