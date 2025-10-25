"use client";
import { Card } from "@/components/atoms/card";
import React, { useState } from "react"; // useMemo is no longer needed
import { Folder, Users, Plus, Calendar, Activity, Search } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { IProject } from "@/lib/api/project/project.types";
import { getDate, hasPermission, PERMISSIONS } from "@/lib/utils";
import ProjectListSkeleton from "@/components/organisms/project/ProjectListSkeleton";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CreateProjectModal } from "@/components/organisms/project/CreateProject";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Input } from "@/components/atoms/input";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select";
import { workspaceRoles } from "@/types/roles.enum";

interface ProjectListingPageTemplateProps {
  projects: IProject[];
  isLoading: boolean;
  totalProjectsCount: number;
  searchTerm: string;
  sortBy: string;
  memberFilter: string;
  onSearchChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onMemberFilterChange: (value: string) => void;
}

function ProjectListingPageTemplate({
  projects,
  isLoading,
  totalProjectsCount,
  searchTerm,
  sortBy,
  memberFilter,
  onSearchChange,
  onSortChange,
  onMemberFilterChange,
}: ProjectListingPageTemplateProps) {
  // State for the modal remains as it's local to this component
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams();
  const slug = params.slug as string;
  const role = useSelector(
    (state: RootState) => state.workspace.memberRole
  ) as workspaceRoles;

  const canCreateProject = hasPermission(role, PERMISSIONS.CREATE_PROJECT);

  // --- Client-side filtering logic has been removed ---

  return (
    <div className="relative overflow-hidden">
      <div className="relative z-10">
        <div className="p-6 md:p-8 h-full">
          <div className="h-full space-y-8">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-1 animate-fade-in">
                    Projects
                  </h1>
                  <p
                    className="text-muted-foreground animate-fade-in"
                    style={{ animationDelay: "0.1s" }}
                  >
                    Welcome back! Here&#39;s what&#39;s happening with your
                    projects today.
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  {canCreateProject && (
                    <Button
                      onClick={() => setIsModalOpen(true)}
                      className="hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl group w-full md:w-auto"
                      size="lg"
                    >
                      <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                      Create New Project
                    </Button>
                  )}
                </div>
              </div>

              {/* --- Filter controls now use props for state and handlers --- */}
              <div
                className="flex flex-col md:flex-row items-center gap-4 animate-fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                {/* Search Input */}
                <div className="relative w-full md:flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search by project name..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10" // The shadcn Input component handles padding and other styles well
                  />
                </div>

                {/* Member Count Filter */}
                <div className="flex-shrink-0 flex w-full md:w-auto items-center gap-2">
                  <Label htmlFor="member-filter" className="whitespace-nowrap">
                    Members:
                  </Label>
                  <Select
                    value={memberFilter}
                    onValueChange={onMemberFilterChange}
                  >
                    <SelectTrigger
                      id="member-filter"
                      className="w-full md:w-[120px]"
                    >
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1-5">1-5</SelectItem>
                      <SelectItem value="6-10">6-10</SelectItem>
                      <SelectItem value="11+">11+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort By Filter */}
                <div className="flex-shrink-0 flex w-full md:w-auto items-center gap-2">
                  <Label htmlFor="sort-by" className="whitespace-nowrap">
                    Sort by:
                  </Label>
                  <Select value={sortBy} onValueChange={onSortChange}>
                    <SelectTrigger id="sort-by" className="w-full md:w-[180px]">
                      <SelectValue placeholder="Last Updated" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lastUpdated">Last Updated</SelectItem>
                      <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                      <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-up"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="border dark:bg-gradient-to-tr from-slate-900 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold gradient-text">
                  {totalProjectsCount}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Projects
                </div>
              </div>
              <div className="border dark:bg-gradient-to-tr from-slate-900 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold gradient-text">
                  {projects.filter((p) => p.status === "active").length}
                </div>
                <div className="text-sm text-muted-foreground">Active</div>
              </div>
              <div className="border dark:bg-gradient-to-tr from-slate-900 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold gradient-text">
                  {projects.filter((p) => p.status === "completed").length}
                </div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </div>

            {/* --- Grid rendering logic --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {isLoading ? (
                <ProjectListSkeleton />
              ) : totalProjectsCount === 0 ? (
                <div className="col-span-full text-center py-12">
                  <h3 className="text-xl font-semibold">No Projects Yet</h3>
                  <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                    {canCreateProject
                      ? 'Click "Create New Project" to get your first project started.'
                      : "The workspace owner has not created any projects yet."}
                  </p>
                </div>
              ) : projects.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <h3 className="text-xl font-semibold">
                    No Matching Projects
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    Try adjusting your search or filter criteria.
                  </p>
                </div>
              ) : (
                projects.map((project) => (
                  <Link
                    key={project.projectId}
                    href={`/workspaces/${slug}/projects/${project.projectId}/manage`}
                  >
                    <Card className="p-6 group cursor-pointer animate-scale-in relative h-full flex flex-col">
                      <div className="group-hover:opacity-100 opacity-0 h-1 rounded-b-lg bg-purple-400/40 absolute top-0 left-0 right-0 transition-opacity delay-200 ease-in"></div>
                      <div className="flex-grow">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-full flex items-center space-x-3">
                            <div className="p-2 rounded-lg bg-gradient-primary/20">
                              <Folder className="h-6 w-6 text-primary" />
                            </div>
                            <div className="w-full flex flex-wrap gap-2 items-center justify-between">
                              <h3 className="text-lg font-semibold text-foreground transition-all duration-300">
                                {project.name}
                              </h3>
                            </div>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {project.description || "No description available"}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {project.members.length} member
                            {project.members.length !== 1 ? "s" : ""}
                          </span>
                        </div>
                        {project.lastUpdated && (
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{getDate(project.lastUpdated)}</span>
                          </div>
                        )}
                      </div>
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Activity className="h-4 w-4 text-primary animate-pulse" />
                      </div>
                    </Card>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default ProjectListingPageTemplate;
