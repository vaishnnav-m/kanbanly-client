import { Button } from "@/components/atoms/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/atoms/collapsible";
import { SidebarMenuButton } from "@/components/atoms/sidebar";
import { ChevronDown, MessageSquare } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

export const NavChats = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState("team-alpha");
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  
  const isActive = pathname === "/chats" || pathname.includes("chats");

  const conversations = [
    { id: "team-alpha", name: "Team Alpha", unread: 3 },
    { id: "project-updates", name: "Project Updates", unread: 0 },
    { id: "design-team", name: "Design Team", unread: 7 },
  ];

  const handleChatSelect = (chatId?: string) => {
    const targetChatId = chatId || selectedChat;
    setSelectedChat(targetChatId);
    router.push(`/workspaces/${params.slug}/chats/${targetChatId}`);
  };

  return (
    <Collapsible open={chatOpen} onOpenChange={setChatOpen}>
      <CollapsibleTrigger asChild>
        <SidebarMenuButton
          className={`w-full justify-between gap-3 group ${
            isActive && "bg-gray-500/15"
          }`}
          onClick={() => handleChatSelect()}
        >
          <div className="flex items-center gap-4">
            <MessageSquare
              className={`size-5 ${isActive && "text-primary"} `}
            />
            <span className="font-medium">Chats</span>
          </div>
          <ChevronDown
            className={`size-5 transition-transform duration-300 ${
              chatOpen ? "rotate-180" : ""
            }`}
          />
        </SidebarMenuButton>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-1">
        {conversations.map((conv) => (
          <Button
            key={conv.id}
            variant={selectedChat === conv.id ? "secondary" : "ghost"}
            className={`w-full justify-between text-xs pl-10 transition-all duration-200 group ${
              selectedChat === conv.id && "shadow-sm border-l-2 border-primary"
            }`}
            onClick={() => handleChatSelect(conv.id)}
          >
            <span className="truncate font-medium">{conv.name}</span>
            {conv.unread > 0 && (
              <span className="h-5 min-w-5 px-1.5 flex items-center justify-center bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-full text-[10px] font-bold shadow-sm animate-pulse-subtle">
                {conv.unread}
              </span>
            )}
          </Button>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};
