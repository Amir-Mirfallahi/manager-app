import { Clock, Ellipsis } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Task } from "@/types";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

const TaskCard = ({
  task,
  handleRemove,
  handleEdit,
}: {
  task: Task;
  handleRemove: (e: Event) => void;
  handleEdit: (e: Event) => void;
}) => {
  return (
    <Card
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
      <CardHeader className="p-2 pb-1 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg font-semibold">{task.title}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="rounded-full cursor-pointer hover:scale-110 hover:text-white"
              size="icon"
            >
              <Ellipsis className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" side="bottom">
            <DropdownMenuGroup>
              <DropdownMenuItem onSelect={handleEdit}>ویرایش</DropdownMenuItem>
              <DropdownMenuItem
                onSelect={handleRemove}
                className="text-red-500"
              >
                حذف
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-2 pt-0 space-y-2">
        <p className="text-sm text-muted-foreground">{task.description}</p>
        <div className="flex items-center gap-2 text-xs font-medium text-primary">
          <Clock className="h-3 w-3" />
          <span>
            {task.start_hour} - {task.end_hour}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
