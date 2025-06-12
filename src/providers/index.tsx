"use client";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastProvider } from "./ToastProvider";
import { ToastContainer } from "@/componets/atoms/toaster";
import { useToastMessage } from "@/lib/hooks/useToastMessage";
import { setToastMessageInstance } from "@/lib/api/axios";

function ToastSetupWrapper({ children }: { children: React.ReactNode }) {
  const toast = useToastMessage();

  useEffect(() => {
    setToastMessageInstance(toast);
  }, [toast]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system">
        <ToastProvider>
          <ToastContainer />
          <ToastSetupWrapper>
            <ReduxProvider store={store}>{children}</ReduxProvider>
          </ToastSetupWrapper>
        </ToastProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
