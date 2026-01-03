export interface MessageResponse {
  sender:
    | {
        userId: string;
        name: string;
        email: string;
        profile?: string;
      }
    | string;
  text: string;
  createdAt: Date;
  chatId?: string;
  //   isSent: boolean;
  //   status: "sent" | "delivered" | "read";
  //   type: "text" | "image";
  //   imageUrl?: string;
}
