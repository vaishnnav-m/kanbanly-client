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
    <div className="space-y-3">
      <label className="text-sm font-semibold text-foreground flex items-center gap-2">
        Parent
        {canEdit && parent && (
          <PenBox 
            className="w-3.5 h-3.5 cursor-pointer text-muted-foreground hover:text-foreground transition-colors" 
            onClick={() => setIsEpicSelectorOpen(true)}
          />
        )}
      </label>
      {parent ? (
        <div
          className={`flex items-center gap-2 w-fit py-2 px-3 rounded-full border ${
            parent.color
              ? `${epicColors[parent.color as keyof typeof epicColors]} border-${parent.color}-500/30`
              : "bg-neutral-500/20 border-neutral-500/30"
          }`}
        >
          <WorkItemTypeIcon
            type={parent.type}
            className="w-4 h-4 text-white/70"
          />
          <p className="text-xs text-white/90 font-medium max-w-40 truncate">
            {parent.name}
          </p>
        </div>
      ) : (
        <Popover open={isEpicSelectorOpen} onOpenChange={setIsEpicSelectorOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="px-3 py-2 h-auto rounded-full text-xs font-medium flex items-center gap-2 border-dashed hover:border-primary hover:bg-primary/5 transition-colors"
              disabled={isAttaching}
              onClick={(e) => e.stopPropagation()}
            >
              <Plus className="w-3.5 h-3.5" />
              {isAttaching ? "Attaching..." : "Add Parent"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-64" align="start">
            <Command>
              <CommandInput placeholder="Search epics..." />
              <CommandList>
                <CommandEmpty>No epics found.</CommandEmpty>
                <CommandGroup>
                  {epics?.map((epicOption) => (
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
                        className={`w-3 h-3 rounded-full bg-${epicOption.color}-500`}
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
