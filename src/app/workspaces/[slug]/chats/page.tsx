import { MessageSquare, Lock } from "lucide-react";

function EmptyChatPage() {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 75px)",
      }}
      className="flex-1 flex items-center justify-center bg-background/50"
    >
      <div className="text-center space-y-6 max-w-md px-6 animate-fade-in">
        <div className="relative inline-block">
          <div className="h-32 w-32 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
            <MessageSquare className="h-16 w-16 text-primary" />
          </div>
          <div className="absolute -bottom-2 -right-2 h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
            <Lock className="h-6 w-6 text-primary-foreground" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Kanbanly Chats</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Send and receive messages with your team members.
            <br />
            Select a chat from the sidebar to start messaging.
          </p>
        </div>

        {/* <div className="pt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Lock className="h-3 w-3" />
          <span>Your personal messages are end-to-end encrypted</span>
        </div> */}
      </div>
    </div>
  );
}

export default EmptyChatPage;
