"use client";
import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  Calendar,
  CheckCircle2,
  User,
} from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { TaskListing } from "@/lib/api/task/task.types";
import { TaskStatus } from "@/types/task.enum";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface TaskListingPageTemplateProps {
  projectId: string;
  tasks: TaskListing[] | [];
}

function TaskListingPageTemplate({
  tasks,
  projectId,
}: TaskListingPageTemplateProps) {
  const [activeTab, setActiveTab] = useState("List");
  const projectName = useSelector(
    (state: RootState) => state.project.projectName
  );

  const tabs = ["Overview", "List", "Board", "Timeline"];

  const addTask = () => {
    //  const newTask: TaskListing = {
    //    taskId: Date.now().toString(),
    //    task: "New task",
    //    status: TaskStatus.Todo,
    //    dueDate: new Date(),
    //  };
    //  setTasks([...tasks, newTask]);
  };

  const toggleTaskComplete = (taskId: string) => {
    //  setTasks(
    //    tasks.map((task) =>
    //      task.taskId === taskId
    //        ? { ...task, status: TaskStatus.Completed }
    //        : task
    //    )
    //  );
  };

  return (
    <div className="min-h-screen bg-background max-w-7xl mx-auto">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
              </div>
              <h1 className="text-lg font-semibold text-foreground">
                {projectName}
              </h1>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6">
          <nav className="flex gap-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="p-6">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button
              onClick={addTask}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add task
            </Button>
            <div className="flex items-center gap-2">
              <Button
                className="hover:bg-primary/10"
                variant="outline"
                size="sm"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button
                className="hover:bg-primary/10"
                variant="outline"
                size="sm"
              >
                <ArrowUpDown className="w-4 h-4 mr-2" />
                Sort
              </Button>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search tasks..." className="pl-10 w-64" />
          </div>
        </div>

        {/* Task Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[40px_1fr_200px_200px_40px] gap-4 p-4 bg-muted/50 border-b border-border text-sm font-medium text-muted-foreground">
            <div></div>
            <div>Name</div>
            <div>Assignee</div>
            <div>Due date</div>
          </div>

          {/* Tasks */}
          {tasks.length &&
            tasks.map((task) => (
              <div
                key={task.taskId}
                className="grid grid-cols-[40px_1fr_200px_200px_40px] gap-4 p-4 border-b border-border hover:bg-muted/30 transition-colors group"
              >
                <div className="flex items-center">
                  <button
                    onClick={() => toggleTaskComplete(task.taskId)}
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      task.status === TaskStatus.Completed
                        ? "bg-accent border-accent "
                        : "border-muted-foreground hover:border-accent"
                    }`}
                  >
                    {task.status === TaskStatus.Completed && (
                      <CheckCircle2 className="w-full h-full" />
                    )}
                  </button>
                </div>

                <div className="flex items-center">
                  <span
                    className={`${
                      task.status === TaskStatus.Completed
                        ? "text-muted-foreground"
                        : "text-foreground"
                    }`}
                  >
                    {task.task}
                  </span>
                </div>

                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-transparent"
                  >
                    <User className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </div>

                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-transparent"
                  >
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    {task.dueDate && <span>{task.dueDate.toDateString()}</span>}
                  </Button>
                </div>

                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-transparent"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}

export default TaskListingPageTemplate;
