"use client";
import { TaskStatus } from "@/types/task.enum";

export const DropIndicator = ({
  beforeId,
  status,
}: {
  beforeId: string;
  status: string;
}) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-status={status}
      className={`my-0.5 h-0.5 w-full ${status === TaskStatus.Completed ?"bg-emerald-400" :"bg-violet-400"} opacity-0`}
    ></div>
  );
};
