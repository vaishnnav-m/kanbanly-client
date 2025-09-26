"use client";
import { BoardColumn } from "@/components/molecules/kanban/BoardColumn";
import { BoardTask } from "@/types/board.types";
import { TaskStatus } from "@/types/task.enum";
import { useState } from "react";

export const BoardView = ({
  tasksData,
  handleStatusChange,
}: {
  tasksData: BoardTask[];
  handleStatusChange: (status: TaskStatus, taskId: string) => void;
}) => {
  const [tasks, setTasks] = useState<BoardTask[]>(tasksData);

  return (
    <div className="w-full h-full flex gap-3">
      <BoardColumn
        tasks={tasks}
        title="TO DO"
        status={TaskStatus.Todo}
        headingColor="text-yellow-200"
        setTasks={setTasks}
        handleStatusChange={handleStatusChange}
      />
      <BoardColumn
        tasks={tasks}
        title="IN PROGRESS"
        status={TaskStatus.InProgress}
        headingColor="text-blue-200"
        setTasks={setTasks}
        handleStatusChange={handleStatusChange}
      />
      <BoardColumn
        tasks={tasks}
        title="COMPLETED"
        status={TaskStatus.Completed}
        headingColor="text-emerald-200"
        setTasks={setTasks}
        handleStatusChange={handleStatusChange}
      />
    </div>
  );
};
