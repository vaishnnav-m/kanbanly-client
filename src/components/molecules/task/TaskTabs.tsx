import { Badge } from "@/components/atoms/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/atoms/table";
import { PriorityBadge } from "@/lib/constants/workitem.constats";
import { TaskPriority, TaskStatus, WorkItemType } from "@/types/task.enum";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Bug, CheckCircle2, Circle, CircleDashed, Ticket } from "lucide-react";

export const TaskTabs = () => {
  const WorkItemTypeIcon = ({ type }: { type: WorkItemType }) => {
    if (type === WorkItemType.Bug) {
      return <Bug className="h-4 w-4 text-red-500" />;
    }
    return <Ticket className="h-4 w-4 text-muted-foreground" />;
  };

  // Icon for Task Status (Done, In Progress, Todo)
  const StatusIcon = ({ status }: { status: TaskStatus }) => {
    switch (status) {
      case TaskStatus.Completed:
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case TaskStatus.InProgress:
        return <CircleDashed className="h-4 w-4 text-blue-500" />;
      default:
        return <Circle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const subtasks = [
    {
      taskId: "TASK-8782",
      task: "Understanding client design brief",
      priority: TaskPriority.high,
      status: TaskStatus.Completed,
      workItemType: WorkItemType.Task,
      dueDate: new Date("2025-10-10"),
    },
    {
      taskId: "TASK-8783",
      task: "Understanding client design brief",
      priority: TaskPriority.medium,
      status: TaskStatus.InProgress,
      workItemType: WorkItemType.Task,
      dueDate: new Date("2025-10-10"),
    },
    {
      taskId: "TASK-8781",
      task: "Understanding client design brief",
      priority: TaskPriority.low,
      status: TaskStatus.Todo,
      workItemType: WorkItemType.Task,
      dueDate: new Date("2025-10-10"),
    },
  ];

  return (
    <Tabs defaultValue="subtasks" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-transparent">
        <TabsTrigger value="subtasks">Subtasks</TabsTrigger>
        <TabsTrigger value="comments">
          Comments{" "}
          <Badge variant="secondary" className="ml-1 h-4 px-1.5 text-xs">
            3
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="activities">Activities</TabsTrigger>
      </TabsList>

      <TabsContent value="subtasks" className="mt-4">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[20px]"></TableHead> {/* Type Icon */}
                <TableHead>Task</TableHead>
                <TableHead className="w-[120px]">Status</TableHead>
                <TableHead className="w-[120px]">Priority</TableHead>
                <TableHead className="w-[120px]">Due Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subtasks.map((task) => (
                <TableRow key={task.taskId}>
                  <TableCell className="font-medium">
                    <WorkItemTypeIcon type={task.workItemType} />
                  </TableCell>
                  <TableCell className="font-medium">{task.task}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <StatusIcon status={task.status} />
                      <span className="text-sm text-muted-foreground">
                        {task.status}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <PriorityBadge priority={task.priority} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {task.dueDate.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>

      <TabsContent value="comments" className="mt-4">
        <div className="text-center py-8 text-muted-foreground rounded-md border">
          <p className="text-sm">No comments yet</p>
        </div>
      </TabsContent>

      <TabsContent value="activities" className="mt-4">
        <div className="text-center py-8 text-muted-foreground rounded-md border">
          <p className="text-sm">No recent activities</p>
        </div>
      </TabsContent>
    </Tabs>
  );
};
