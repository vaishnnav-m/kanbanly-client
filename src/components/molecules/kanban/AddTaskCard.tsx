import { BoardTask } from "@/types/board.types";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { TaskStatus } from "@/types/task.enum";

export const AddTaskCard = ({
  status,
  setTasks,
}: {
  status: TaskStatus;
  setTasks: Dispatch<SetStateAction<BoardTask[]>>;
}) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    console.log("inside handle submit");
    e.preventDefault();
    if (!text.trim().length) return;

    const newTask: BoardTask = {
      taskId: Math.random().toString(),
      task: text.trim(),
      status,
    };

    setTasks((prev) => [...prev, newTask]);
    setText("");
    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new task..."
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-gray-50 placeholder-violet-300 focus:outline-0"
          ></textarea>
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-gray-400 transition-colors hover:text-gray-50"
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
