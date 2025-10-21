"use client";
import { Button } from "@/components/atoms/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/atoms/select";
import { workItemTypeMap } from "@/lib/constants/workitem.constats";
import { WorkItemType } from "@/types/task.enum";
import { CornerDownLeft } from "lucide-react";
import { useEffect, useState } from "react";

interface WorkItemCreationInput {
  handleConfirmCreation: (data: {
    newIssueTitle: string;
    newIssueType: WorkItemType;
  }) => void;
  handleCancelCreation: () => void;
  view: "detail" | "list";
}

export const WorkItemCreationInput = ({
  handleCancelCreation,
  handleConfirmCreation,
  view,
}: WorkItemCreationInput) => {
  const [newIssueTitle, setNewIssueTitle] = useState("");
  const [newIssueType, setNewIssueType] = useState<WorkItemType>(
    view === "detail" ? WorkItemType.Subtask : WorkItemType.Task
  );

  const [selectedIssueType, setSelectedIssueType] = useState(
    workItemTypeMap[newIssueType as keyof typeof workItemTypeMap]
  );

  useEffect(() => {
    setSelectedIssueType(
      workItemTypeMap[newIssueType as keyof typeof workItemTypeMap]
    );
  }, [newIssueType]);

  return (
    <div
      className={`w-full mt-3 flex gap-3 ${
        view === "list" ? "items-center" : "flex-col"
      } `}
    >
      <div className="w-full flex gap-2">
        <Select
          disabled={view === "detail"}
          value={newIssueType}
          onValueChange={(value) => setNewIssueType(value as WorkItemType)}
        >
          <SelectTrigger className="w-auto h-9 border-border bg-background">
            {selectedIssueType?.icon}
          </SelectTrigger>
          <SelectContent>
            {Object.values(workItemTypeMap).map(
              (type) =>
                type.label !== "Epic" && (
                  <SelectItem key={type.label} value={type.label.toLowerCase()}>
                    <div className="flex items-center gap-2">
                      {type.icon}
                      <span>{type.label}</span>
                    </div>
                  </SelectItem>
                )
            )}
          </SelectContent>
        </Select>
        <input
          type="text"
          value={newIssueTitle}
          onChange={(e) => setNewIssueTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-grow h-9 px-2 py-1 rounded border border-border bg-background text-sm outline-none focus:border-border focus:ring-1 focus:ring-purple-500/30"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter")
              handleConfirmCreation({
                newIssueTitle,
                newIssueType: newIssueType,
              });
            if (e.key === "Escape") handleCancelCreation();
          }}
        />
      </div>
      <div className={`flex gap-1 ${view === "detail" && "flex-row-reverse"}`}>
        <Button
          className="border-purple-400"
          variant="outline"
          size="sm"
          onClick={() =>
            handleConfirmCreation({
              newIssueTitle,
              newIssueType: newIssueType,
            })
          }
          disabled={!newIssueTitle.trim()}
        >
          <CornerDownLeft className="size-4" />
          Create
        </Button>
        <Button variant="ghost" size="sm" onClick={handleCancelCreation}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
