"use client";
import { FormEvent, JSX, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Bug, CheckSquare, Star } from "lucide-react";
import { TaskPriority, TaskStatus, WorkItemType } from "@/types/task.enum";
import { TaskCreationPayload } from "@/lib/api/task/task.types";

const workItemOptions: {
  type: WorkItemType;
  label: string;
  icon: JSX.Element;
}[] = [
  {
    type: WorkItemType.Task,
    label: "Task",
    icon: <CheckSquare className="size-4 inline" />,
  },
  {
    type: WorkItemType.Bug,
    label: "Bug",
    icon: <Bug className="size-4 inline" />,
  },
  {
    type: WorkItemType.Feature,
    label: "Feature",
    icon: <Star className="size-4 inline" />,
  },
];

export const AddTaskCard = ({
  status,
  createTask,
}: {
  status: TaskStatus;
  createTask: (task: TaskCreationPayload) => void;
}) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);
  const [workItemType, setWorkItemType] = useState<WorkItemType>(
    WorkItemType.Task
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim().length) return;

    console.log("status",status);

    const newTask: TaskCreationPayload = {
      task: text.trim(),
      status,
      workItemType,
      priority: TaskPriority.low,
    };

    createTask(newTask);
    setText("");
    setAdding(false);
    setWorkItemType(WorkItemType.Task);
  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <div className="mb-2 flex gap-2">
            {workItemOptions.map((option) => (
              <button
                type="button"
                key={option.type}
                onClick={() => setWorkItemType(option.type)}
                className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
                  workItemType === option.type
                    ? "bg-violet-500 text-white"
                    : "bg-violet-400/20 text-violet-300 hover:bg-violet-400/40"
                }`}
              >
                {option.icon}
                {option.label}
              </button>
            ))}
          </div>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new task..."
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-gray-50 placeholder-violet-300 focus:outline-0"
            value={text}
          ></textarea>
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-gray-400 transition-colors hover:text-gray-50"
              type="button"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-gray-50 px-3 py-1.5 text-xs text-gray-950 transition-colors hover:bg-gray-300"
            >
              Add <Plus className="size-3" />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-gray-400 transition-colors hover:text-gray-50"
        >
          <span>Add Task</span>
          <Plus className="size-4" />
        </motion.button>
      )}
    </>
  );
};
