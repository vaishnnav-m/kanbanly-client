import { Avatar, AvatarFallback } from "@/components/atoms/avatar";
import { Button } from "@/components/atoms/button";
import { MoreVertical, Phone, Search, Video } from "lucide-react";

interface ChatHeaderProps {
  chatId: string;
  chatInfo: Record<string, { name: string; status: string; typing?: boolean }>;
}

export const ChatHeader = ({ chatId, chatInfo }: ChatHeaderProps) => {
  const chat = chatInfo[chatId] || { name: "Unknown", status: "offline" };

  return (
    <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-sidebar border-t">
      <Avatar className="h-10 w-10">
        <AvatarFallback className="bg-primary/10 text-primary">
          {chat.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold truncate">{chat.name}</h3>
        {chat.typing ? (
          <p className="text-sm text-primary animate-pulse-subtle">typing...</p>
        ) : (
          <p className="text-sm text-muted-foreground truncate">
            {chat.status}
          </p>
        )}
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
