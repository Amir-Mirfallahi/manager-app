// components/chat/chat-page.tsx
"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, User, Plus, ArrowUpIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "../ui/input-group";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Separator,
} from "@radix-ui/react-dropdown-menu";

export function ChatPage({
  onGenerateTasks,
}: {
  onGenerateTasks: (input: string) => void;
}) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { role: "ai" | "user"; text: string }[]
  >([
    {
      role: "ai",
      text: "What's on your schedule for today? I'll organize it for you.",
    },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: input }]);
    onGenerateTasks(input); // Trigger your LangChain logic
    setInput("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-md mx-auto">
      <ScrollArea className="flex-1 p-4 space-y-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex gap-3 mb-4 ${
              m.role === "user" ? "flex-row-reverse" : ""
            }`}
          >
            <div
              className={`p-2 rounded-full h-8 w-8 flex items-center justify-center ${
                m.role === "ai"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              {m.role === "ai" ? <Bot size={16} /> : <User size={16} />}
            </div>
            <div
              className={`p-3 rounded-lg max-w-[80%] text-sm ${
                m.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </ScrollArea>

      <div className="p-4 border-t bg-background flex gap-2">
        <InputGroup>
          <InputGroupTextarea
            placeholder="درمورد امروز خود بنویسید..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <InputGroupAddon align="block-end">
            <InputGroupButton
              variant="outline"
              className="rounded-full"
              size="icon-xs"
            >
              <Plus />
            </InputGroupButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <InputGroupButton variant="ghost">اتوماتیک</InputGroupButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="start"
                className="[--radius:0.95rem]"
              >
                <DropdownMenuItem>اتوماتیک</DropdownMenuItem>
                <DropdownMenuItem>دقیق</DropdownMenuItem>
                <DropdownMenuItem>خلاق</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Separator aria-orientation="vertical" className="h-4!" />
            <InputGroupButton
              variant="default"
              className="rounded-full"
              size="icon-xs"
              disabled
            >
              <ArrowUpIcon />
              <span className="sr-only cursor-pointer" onClick={handleSend}>
                ارسال
              </span>
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
}
