"use client";
import { BoardTask } from "@/types/board.types";
import { Dispatch, DragEvent, SetStateAction, useEffect, useState } from "react";
import { TaskCard } from "./TaskCard";
import { DropIndicator } from "./DropIndicator";
import { AddTaskCard } from "./AddTaskCard";
import { TaskStatus } from "@/types/task.enum";
import { TaskCreationPayload } from "@/lib/api/task/task.types";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { hasPermission, PERMISSIONS } from "@/lib/utils";
import { workspaceRoles } from "@/types/roles.enum";
import { WorkspaceMember } from "@/lib/api/workspace/workspace.types";

export const BoardColumn = ({
  title,
  headingColor,
  status,
  tasks,
  handleStatusChange,
  createTask,
  onInvite,
  members,
  setIsTaskModalOpen,
  setSelectedTask,
}: {
  title: string;
  headingColor: string;
  status: TaskStatus;
  tasks: BoardTask[];
  members: WorkspaceMember[];
  handleStatusChange: (status: TaskStatus, taskId: string) => void;
  createTask: (task: TaskCreationPayload) => void;
  onInvite: (taskId: string, data: { assignedTo: string }) => void;
  setIsTaskModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedTask: Dispatch<SetStateAction<string>>;
}) => {
  const [active, setActive] = useState(false);
  const [completedEffect, setCompletedEffect] = useState(false);
  const userRole = useSelector(
    (state: RootState) => state.workspace.memberRole
  );

  useEffect(() => {
    if (completedEffect) {
      setTimeout(() => {
        setCompletedEffect(false);
      }, 500);
    }
  }, [completedEffect]);

  // drag functions
  const handleDragStart = (
    e: DragEvent<HTMLDivElement>,
    task: Omit<BoardTask, "workItemType">
  ) => {
    console.log("drag start", task);
    e.dataTransfer?.setData("taskId", task.taskId);
  };
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };
  const handleDragLeave = () => {
    setActive(false);
    clearHighLights();
  };
  const handleDragEnd = (e: DragEvent) => {
    setActive(false);
    clearHighLights();

    const taskId = e.dataTransfer.getData("taskId");

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== taskId) {
      let copy = [...tasks];

      let cardToTransfer = copy.find((c) => c.taskId === taskId);

      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, status };

      copy = copy.filter((c) => c.taskId !== taskId);

      const moveToBack = before === "-1";
      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.taskId === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      handleStatusChange(status, cardToTransfer.taskId);
    }

    if (status === TaskStatus.Completed) {
      setCompletedEffect(true);
    }
  };
  const highlightIndicator = (e: DragEvent) => {
    const indicators = getIndicators();
    clearHighLights(indicators);
    const el = getNearestIndicator(e, indicators);
    el.element.style.opacity = "1";
  };
  const clearHighLights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll<HTMLElement>(`[data-status="${status}"]`)
    );
  };

  const getNearestIndicator = (e: DragEvent, indicators: HTMLElement[]) => {
    const DISTANCE_OFFSET = 50;
    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const filteredTasks = tasks.filter((c) => c.status === status);

  const isAddTaskVisible = hasPermission(
    userRole as workspaceRoles,
    PERMISSIONS.CREATE_TASK
  );
  return (
    <div className="w-1/4 shrink-0">
      <div className="mb-3 flex items-center justify-between rounded-md border border-gray-700/20 bg-gray-800/20 px-3 py-2">
        <div className={`flex items-center gap-2 ${headingColor}`}>
          <span className="h-2 w-2 rounded-full bg-current" />
          <h3 className="text-sm font-semibold tracking-wide text-gray-100">
            {title}
          </h3>
        </div>
        <span className="rounded-full bg-gray-900/50 px-2 py-0.5 text-xs font-medium text-gray-300">
          {filteredTasks.length}
        </span>
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
        className={`w-full h-full transition-colors ${
          completedEffect
            ? "bg-emerald-800/30 shadow-lg shadow-emerald-800/30"
            : active
            ? "bg-gray-800/30"
            : "bg-gray-800/0"
        }`}
      >
        {filteredTasks.map((card) => (
          <TaskCard
            key={card.taskId}
            taskData={card}
            handleDragStart={handleDragStart}
            onInvite={onInvite}
            members={members}
            setIsTaskModalOpen={setIsTaskModalOpen}
            setSelectedTask={setSelectedTask}
          />
        ))}
        <DropIndicator beforeId={"-1"} status={status} />
        {isAddTaskVisible && (
          <AddTaskCard status={status} createTask={createTask} />
        )}
      </div>
    </div>
  );
};
