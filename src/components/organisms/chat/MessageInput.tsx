import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Textarea } from "@/components/atoms/textarea";
import { ChatEmojiPicker } from "@/components/molecules/chat/ChatEmojiPicker";

interface MessageInputProps {
  handleSendMessage: (text: string) => void;
}

export const MessageInput = ({ handleSendMessage }: MessageInputProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      handleSendMessage(message);
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
        <ChatEmojiPicker setMessage={setMessage} />

        <Textarea
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="min-h-[44px] max-h-[120px] resize-none bg-sidebar border-border"
          rows={1}
        />

        {message.trim() && (
          <Button
            onClick={handleSend}
            size="icon"
            className="flex-shrink-0 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
          >
            <Send className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
};
