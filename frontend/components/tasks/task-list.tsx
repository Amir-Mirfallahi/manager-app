// components/tasks/task-list.tsx
"use client";
import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useTaskStore } from "@/store/useTaskStore";
import { useShallow } from "zustand/react/shallow";
import TaskCard from "./task-card";
import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { Task } from "@/types";
import { Input } from "../ui/input";
import TaskEditForm from "../forms/task-edit-form";
import { toast } from "sonner";

export function TaskPage({ tasks }: { tasks: Task[] }) {
  const { clearTasks, removeTask, editTask } = useTaskStore(
    useShallow((state) => ({
      clearTasks: state.clearTasks,
      removeTask: state.removeTask,
      editTask: state.editTask,
    }))
  );
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task>();

  const onRemove = (task: Task) => {
    setSelectedTask(task);
    setShowRemoveModal(true);
  };

  const onEdit = (task: Task) => {
    setSelectedTask(task);
    setShowEditModal(true);
  };

  const handleEditTask = (newTask: Omit<Task, "id">) => {
    console.error(newTask);
    console.error(selectedTask);

    selectedTask?.id
      ? editTask(selectedTask?.id, newTask)
      : toast.error("مشکلی در ویرایش تسک به وجود آمد.");
  };

  return (
    <div className="container max-w-md p-4 space-y-4 pb-20">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-6">امروز شما</h1>
        <Button variant="outline" color="danger" onClick={clearTasks}>
          <Trash />
        </Button>
      </div>
      {tasks.length === 0 && (
        <p className="text-muted-foreground text-center">
          هنوز تسکی وجود ندارد
        </p>
      )}

      {tasks.map((task, idx) => (
        <TaskCard
          task={task}
          key={idx}
          handleRemove={() => onRemove(task)}
          handleEdit={() => onEdit(task)}
        />
      ))}
      {/* Drawer for removing */}
      <Drawer open={showRemoveModal} onOpenChange={setShowRemoveModal}>
        <DrawerContent>
          <div className="flex flex-col gap-3 py-4 w-3xs mx-auto text-center">
            <DrawerTitle>حذف تسک</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="destructive" size="lg" className="max-w-3xs">
                کنسل
              </Button>
            </DrawerClose>
            <Button
              onClick={() =>
                selectedTask?.id
                  ? removeTask(selectedTask.id)
                  : setShowRemoveModal(false)
              }
              variant="secondary"
              size="lg"
              className="max-w-3xs"
            >
              حذف
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
      {/* Drawer for Editing */}
      <Drawer open={showEditModal} onOpenChange={setShowEditModal}>
        <DrawerContent className="px-12 py-4">
          <DrawerTitle>ویرایش تسک {selectedTask?.title}</DrawerTitle>
          <TaskEditForm
            onSubmit={handleEditTask}
            oldValues={
              selectedTask && {
                title: selectedTask.title,
                description: selectedTask.description,
                start_hour: selectedTask.start_hour,
                end_hour: selectedTask.end_hour,
                priority: selectedTask.priority,
              }
            }
          />
          <DrawerClose asChild>
            <Button variant="destructive" className="mt-4">
              کنسل
            </Button>
          </DrawerClose>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
