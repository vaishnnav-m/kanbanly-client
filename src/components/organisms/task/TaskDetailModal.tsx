"use client";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import {
  Calendar,
  User,
  X,
  Trash,
  CircleFadingPlus,
  PenBox,
  Circle,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/atoms/card";
import { Button } from "@/components/atoms/button";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Badge } from "@/components/atoms/badge";
import { getDate, getPriorityColor } from "@/lib/utils";
import { ITaskDetails, TaskCreationPayload } from "@/lib/api/task/task.types";
import { ConfirmationModal } from "../admin/ConfirmationModal";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Input } from "@/components/atoms/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/atoms/tooltip";
import { WorkspaceMember } from "@/lib/api/workspace/workspace.types";
import { InviteUserDropdown } from "@/components/molecules/InviteUserDropdown";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/atoms/tabs";
import { Progress } from "@/components/atoms/progress";

interface TaskDetailsProps {
  isVisible: boolean;
  close: () => void;
  task: ITaskDetails | undefined;
  removeTask: (taskId: string) => void;
  handleEditTask: (taskId: string, data: Partial<TaskCreationPayload>) => void;
  isEditing: boolean;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  members: WorkspaceMember[] | [];
  onInvite: (taskId: string, data: { assignedTo: string }) => void;
}

export const TaskDetails = ({
  isVisible,
  close,
  task,
  removeTask,
  handleEditTask,
  isEditing,
  members,
  onInvite,
}: TaskDetailsProps) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isInvitingUser, setIsInvitingUser] = useState(false);
  const [description, setDescription] = useState<string | null>(null);
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [taskName, setTaskName] = useState<string | null>(null);
  const inviteButtonRef = useRef<HTMLButtonElement | null>(null);

  function getAssignedTo(assignedTo: { name: string; email: string }) {
    return assignedTo.email[0].toUpperCase();
  }

  const role = useSelector((state: RootState) => state.workspace.memberRole);
  if (!isVisible || !task) return null;

  // funtion to handle the submit of editing
  function handleSubmit() {
    const data: Partial<TaskCreationPayload> = {
      ...(description && { description }),
      ...(taskName && { task: taskName }),
      ...(dueDate && { dueDate }),
    };

    handleEditTask(task?.taskId as string, data);

    setTaskName(null);
    setDescription(null);
    setDueDate(null);
  }

  // handle invitation of user
  const handleInvite = (data: {
    invitedEmail?: string;
    email?: string;
    role?: string;
  }) => {
    if (data.invitedEmail) {
      onInvite(task.taskId, { assignedTo: data.invitedEmail });
    }
  };

  return (
    <div className="fixed top-4 right-4 w-96 h-[calc(100vh-2rem)] z-50">
      <Card className="relative h-full flex flex-col shadow-xl border-border bg-card">
        {/* Header */}
        <CardHeader className="flex-shrink-0 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Badge variant="secondary" className="bg-accent/10 text-accent">
                {task.status}
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              {role !== "member" && (
                <Button
                  onClick={() => setIsConfirmationOpen(true)}
                  className="hover:bg-muted-foreground/20"
                  variant="ghost"
                  size="sm"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              )}
              <Button
                className="hover:bg-muted-foreground/20"
                variant="ghost"
                size="sm"
                onClick={close}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {taskName !== null && role !== "member" ? (
            <Input
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          ) : (
            <h2 className="text-xl font-semibold text-foreground mt-2">
              {task.task}
              {role !== "member" && (
                <PenBox
                  onClick={() => setTaskName(task.task || "")}
                  className="size-3 cursor-pointer inline ml-2"
                />
              )}
            </h2>
          )}
        </CardHeader>

        {/* Content */}
        <CardContent className="flex-1 overflow-y-auto space-y-6">
          {/* Task Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                Due date{" "}
                {role !== "member" && (
                  <PenBox
                    onClick={() =>
                      setDueDate(
                        new Date(task.dueDate).toISOString().slice(0, 10)
                      )
                    }
                    className="inline size-3 cursor-pointer"
                  />
                )}
              </span>
              <span className="font-medium text-foreground">
                {dueDate !== null ? (
                  <Input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                ) : (
                  getDate(task.dueDate)
                )}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Assignee</span>
              {task.assignedTo && role !== "member" && (
                <Button
                  ref={inviteButtonRef}
                  onClick={() => setIsInvitingUser(true)}
                  className="size-fit p-0 hover:bg-transparent bg-transparent text-muted-foreground cursor-pointer inline "
                >
                  <PenBox className="!size-3" />
                </Button>
              )}
              <div className="flex items-center gap-2">
                {task.assignedTo ? (
                  <Tooltip>
                    <TooltipTrigger>
                      <Avatar className="h-6 w-6">
                        {/* <AvatarImage/> */}
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm font-bold px-2 py-1 rounded-full">
                          {getAssignedTo(task.assignedTo)}
                        </AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>
                        {task.assignedTo ? task.assignedTo.email : "unassigned"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  role !== "member" && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          ref={inviteButtonRef}
                          onClick={() => setIsInvitingUser(true)}
                          variant="ghost"
                          className="p-0 hover:bg-transparent"
                        >
                          <CircleFadingPlus className="size-6 text-muted-foreground" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>Assign user</p>
                      </TooltipContent>
                    </Tooltip>
                  )
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Tags</span>
              <Badge
                variant="outline"
                className={`${getPriorityColor(task.priority)}`}
              >
                {task.priority}
              </Badge>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="font-medium text-foreground">
              Description{" "}
              {role !== "member" && (
                <PenBox
                  onClick={() => setDescription(task?.description || "")}
                  className="size-3 cursor-pointer inline ml-2"
                />
              )}
            </h3>
            {description !== null && role !== "member" ? (
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            ) : task.description ? (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {task.description}
              </p>
            ) : (
              <span className="text-slate-500">No Description</span>
            )}
          </div>
          {(description !== null || dueDate !== null || taskName !== null) && (
            <div className="w-full flex">
              <Button onClick={handleSubmit} className="w-full">
                Save Changes
              </Button>
              <Button
                onClick={() => {
                  setDescription(null);
                  setDueDate(null);
                  setTaskName(null);
                }}
                variant="outline"
                className="w-full hover:bg-transparent"
              >
                Cancel
              </Button>
            </div>
          )}

          {/* Attachments */}
          {/* <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-foreground">Attachment (2)</h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-accent hover:text-accent"
              >
                <Download className="h-4 w-4 mr-1" />
                Download All
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50">
                <div className="p-2 bg-red-100 rounded dark:bg-red-900/20">
                  <FileText className="h-4 w-4 text-red-600 dark:text-red-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Design brief.pdf</p>
                  <p className="text-xs text-muted-foreground">
                    1,5 MB • Download
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50">
                <div className="p-2 bg-orange-100 rounded dark:bg-orange-900/20">
                  <FileText className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Craftboard logo.ai</p>
                  <p className="text-xs text-muted-foreground">
                    2,5 MB • Download
                  </p>
                </div>
              </div>
            </div>
          </div> */}

          {/* Tabs */}
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

            <TabsContent value="subtasks" className="space-y-4 mt-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Our Design Process</h4>
                  <div className="flex items-center gap-2">
                    <Progress value={50} className="w-12 h-2" />
                    <span className="text-sm text-muted-foreground">2/4</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        Understanding client design brief
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Blocker: The brief from client was not clear so it took
                        time to understand it
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        Collect moodboards about KPI programs
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Circle className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Create wireframes
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Circle className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Design high-fidelity mockups
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="comments" className="mt-4">
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">No comments yet</p>
              </div>
            </TabsContent>

            <TabsContent value="activities" className="mt-4">
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">No recent activities</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>

        {/* <AddMemberModal
          isLoading={isEditing}
          isOpen={isInvitingUser}
          onClose={() => setIsInvitingUser(false)}
          onInvite={handleEditTask}
          taskId={task.taskId}
        /> */}
        <InviteUserDropdown
          buttonRef={inviteButtonRef}
          isLoading={isEditing}
          isOpen={isInvitingUser}
          onClose={() => setIsInvitingUser(false)}
          onInvite={handleInvite}
          suggestions={members?.map((m) => ({
            id: m._id,
            name: m.name,
            email: m.email,
          }))}
        />
        <ConfirmationModal
          isOpen={isConfirmationOpen}
          onClose={() => setIsConfirmationOpen(false)}
          onConfirm={() => {
            removeTask(task.taskId);
            setIsConfirmationOpen(false);
            close();
          }}
          title="Are you sure you want to remove this task?"
          description="This action cannot be undone. The task will be permanently deleted from the project."
          cancelText="Cancel"
          confirmText="Delete Task"
        />
      </Card>
    </div>
  );
};
