"use client";
// import { AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/atoms/dialog";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { Textarea } from "@/components/atoms/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select";
// import { Alert, AlertDescription, AlertTitle } from "@/components/atoms/alert";
import { ISprint, UpdateSprintPayload } from "@/lib/api/sprint/sprint.types";
import { ChangeEvent, useEffect } from "react";
import { formatDateForInput } from "@/lib/utils";

interface SprintStartModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sprintFormData: UpdateSprintPayload;
  onFormDataChange: (
    field: keyof UpdateSprintPayload,
    value: UpdateSprintPayload[keyof UpdateSprintPayload]
  ) => void;
  onSubmit: () => void;
  sprintData: ISprint | null;
  mode: "start" | "update";
}

export default function SprintStartModal({
  open,
  onOpenChange,
  sprintFormData,
  onFormDataChange,
  onSubmit,
  sprintData,
  mode,
}: SprintStartModalProps) {
  // to calculate end date
  useEffect(() => {
    const isCustomDuration = sprintFormData.duration === "custom";
    const startDate = sprintFormData.startDate;

    if (isCustomDuration || !startDate) {
      return;
    }

    const newStartDate = new Date(startDate);
    if (isNaN(newStartDate.getTime())) return;

    const durationMap: Record<string, number> = {
      "1-week": 1,
      "2-weeks": 2,
      "3-weeks": 3,
      "4-weeks": 4,
    };
    const weeksToAdd = durationMap[sprintFormData.duration || ""];

    if (weeksToAdd) {
      const newEndDate = new Date(newStartDate);
      newEndDate.setDate(newStartDate.getDate() + weeksToAdd * 7);
      onFormDataChange("endDate", newEndDate);
    }
  }, [sprintFormData.startDate, sprintFormData.duration, onFormDataChange]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    // Map input IDs to form data fields
    const fieldMap: Record<string, keyof UpdateSprintPayload> = {
      "sprint-name": "name",
      "sprint-goal": "goal",
      "start-date": "startDate",
      "end-date": "endDate",
    };

    const field = fieldMap[id];
    if (field) {
      if (field === "startDate" || field === "endDate") {
        onFormDataChange(field, value ? new Date(value) : null);
      } else {
        onFormDataChange(field, value);
      }
    }
  };

  const handleSelectChange = (value: string) => {
    onFormDataChange("duration", value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const isEndDateDisabled = sprintFormData.duration !== "custom";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-xl">Start Sprint</DialogTitle>
          <DialogDescription>
            Configure your sprint details before starting
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="space-y-6">
            {/* Sprint Name */}
            <div className="space-y-2">
              <Label htmlFor="sprint-name">
                Sprint Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="sprint-name"
                type="text"
                value={sprintFormData.name || sprintData?.name}
                onChange={handleInputChange}
                placeholder="e.g., Sprint 1, Q4 Sprint 2024"
              />
            </div>

            {/* Sprint Goal */}
            <div className="space-y-2">
              <Label htmlFor="sprint-goal" className="flex items-center gap-2">
                Sprint Goal
              </Label>
              <Textarea
                id="sprint-goal"
                rows={3}
                value={sprintFormData.goal || sprintData?.goal}
                onChange={handleInputChange}
                placeholder="Describe the primary objective for this sprint..."
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                A clear goal helps the team stay focused and aligned
              </p>
            </div>

            {/* Sprint Duration */}
            <div className="space-y-2">
              <Label
                htmlFor="sprint-duration"
                className="flex items-center gap-2"
              >
                Sprint Duration
              </Label>
              <Select
                onValueChange={handleSelectChange}
                value={sprintFormData.duration || "1-week"}
              >
                <SelectTrigger id="sprint-duration">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-week">1 week</SelectItem>
                  <SelectItem value="2-weeks">2 weeks</SelectItem>
                  <SelectItem value="3-weeks">3 weeks</SelectItem>
                  <SelectItem value="4-weeks">4 weeks</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Range */}
            <div className="flex items-center gap-4">
              <div className="w-full space-y-2">
                <Label htmlFor="start-date">
                  Start Date <span className="text-destructive">*</span>
                </Label>
                <Input
                  value={
                    formatDateForInput(sprintFormData.startDate) ||
                    formatDateForInput(sprintData?.startDate)
                  }
                  onChange={handleInputChange}
                  id="start-date"
                  type="date"
                />
              </div>
              <div className="w-full space-y-2">
                <Label htmlFor="end-date">
                  End Date <span className="text-destructive">*</span>
                </Label>
                <Input
                  value={
                    formatDateForInput(sprintFormData.endDate) ||
                    formatDateForInput(sprintData?.endDate)
                  }
                  onChange={handleInputChange}
                  id="end-date"
                  type="date"
                  disabled={isEndDateDisabled}
                />
              </div>
            </div>

            {/* Sprint Summary */}
            {/* <Alert className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900">
              <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertTitle className="text-blue-900 dark:text-blue-100">
                Sprint Summary
              </AlertTitle>
              <AlertDescription className="text-blue-700 dark:text-blue-300">
                <ul className="space-y-1 mt-2">
                  <li>• 12 work items planned</li>
                  <li>• 3 team members assigned</li>
                  <li>• Estimated: 35 story points</li>
                </ul>
              </AlertDescription>
            </Alert> */}
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t bg-muted/50">
          <div className="flex items-center justify-between w-full">
            <p className="text-xs text-muted-foreground">* Required fields</p>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSubmit} type="submit">
                {mode === "start" ? "Start Sprint" : "Save Changes"}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
