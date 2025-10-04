"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/avatar";
import { Badge } from "@/components/atoms/badge";
import { Checkbox } from "@/components/atoms/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select";
import { TaskStatus } from "@/types/task.enum";

interface IssueCardProps {
  id: string;
  title: string;
  status: TaskStatus;
  type: string;
  assignee?: {
    name: string;
    avatar?: string;
    fallback: string;
  };
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export function IssueCard({
  id,
  title,
  status,
  // type,
  assignee,
  checked = false,
  onCheckedChange,
}: IssueCardProps) {
  const statusValues = Object.values(TaskStatus);

  return (
    <div className="flex items-center gap-3 p-3 bg-backlog-section border border-border rounded-md hover:bg-issue-hover transition-colors group">
      <Checkbox
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="flex-shrink-0"
      />

      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span className="text-sm text-foreground flex-1 truncate">{title}</span>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        <Badge variant="outline" className="text-xs font-mono flex-shrink-0">
          {id}
        </Badge>
        <Select defaultValue={status}>
          <SelectTrigger className="w-28 h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statusValues.map((value) => (
              <SelectItem
                key={value}
                className="focus:bg-slate-500/40"
                value={value.toLowerCase()}
              >
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {assignee && (
          <Avatar className="w-7 h-7">
            <AvatarImage src={assignee.avatar} />
            <AvatarFallback className="text-xs">
              {assignee.fallback}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
}
