// components/tasks/task-list.tsx
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useTaskStore } from "@/store/useTaskStore";

interface Task {
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  start_hour: string;
  end_hour: string;
}

export function TaskPage({ tasks }: { tasks: Task[] }) {
  const clearTasks = useTaskStore((state) => state.clearTasks);
  const priorityColors = {
    High: "destructive",
    Medium: "secondary",
    Low: "outline",
  } as const;

  const priorityTexts = {
    High: "زیاد",
    Medium: "متوسط",
    Low: "کم",
  } as const;

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
        <Card
          key={idx}
          className="overflow-hidden border-l-4"
          style={{
            borderLeftColor:
              task.priority === "High"
                ? "red"
                : task.priority === "Medium"
                ? "orange"
                : "gray",
          }}
        >
          <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg font-semibold">
              {task.title}
            </CardTitle>
            <Badge variant={priorityColors[task.priority]}>
              {priorityTexts[task.priority]}
            </Badge>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-2">
            <p className="text-sm text-muted-foreground">{task.description}</p>
            <div className="flex items-center gap-2 text-xs font-medium text-primary">
              <Clock className="h-3 w-3" />
              <span>
                {task.start_hour} - {task.end_hour}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
