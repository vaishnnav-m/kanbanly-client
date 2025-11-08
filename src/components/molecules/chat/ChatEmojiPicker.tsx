"use client";
import { Dispatch, SetStateAction, useState } from "react";
import {
  EmojiPicker,
  EmojiPickerSearch,
  EmojiPickerContent,
  EmojiPickerFooter,
} from "@/components/atoms/emoji-picker";
import { Smile } from "lucide-react";
import { Button } from "@/components/atoms/button";

interface ChatEmojiProps {
  setMessage: Dispatch<SetStateAction<string>>;
}

export const ChatEmojiPicker = ({ setMessage }: ChatEmojiProps) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="relative flex items-center gap-2 bg-background">
      <Button
        variant="outline"
        onClick={() => setShowPicker((prev) => !prev)}
        className="min-h-[44px] max-h-[120px] text-muted-foreground bg-sidebar hover:text-foreground"
      >
        <Smile className="w-5 h-5" />
      </Button>

      {showPicker && (
        <div className="absolute bottom-12 left-0 z-50">
          <EmojiPicker
            onEmojiSelect={(emoji) => setMessage((prev) => prev + emoji.emoji)}
            className="w-72 border border-border shadow-lg max-h-96"
          >
            <EmojiPickerSearch className="!pl-2 " />
            <EmojiPickerContent />
            <EmojiPickerFooter />
          </EmojiPicker>
        </div>
      )}
    </div>
  );
};
