"use client";
import { PenBox, Plus } from "lucide-react";
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
import { WorkItemTypeIcon } from "@/lib/constants/workitem.constats";
import { WorkItemType } from "@/types/task.enum";
import { hasPermission, PERMISSIONS } from "@/lib/utils";
import React, { useState } from "react";
import { workspaceRoles } from "@/types/roles.enum";
import { epicColors } from "@/lib/constants/color.constants";
import { useTaskPageContext } from "@/contexts/TaskPageContext";

interface IWorkItemParentProps {
  memberRole: workspaceRoles;
  taskId: string;
  // objects and arrays
  parent?: {
    parentId: string;
    name: string;
    type: WorkItemType;
    color?: string;
  };
}

export const WorkItemParent = ({
  taskId,
  parent,
  memberRole,
}: IWorkItemParentProps) => {
  const canEdit = hasPermission(memberRole, PERMISSIONS.EDIT_TASK);
  const [isEpicSelectorOpen, setIsEpicSelectorOpen] = useState(false);

  const { epics, handleParentAttach, isAttaching } = useTaskPageContext();

  return (
    <div className="space-y-2">
      <label className="text-sm text-muted-foreground flex items-center gap-2">
        Parent
        {canEdit && parent && (
          <PenBox className="size-4 cursor-pointer text-muted-foreground hover:text-foreground" />
        )}
      </label>
      {parent ? (
        <div
          className={`flex items-center gap-1 w-fit py-1 px-2 rounded-full ${
            parent.color
              ? epicColors[parent.color as keyof typeof epicColors]
              : "bg-neutral-500/40"
          }`}
        >
          <WorkItemTypeIcon
            type={parent.type}
            className="size-4 text-muted-foreground"
          />
          <p className="text-xs mt-1 text-white/70 font-mono w-fit max-w-40 truncate">
            {parent.name}
          </p>
        </div>
      ) : (
        <Popover open={isEpicSelectorOpen} onOpenChange={setIsEpicSelectorOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="px-2 py-1 h-fit rounded-full text-xs font-mono flex items-center bg-inherit text-white/70"
              disabled={isAttaching}
              onClick={(e) => e.stopPropagation()}
            >
              <Plus className="size-3 mr-1" />
              {isAttaching ? "Attaching..." : "Add Parent"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-64" align="end">
            <Command>
              <CommandInput placeholder="Search epics..." />
              <CommandList>
                <CommandEmpty>No epics found.</CommandEmpty>
                <CommandGroup>
                  {epics.map((epicOption) => (
                    <CommandItem
                      key={epicOption.epicId}
                      value={epicOption.title}
                      onSelect={() => {
                        handleParentAttach("epic", epicOption.epicId, taskId);
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
    </div>
  );
};
