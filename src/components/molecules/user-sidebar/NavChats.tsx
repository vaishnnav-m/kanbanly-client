"use client";
import { Avatar } from "@/components/atoms/avatar";
import { Button } from "@/components/atoms/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/atoms/collapsible";
import { SidebarMenuButton } from "@/components/atoms/sidebar";
import { Skeleton } from "@/components/atoms/skeleton";
import { IChatListing } from "@/lib/api/chat/chat.types";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ChevronDown, MessageSquare, UserCircle, Users2 } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface NavChatsProps {
  chats: IChatListing[];
  isLoading: boolean;
}

export const NavChats = ({ chats, isLoading }: NavChatsProps) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const isActive = pathname === "/chats" || pathname.includes("chats");

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
        {isLoading ? (
          <Skeleton className="h-6 w-full" />
        ) : (
          chats.map((chat) => (
            <>
              <Button
                key={chat.chatId}
                variant={selectedChat === chat.chatId ? "secondary" : "ghost"}
                className={`w-full justify-between text-xs pl-5 transition-all duration-200 group ${
                  selectedChat === chat.chatId &&
                  "shadow-sm border-l-2 border-primary"
                }`}
                onClick={() => handleChatSelect(chat.chatId)}
              >
                <div className="flex gap-3 items-center">
                  <Avatar className="h-7 w-7 border shadow-sm group-hover:scale-105 transition-transform">
                    <AvatarImage className="size-" src={chat.icon} />
                    <AvatarFallback>
                      {chat.type === "direct" ? <UserCircle /> : <Users2 />}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm truncate font-bold">
                    {chat.name}
                  </span>
                </div>
                {/* {chat.unread > 0 && ( */}
                <span className="h-5 min-w-5 px-1.5 flex items-center justify-center bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-full text-[10px] font-bold shadow-sm animate-pulse-subtle">
                  3
                </span>
                {/* )} */}
              </Button>
            </>
          ))
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};
