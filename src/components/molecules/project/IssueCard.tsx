import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/avatar";
import { Badge } from "@/components/atoms/badge";
import { Checkbox } from "@/components/atoms/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/atoms/select";

interface IssueCardProps {
  id: string;
  title: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  assignee?: {
    name: string;
    avatar?: string;
    fallback: string;
  };
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

// const statusColors = {
//   TODO: "status-todo",
//   IN_PROGRESS: "status-progress",
//   DONE: "status-done",
// };

export function IssueCard({
  id,
  title,
  status,
  assignee,
  checked = false,
  onCheckedChange,
}: IssueCardProps) {
  return (
    <div className="flex items-center gap-3 p-3 bg-backlog-section border border-border rounded-md hover:bg-issue-hover transition-colors group">
      <Checkbox
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="flex-shrink-0"
      />

      <div className="flex items-center gap-3 flex-1 min-w-0">
        <Badge variant="outline" className="text-xs font-mono flex-shrink-0">
          {id}
        </Badge>

        <span className="text-sm text-foreground flex-1 truncate">{title}</span>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        <Select defaultValue={status}>
          <SelectTrigger className="w-28 h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TODO" className="text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-status-todo rounded-full"></div>
                TODO
              </div>
            </SelectItem>
            <SelectItem value="IN_PROGRESS" className="text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-status-progress rounded-full"></div>
                IN PROGRESS
              </div>
            </SelectItem>
            <SelectItem value="DONE" className="text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-status-done rounded-full"></div>
                DONE
              </div>
            </SelectItem>
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
