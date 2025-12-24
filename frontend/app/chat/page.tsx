// app/chat/page.tsx
"use client";

import { useState } from "react";
import { ChatPage } from "@/components/chat/chat-page";
import { useTaskStore } from "@/store/useTaskStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // Assuming you have Shadcn sonner installed
import { extractAndScheduleTasks } from "@/services/extract-tasks";

export default function ChatPageRoute() {
  const [loading, setLoading] = useState(false);
  const setTasks = useTaskStore((state) => state.setTasks);
  const router = useRouter();

  const handleGenerate = async (input: string) => {
    setLoading(true);
    try {
      const extractedTasks = await extractAndScheduleTasks(input);
      setTasks(extractedTasks);
      toast.success("با موفقیت ساخته شد");
      router.push("/"); // Redirect to see the tasks
    } catch (error) {
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
