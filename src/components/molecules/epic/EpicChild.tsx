"use client";
import { Progress } from "@/components/atoms/progress";
import CustomTable from "@/components/organisms/CustomTable";
import { createSubTaskColumns } from "@/lib/columns/task.column";
import { IEpic } from "@/lib/api/epic/epic.types";
import { TaskStatus } from "@/types/task.enum";
import { useTaskPageContext } from "@/contexts/TaskPageContext";

interface IEpicChildProps {
  epic: IEpic;
  handleStatusChange: (value: TaskStatus, taskId: string) => void;
}

export const EpicChild = ({ epic, handleStatusChange }: IEpicChildProps) => {
  const { setSelectedTask } = useTaskPageContext();

  const columns = createSubTaskColumns({
    handleStatusChange,
    view: "epic",
    setSelectedTask,
  });

  return (
    <div>
      <span className="font-bold text-sm text-muted-foreground">
        Child Items
      </span>
      <div className="space-y-3">
        <div className="w-full flex items-center gap-2">
          <Progress value={epic.percentageDone || 0} className="h-2 w-full" />
          <span className="text-sm text-gray-400">
            {epic.percentageDone || 0}%
          </span>
        </div>
        <CustomTable
          columns={columns}
          data={epic.children || []}
          emptyMessage="No children"
        />
      </div>
    </div>
  );
};
