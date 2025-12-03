"use client";
import { useSelector } from "react-redux";
import { Dispatch, SetStateAction } from "react";
import { TaskCreationPayload } from "@/lib/api/task/task.types";
import { Button } from "@/components/atoms/button";
import { BoardColumn } from "@/components/molecules/kanban/BoardColumn";
import { useTaskPageContext } from "@/contexts/TaskPageContext";
import { RootState } from "@/store";
import { BoardTask } from "@/types/board.types";
import { TaskPriority, TaskStatus } from "@/types/task.enum";

interface BoardViewProps {
  tasksData: BoardTask[];
  createTask: (task: TaskCreationPayload) => void;
  isCreating: boolean;
  handleStatusChange: (status: TaskStatus, taskId: string) => void;
  setActiveTab: Dispatch<SetStateAction<string>>;
}

export const BoardView = ({
  tasksData,
  handleStatusChange,
  createTask,
  setActiveTab,
}: BoardViewProps) => {
  const { activeSprint } = useTaskPageContext();

  const handleCreateTask = (task: TaskCreationPayload) => {
    const newTask: TaskCreationPayload = {
      task: task.task,
      status: task.status,
      workItemType: task.workItemType,
      priority: TaskPriority.low,
      assignedTo: task.assignedTo,
      ...(activeSprint && { sprintId: activeSprint.sprintId }),
    };
    createTask(newTask);
  };

  const template = useSelector(
    (state: RootState) => state.project.projectTemplate
  );

  return (
    <div className="w-full h-full flex gap-3">
      {template === "scrum" && !activeSprint ? (
        <div className="w-full h-full flex flex-col items-center justify-center dark:bg-gray-800/20 rounded-lg border-2 border-dashed border-gray-700 text-center p-8">
          {/* Icon representing planning or a sprint */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-500 mb-4"
          >
            <path d="M12.5 2.5l-.5.5-1 2-.5.5-3 6-.5.5-2 4h18l-2-4-.5-.5-3-6-.5-.5-1-2-.5-.5zM5.5 16.5l1-2" />
            <path d="M17.5 14.5l1 2" />
            <path d="M9.5 10.5l1 2" />
            <path d="M13.5 10.5l1 2" />
            <path d="M3 21.5h18" />
          </svg>
          <h2 className="text-2xl font-bold text-white mb-2">
            Time to Plan Your Sprint!
          </h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Your board is ready. Gather your team, choose tasks from the
            backlog, and set a goal to get started on your next sprint.
          </p>
          <Button
            onClick={() => setActiveTab("Backlog")}
            className="mt-6 px-5 py-2.5 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
          >
            Plan Sprint
          </Button>
        </div>
      ) : (
        <>
          <BoardColumn
            tasks={tasksData}
            createTask={handleCreateTask}
            title="TO DO"
            status={TaskStatus.Todo}
            headingColor="text-yellow-200"
            handleStatusChange={handleStatusChange}
          />
          <BoardColumn
            tasks={tasksData}
            title="IN PROGRESS"
            createTask={handleCreateTask}
            status={TaskStatus.InProgress}
            headingColor="text-blue-200"
            handleStatusChange={handleStatusChange}
          />
          <BoardColumn
            tasks={tasksData}
            title="COMPLETED"
            createTask={handleCreateTask}
            status={TaskStatus.Completed}
            headingColor="text-emerald-200"
            handleStatusChange={handleStatusChange}
          />
        </>
      )}
    </div>
  );
};
