import { Task } from "@/types";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DrawerClose } from "../ui/drawer";
import { Button } from "../ui/button";

const TaskSchema = z.object({
  title: z.string(),
  description: z.string(),
  priority: z.enum(["High", "Medium", "Low"]),
  start_hour: z.string(),
  end_hour: z.string(),
});

const TaskEditForm = ({
  oldValues,
  onSubmit,
}: {
  oldValues?: Omit<Task, "id">;
  onSubmit: (data: Omit<Task, "id">) => void;
}) => {
  const { register, handleSubmit } = useForm({
    mode: "onBlur",
    defaultValues: oldValues,
    resolver: zodResolver(TaskSchema),
  });
  console.log(oldValues);

  return (
    <form className="flex flex-col gap-3">
      <Input label="عنوان" {...register("title")} />
      <Input label="توضیحات" {...register("description")} />
      <Select {...register("priority")} defaultValue={oldValues?.priority}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="لولویت" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="High">زیاد</SelectItem>
          <SelectItem value="Medium">متوسط</SelectItem>
          <SelectItem value="Low">کم</SelectItem>
        </SelectContent>
      </Select>
      <Input label="ساعت شروع" {...register("start_hour")} />
      <Input label="ساعت پایان" {...register("end_hour")} />
      <DrawerClose asChild>
        <Button
          onClick={handleSubmit((data) => {
            onSubmit(data);
          })}
        >
          تایید
        </Button>
      </DrawerClose>
    </form>
  );
};

export default TaskEditForm;
