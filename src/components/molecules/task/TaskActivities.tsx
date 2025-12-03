"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/avatar";
import { formatDistanceToNow } from "date-fns";
import { Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ActivityResponse,
  ActivityTypeEnum,
} from "@/lib/api/activity/activity.types";
import { ActivityActionIcon } from "./ActivityIActionIcon";

interface TaskActivitiesProps {
  activities: ActivityResponse[];
}

export const TaskActivities = ({ activities }: TaskActivitiesProps) => {
  return (
    <div className="w-full relative flex flex-col px-6 pb-4">
      {activities.length > 0 ? (
        <div className="relative ml-4 space-y-0">
          {/* Continuous Timeline Line */}
          <div className="absolute left-4 top-2 bottom-4 w-px bg-border/60" />

          {activities.map((activity) => (
            <div
              key={activity.activityId}
              className="relative pb-8 last:pb-0 pl-12"
            >
              {/* Timeline Node (Avatar) */}
              <div className="absolute left-0 top-0 flex items-center justify-center">
                <div className="relative z-10">
                  <Avatar className="w-8 h-8 border-4 border-background bg-background shadow-sm">
                    <AvatarImage src={activity.member.profile} />
                    <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-bold">
                      {activity.member.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  {/* Small Badge for Activity Type */}
                  <div className="absolute -bottom-1 -right-1 bg-background p-0.5 rounded-full border border-border shadow-sm text-muted-foreground">
                    <div
                      className={cn(
                        "rounded-full p-0.5",
                        activity.entityType === ActivityTypeEnum.COMMENT
                          ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30"
                          : activity.entityType === ActivityTypeEnum.TASK
                          ? "bg-green-100 text-green-600 dark:bg-green-900/30"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      <ActivityActionIcon action={activity.action} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Card */}
              <div className="relative group">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-foreground/90">
                    {activity.member.name}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">
                    {formatDistanceToNow(new Date(activity.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>

                <div className="bg-muted/30 hover:bg-muted/50 border border-border/50 hover:border-border/80 rounded-lg p-3 transition-colors duration-200 text-sm text-foreground/80 leading-relaxed">
                  {activity.description}

                  {/* Change Diff Visualization (Optional) */}
                  {(activity.oldValue || activity.newValue) && (
                    <div className="mt-3 pt-2 border-t border-border/40 grid gap-1">
                      {activity.oldValue && (
                        <div className="text-xs flex gap-2">
                          <span className="font-medium text-muted-foreground w-12">
                            From:
                          </span>
                          <span className="text-red-500/80 line-through truncate">
                            {JSON.stringify(
                              Object.values(activity.oldValue)[0]
                            )}
                          </span>
                        </div>
                      )}
                      {activity.newValue && (
                        <div className="text-xs flex gap-2">
                          <span className="font-medium text-muted-foreground w-12">
                            To:
                          </span>
                          <span className="text-green-600 dark:text-green-500 truncate font-medium">
                            {JSON.stringify(
                              Object.values(activity.newValue)[0]
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-border rounded-lg bg-muted/10">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
            <div className="bg-background p-4 rounded-full mb-4 relative shadow-sm border border-border">
              <Activity className="w-6 h-6 text-muted-foreground" />
            </div>
          </div>
          <p className="text-sm font-medium text-foreground">
            No activities recorded
          </p>
          <p className="text-xs text-muted-foreground mt-1 max-w-[200px]">
            Changes and updates to this task will appear here in the timeline.
          </p>
        </div>
      )}
    </div>
  );
};
