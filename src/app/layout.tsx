import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Kanbanly",
  description: "Project management tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable}`}>
      <head>
        <link rel="icon" href="/logo.svg" sizes="any" />
      </head>
      <body className="font-inter">
        <Providers>{children}</Providers>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
