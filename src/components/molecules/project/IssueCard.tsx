"use client";
import { Button } from "@/components/atoms/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/atoms/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/atoms/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select";
import { TaskEpic } from "@/lib/api/epic/epic.types";
import { WorkspaceMember } from "@/lib/api/workspace/workspace.types";
import { getWorkItemTypeIcon } from "@/lib/task-utils";
import { TaskStatus, WorkItemType } from "@/types/task.enum";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AssigneeCard } from "../task/AssigneeCard";
import {
  epicColors,
  workItemStatusColors,
} from "@/lib/constants/color.constants";
import { useTaskPageContext } from "@/contexts/TaskPageContext";

interface IssueCardProps {
  id: string;
  title: string;
  status: TaskStatus;
  workItemType: WorkItemType;
  epic?: TaskEpic;
  assignee?: WorkspaceMember;
}

export function IssueCard({
  id,
  title,
  status,
  workItemType,
  epic,
  assignee,
}: IssueCardProps) {
  const taskContext = useTaskPageContext();
  const statusValues = Object.values(TaskStatus);

  const IconComponent = getWorkItemTypeIcon(workItemType).icon;

  const [isEpicSelectorOpen, setIsEpicSelectorOpen] = useState(false);

  return (
    <div className="flex items-center gap-3 p-3 bg-backlog-section border border-border rounded-md hover:bg-issue-hover transition-colors group">
      {/* Work Item Type Icon and Label */}
      <span className="flex items-center gap-1 flex-shrink-0">
        {
          <IconComponent
            className={`size-4 ${getWorkItemTypeIcon(workItemType).className}`}
          />
        }
      </span>

      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span className="text-sm text-foreground flex-1 truncate">{title}</span>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        {epic ? (
          // --- Display Epic if it exists ---
          <span
            className={`border border-transparent py-1 px-2 rounded-full text-xs ${
              epicColors[epic.color as keyof typeof epicColors]
            } text-white/70 font-mono max-w-40 truncate`}
          >
            {epic.title}
          </span>
        ) : (
          // --- Epic Selector Popover ---
          <Popover
            open={isEpicSelectorOpen}
            onOpenChange={setIsEpicSelectorOpen}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="px-2 py-1 h-fit rounded-full text-xs font-mono flex items-center bg-inherit text-white/70"
                disabled={taskContext.isAttaching}
                onClick={(e) => e.stopPropagation()}
              >
                <Plus className="size-3 mr-1" />
                {taskContext.isAttaching ? "Attaching..." : "Add Epic"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-64" align="end">
              <Command>
                <CommandInput placeholder="Search epics..." />
                <CommandList>
                  <CommandEmpty>No epics found.</CommandEmpty>
                  <CommandGroup>
                    {taskContext.epics.map((epicOption) => (
                      <CommandItem
                        key={epicOption.epicId}
                        value={epicOption.title}
                        onSelect={() => {
                          taskContext.handleParentAttach(
                            "epic",
                            epicOption.epicId,
                            id
                          );
                          setIsEpicSelectorOpen(false);
                        }}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <span
                          className={`w-2 h-2 rounded-full bg-${epicOption.color}-500`}
                          aria-hidden="true"
                        />
                        <span>{epicOption.title}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}
        <Select
          value={status}
          onValueChange={(value: string) =>
            taskContext.handleStatusChange(value as TaskStatus, id)
          }
        >
          <SelectTrigger
            className={`w-fit h-fit px-2 py-1 text-xs rounded-full border border-spacing-1 focus:ring-0 focus:outline-none shadow-none 
              ${workItemStatusColors[status].bg} ${workItemStatusColors[status].text}
              `}
            style={{
              boxShadow: "none",
              outline: "none",
            }}
          >
            <SelectValue className="text-sm h-fit w-fit">
              {status.toUpperCase()}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {statusValues
              .filter((value) => value !== status)
              .map((value) => (
                <SelectItem
                  key={value}
                  className={`rounded-full flex justify-center border-0 focus:ring-0 focus:outline-none shadow-none my-2 ${workItemStatusColors[value].bg} ${workItemStatusColors[value].text}`}
                  style={{
                    boxShadow: "none",
                    outline: "none",
                  }}
                  value={value}
                >
                  <span className="mr-5">{value.toUpperCase()}</span>
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        {assignee && <AssigneeCard taskId={id} assignedTo={assignee} />}
      </div>
    </div>
  );
}
