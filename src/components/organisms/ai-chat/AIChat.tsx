"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, Bot, User, Minimize2 } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import { Input } from "@/components/atoms/input";
import { ScrollArea } from "@/components/atoms/scroll-area";
import { cn } from "@/lib/utils";
import { RobotIcon } from "@/components/molecules/ai/RobotIcon";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi! I'm your Kanbanly AI assistant. How can I help you manage your workspace today?",
      timestamp: new Date(),
    },
  ]);
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
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    // Simulated AI response for UI demonstration
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "That's a great question! Since I'm currently in 'design-only' mode, I'll just say that I can help you with task automation, insights, and project management once my logic is fully implemented.",
          timestamp: new Date(),
        },
      ]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

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
              <div className="p-4 bg-primary text-primary-foreground flex items-center justify-between shadow-md">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-white/20 rounded-lg">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Kanbanly AI</h3>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-[10px] opacity-80">
                        Always active
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-primary-foreground hover:bg-white/10"
                    onClick={() => setIsOpen(false)}
                  >
                    <Minimize2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-primary-foreground hover:bg-white/10"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-4 h-4" />
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
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
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
                    className="flex-1 bg-muted/50 border-border focus-visible:ring-primary"
                  />
                  <Button
                    size="icon"
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
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
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="h-16 w-16 flex items-center justify-center transition-all duration-300 bg-transparent"
      >
        <div className="relative">
          <RobotIcon className="drop-shadow-2xl" isTransmitting={!isOpen} />
        </div>
      </motion.button>
    </div>
  );
};
