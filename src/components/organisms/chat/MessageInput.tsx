import { useState } from "react";
import { Smile, Paperclip, Mic, Send } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Textarea } from "@/components/atoms/textarea";

export const MessageInput = () => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-card px-6 py-4">
      <div className="flex items-end gap-2">
        <Button variant="ghost" size="icon" className="border bg-sidebar min-h-[44px] max-h-[120px] flex-shrink-0">
          <Smile className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon" className="border bg-sidebar min-h-[44px] max-h-[120px] flex-shrink-0 ">
          <Paperclip className="h-5 w-5" />
        </Button>

        <Textarea
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="min-h-[44px] max-h-[120px] resize-none bg-sidebar border-border"
          rows={1}
        />

        {message.trim() ? (
          <Button
            onClick={handleSend}
            size="icon"
            className="flex-shrink-0 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
          >
            <Send className="h-5 w-5" />
          </Button>
        ) : (
          <Button variant="ghost" size="icon" className="border bg-sidebar min-h-[44px] max-h-[120px] flex-shrink-0">
            <Mic className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
};
