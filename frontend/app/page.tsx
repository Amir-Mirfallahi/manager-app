// app/page.tsx
"use client";

import { useTaskStore } from "@/store/useTaskStore";
import { TaskPage } from "@/components/tasks/task-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const tasks = useTaskStore((state) => state.tasks);

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4 text-center">
        <h2 className="text-xl font-semibold">امروز تسکی وجود نداره!</h2>
        <p className="text-muted-foreground mb-4">
          با هوش مصنوعی تسکی صحبت کنید تا تسکاتون رو اضافه کنه
        </p>
        <Button asChild>
          <Link href="/chat">
            <Plus className="mr-2 h-4 w-4" /> صحبت با تسکی
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <TaskPage tasks={tasks} />
    </div>
  );
}
