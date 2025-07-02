"use client";
import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import SearchBar from "@/components/molecules/SearchBar";
import DataTable from "@/components/organisms/DataTable";
import { ButtonConfig } from "@/types/table.types";
import { EllipsisIcon, UserPlus } from "lucide-react";

function WorkspaceMembersTemplates() {
  interface Members {
    id: string;
    name: string;
    role: string;
    lastActivity: string;
  }

  const headings = ["Name", "Role", "Last Activity", "Manage"];
  const data: Members[] = [
    {
      id: "1",
      name: "Max",
      role: "Member",
      lastActivity: "2 days ago",
    },
    {
      id: "2",
      name: "Gregor",
      role: "Project Manager",
      lastActivity: "2 days ago",
    },
    {
      id: "3",
      name: "Yiran",
      role: "Member",
      lastActivity: "2 days ago",
    },
  ];
  const cols: (keyof Members)[] = ["name", "role", "lastActivity"];
  const buttonConfigs: ButtonConfig<Members>[] = [
    {
      action: (data) => {
        console.log("button clicked", data);
      },
      styles: "bg-none",
      icon: (member) => <EllipsisIcon />,
    },
  ];

  return (
    <main className="flex-1 overflow-auto">
      <div className="p-6 md:p-8 h-full">
        <div className="max-w-7xl mx-auto h-full space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1 animate-fade-in">
              Members
            </h1>
            <p
              className="text-muted-foreground animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              Manage your team members, see who’s active, and stay up to date
              with recent activity.
            </p>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Card className="p-6 animate-fade-in">
              <div className="w-full flex justify-between items-center px-5 pb-5 border-b-2">
                <span>This workspace has 3 members</span>
                <Button>
                  <UserPlus />
                  Invite Members
                </Button>
              </div>
              <div className="w-full pt-5 px-5 pb-3">
                <SearchBar placeholder="Search Members" />
              </div>
              <div className="px-5">
                <DataTable<Members>
                  headings={headings}
                  data={data}
                  columns={cols}
                  buttonConfigs={buttonConfigs}
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}

export default WorkspaceMembersTemplates;
