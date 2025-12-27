"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/avatar";
import { ScrollArea } from "@/components/atoms/scroll-area";
import { useGetProjectMembers } from "@/lib/hooks/useProject";
import { User } from "lucide-react";

interface ChatProjectMembersProps {
  workspaceId: string;
  projectId: string;
}

export const ChatProjectMembers = ({
  workspaceId,
  projectId,
}: ChatProjectMembersProps) => {
  const { data, isPending: isLoading } = useGetProjectMembers(
    workspaceId,
    projectId
  );
  const members = data?.data || [];
  console.log(data);

  return (
    <div className="w-64 border-l border-border bg-sidebar flex flex-col">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold">Project Members</h3>
        <p className="text-xs text-muted-foreground">
          {members.length} members
        </p>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading members...</p>
          ) : (
            members.map((member) => (
              <div key={member._id} className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={member.profile} />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="overflow-hidden">
                  <p className="text-sm font-medium truncate">{member.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {member.email}
                  </p>
                </div>
              </div>
            ))
          )}
          {!isLoading && members.length === 0 && (
            <p className="text-sm text-muted-foreground">No members found.</p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
