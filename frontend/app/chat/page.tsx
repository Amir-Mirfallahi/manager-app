// app/chat/page.tsx
"use client";

import { useState } from "react";
import { ChatPage } from "@/components/chat/chat-page";
import { useTaskStore } from "@/store/useTaskStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { extractAndScheduleTasks } from "@/lib/extract";

export default function ChatPageRoute() {
  const [loading, setLoading] = useState(false);
  const setTasks = useTaskStore((state) => state.setTasks);
  const router = useRouter();

  const handleGenerate = async (input: string, temp: number) => {
    setLoading(true);
    try {
      const extractedTasks = await extractAndScheduleTasks(input, temp);
      const currentTasks = useTaskStore.getState().tasks;
      setTasks([...currentTasks, ...extractedTasks]);
      toast.success("با موفقیت ساخته شد");
      router.push("/");
    } catch (error) {
      console.error(error);

      toast.error("مشکلی در ساخت پیش آمد.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <ChatPage onGenerateTasks={handleGenerate} />
      {loading && (
        <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      )}
    </div>
  );
}
