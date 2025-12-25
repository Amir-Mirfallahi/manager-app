"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, User, Plus, ArrowUpIcon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"; // Use the Shadcn version!
import { Separator } from "@/components/ui/separator";

// Map Persian labels to temperature values
const TEMP_MAP = {
  اتوماتیک: 0.5,
  دقیق: 0,
  خلاق: 0.9,
};

export function ChatPage({
  onGenerateTasks,
}: {
  onGenerateTasks: (input: string, temp: number) => void;
}) {
  const [input, setInput] = useState("");
  const [tempLabel, setTempLabel] = useState<keyof typeof TEMP_MAP>("اتوماتیک");
  const [messages, setMessages] = useState([
    { role: "ai", text: "برنامه امروزت چیه؟" },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: input }]);

    // Pass both input and the mapped temperature value
    onGenerateTasks(input, TEMP_MAP[tempLabel]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-md mx-auto">
      <ScrollArea className="flex-1 p-4">
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

      <div className="p-4 border-t bg-background">
        <div className="relative border rounded-xl bg-muted/50 focus-within:ring-1 focus-within:ring-ring">
          <Textarea
            placeholder="درمورد امروز خود بنویسید..."
            className="min-h-[60px] w-full resize-none border-0 bg-transparent p-3 shadow-none focus-visible:ring-0"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              !e.shiftKey &&
              (e.preventDefault(), handleSend())
            }
          />

          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8"
              >
                <Plus className="h-4 w-4" />
              </Button>

              <Separator orientation="vertical" className="h-4 mx-1" />

              {/* Fixed Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1 text-xs"
                  >
                    {tempLabel}
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[120px]">
                  {Object.keys(TEMP_MAP).map((label) => (
                    <DropdownMenuItem
                      key={label}
                      onClick={() =>
                        setTempLabel(label as keyof typeof TEMP_MAP)
                      }
                      className="text-right justify-end"
                    >
                      {label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Button
              size="icon"
              className="rounded-full h-8 w-8"
              onClick={handleSend}
              disabled={!input.trim()}
            >
              <ArrowUpIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
