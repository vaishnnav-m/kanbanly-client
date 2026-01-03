"use client";
import React, {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, Bot, User, Minimize2 } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import { Input } from "@/components/atoms/input";
import { ScrollArea } from "@/components/atoms/scroll-area";
import { cn } from "@/lib/utils";
import { RobotIcon } from "@/components/molecules/ai/RobotIcon";
import { AiMessage } from "@/lib/api/ai/ai.types";

interface AIChatProps {
  messages: AiMessage[];
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  setMessages: Dispatch<SetStateAction<AiMessage[]>>;
  handleSend: () => void;
  isGenerating: boolean;
}

export const AIChat = ({
  messages,
  inputValue,
  setMessages,
  setInputValue,
  handleSend,
  isGenerating,
}: AIChatProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure the animation has started and the ScrollArea is rendered
      const timer = setTimeout(scrollToBottom, 100);
      return () => clearTimeout(timer);
    }
  }, [messages, isOpen, isGenerating]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (pathname?.includes("/chats/")) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 20,
              transformOrigin: "bottom right",
            }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="mb-4 w-[380px] sm:w-[420px] max-h-[600px] h-[70vh] flex flex-col relative"
          >
            <Card className="flex flex-col h-full border-primary/20 shadow-2xl overflow-hidden backdrop-blur-sm bg-card/95 rounded-3xl">
              {/* Header */}
              <div className="py-2.5 px-4 bg-primary text-primary-foreground flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2.5">
                  <div className="p-1 bg-white/20 rounded-md">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-semibold text-xs leading-none mb-0.5">
                      Kanbanly AI
                    </h3>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-[9px] opacity-70 font-medium">
                        Online
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-primary-foreground hover:bg-white/10 rounded-full"
                    onClick={() => setIsOpen(false)}
                  >
                    <Minimize2 className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-primary-foreground hover:bg-white/10 rounded-full"
                    onClick={() => {
                      setMessages([
                        {
                          role: "assistant",
                          content:
                            "Hi! I'm your Kanbanly AI assistant. I can help you manage your workspace. You can ask me how to use the tool (e.g., 'How do I create a sprint?') or give me direct instructions (e.g., 'Create a task named Prepare Report'). How can I help you today?",
                          timestamp: new Date(),
                        },
                      ]);
                      setIsOpen(false);
                    }}
                  >
                    <X className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>

              {/* Chat Area */}
              <div
                className="flex-1 overflow-hidden"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--muted-foreground) / 0.05) 1px, transparent 0)`,
                  backgroundSize: "24px 24px",
                }}
              >
                <ScrollArea className="h-full p-4">
                  <div className="space-y-4">
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={cn(
                          "flex w-full gap-2",
                          msg.role === "user" ? "justify-end" : "justify-start"
                        )}
                      >
                        {msg.role === "assistant" && (
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1 border border-primary/20">
                            <Bot className="w-4 h-4 text-primary" />
                          </div>
                        )}
                        <div
                          className={cn(
                            "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm",
                            msg.role === "user"
                              ? "bg-primary text-primary-foreground rounded-tr-none"
                              : "bg-muted text-foreground rounded-tl-none border border-border"
                          )}
                        >
                          {msg.content}
                          <div
                            className={cn(
                              "text-[10px] mt-1 opacity-50",
                              msg.role === "user" ? "text-right" : "text-left"
                            )}
                          >
                            {msg.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                        {msg.role === "user" && (
                          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-1 border border-border">
                            <User className="w-4 h-4 text-secondary-foreground" />
                          </div>
                        )}
                      </div>
                    ))}
                    {isGenerating && (
                      <div className="flex w-full gap-2 justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1 border border-primary/20">
                          <Bot className="w-4 h-4 text-primary animate-pulse" />
                        </div>
                        <div className="bg-muted text-foreground rounded-2xl rounded-tl-none border border-border px-4 py-3 shadow-sm">
                          <div className="flex gap-1.5 items-center h-4">
                            <motion.span
                              animate={{ opacity: [0.4, 1, 0.4] }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                times: [0, 0.5, 1],
                              }}
                              className="w-1.5 h-1.5 bg-primary rounded-full"
                            />
                            <motion.span
                              animate={{ opacity: [0.4, 1, 0.4] }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                times: [0, 0.5, 1],
                                delay: 0.2,
                              }}
                              className="w-1.5 h-1.5 bg-primary rounded-full"
                            />
                            <motion.span
                              animate={{ opacity: [0.4, 1, 0.4] }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                times: [0, 0.5, 1],
                                delay: 0.4,
                              }}
                              className="w-1.5 h-1.5 bg-primary rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </div>

              {/* Input Area */}
              <div className="p-4 border-t bg-card">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask me anything about your tasks..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isGenerating}
                    className="flex-1 bg-muted/50 border-border focus-visible:ring-primary"
                  />
                  <Button
                    size="icon"
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isGenerating}
                    className="shrink-0 shadow-md"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-[10px] text-center mt-2 text-muted-foreground italic">
                  Powered by Kanbanly AI Assistant
                </p>
              </div>
            </Card>

            {/* Thought Bubble Tail - connecting chat to robot */}
            <div className="absolute -bottom-3 right-10 w-4 h-4 bg-card rounded-full border border-primary/20 shadow-sm z-0" />
            <div className="absolute -bottom-[26px] right-[31px] w-2 h-2 bg-card rounded-full border border-primary/20 shadow-sm z-0" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        // whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="h-16 w-16 flex items-center justify-center transition-all duration-300 bg-transparent"
      >
        <div className="relative">
          <RobotIcon
            className="drop-shadow-2xl"
            isTransmitting={isGenerating || !isOpen}
          />
        </div>
      </motion.button>
    </div>
  );
};
