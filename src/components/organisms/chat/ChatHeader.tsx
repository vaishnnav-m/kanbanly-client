import { Avatar, AvatarFallback } from "@/components/atoms/avatar";
import { Button } from "@/components/atoms/button";
import { ChatResponse } from "@/lib/api/chat/chat.types";
import { AvatarImage } from "@radix-ui/react-avatar";
import { MoreVertical, Phone, Search, User, Users2, Video } from "lucide-react";

interface ChatHeaderProps {
  chatInfo: ChatResponse;
}

export const ChatHeader = ({ chatInfo }: ChatHeaderProps) => {
  const chat = chatInfo || {
    name: "Unknown",
    status: "offline",
  };

  console.log("chat",chat)
  return (
    <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-sidebar border-t">
      <Avatar className="h-10 w-10">
        <AvatarImage src={chat.icon} />
        <AvatarFallback className="bg-white/10">
          {chat.type === "direct" ? <User /> : <Users2 />}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold truncate">{chat.name}</h3>
        {/* {chat.typing ? (
          <p className="text-sm text-primary animate-pulse-subtle">typing...</p>
        ) : (
          <p className="text-sm text-muted-foreground truncate">
            {chat.status}
          </p>
        )} */}
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Phone className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Video className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
