"use client";
import { Calendar } from "@/components/organisms/user/Calendar";
import { Goals } from "@/components/organisms/user/Goals";
import { TaskList } from "@/components/organisms/user/TaskList";
import React from "react";

function HomeTemplate() {
  return (
    <main className="flex-1 overflow-auto">
      <div className="p-6 md:p-8 h-full">
        <div className="max-w-7xl mx-auto h-full space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1 animate-fade-in">
              Dashboard
            </h1>
            <p
              className="text-muted-foreground animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              Welcome back! Here's what's happening with your projects today.
            </p>
          </div>

          {/* My Tasks */}
          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <TaskList />
          </div>

          {/* Calendar and Goals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              <Calendar />
            </div>
            <div
              className="animate-slide-up"
              style={{ animationDelay: "0.4s" }}
            >
              <Goals />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default HomeTemplate;
