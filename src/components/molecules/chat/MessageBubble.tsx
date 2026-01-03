"use client";
import { useState } from "react";
import {
  //  Check, CheckCheck,
  Reply,
  Smile,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/atoms/button";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { MessageResponse } from "@/lib/api/message/message.types";
import { getDate } from "@/lib/utils";

interface MessageBubbleProps {
  message: MessageResponse;
  showSender: boolean;
}

export const MessageBubble = ({ message, showSender }: MessageBubbleProps) => {
  const [showActions, setShowActions] = useState(false);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const isSent =
    typeof message.sender === "string"
      ? message.sender === userId
      : message.sender.userId === userId;

  return (
    <div
      className={`flex gap-2 items-center animate-fade-in ${
        isSent ? "flex-row-reverse" : "flex-row"
      }`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div
        className={`flex flex-col max-w-[50%] ${
          isSent ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`relative rounded-lg ${
            isSent
              ? "bg-primary/50 rounded-tr-none"
              : "bg-[#20253d] rounded-tl-none"
          } ${message.sender && "pt-0"} px-3 py-2`}
        >
          {/* Message tail */}
          <div
            className={`absolute top-0 ${
              isSent
                ? "right-[-8px] border-l-[8px] border-l-primary/50 border-b-[13px] border-b-transparent rounded-tr-sm"
                : "left-[-8px] border-r-[8px] border-r-[#20253d] border-b-[13px] border-b-transparent rounded-tl-sm"
            }`}
            style={{ width: 0, height: 0 }}
          />

          {showSender && !isSent && (
            <span className="text-xs text-muted-foreground mb-1">
              {typeof message.sender !== "string" && message.sender.name}
            </span>
          )}
          <p className="text-sm leading-relaxed">{message.text}</p>

          <div
            className={`flex items-center gap-1 mt-1 text-xs ${
              isSent ? "text-primary-foreground/70" : "text-muted-foreground"
            }`}
          >
            <span>{getDate(message.createdAt)}</span>
            {/* {isSent && (
              <span>
                {message.status === "sent" && <Check className="h-3 w-3" />}
                {message.status === "delivered" && (
                  <CheckCheck className="size-4" />
                )}
                {message.status === "read" && (
                  <CheckCheck className="size-4 text-blue-700" />
                )}
              </span>
            )} */}
          </div>
        </div>
      </div>

      {/* Hover Actions */}
      {showActions && (
        <div className="flex items-center gap-1 animate-fade-in">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Smile className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Reply className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
