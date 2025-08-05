"use client";
import { Card } from "@/components/atoms/card";
import React, { useState } from "react";
import { Folder, Users, Plus, Star, Calendar, Activity } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { IProject } from "@/lib/api/project/project.types";
import { getDate } from "@/lib/utils";
import ProjectListSkeleton from "@/components/organisms/project/ProjectListSkeleton";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CreateProjectModal } from "@/components/organisms/project/CreateProject";

interface ProjectListingPageTemplateProps {
  projects: IProject[];
  isLoading: boolean;
}

function ProjectListingPageTemplate({
  projects,
  isLoading,
}: ProjectListingPageTemplateProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams();
  const slug = params.slug as string;
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "completed":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="relative overflow-hidden max-w-7xl mx-auto">
      <div className="relative z-10">
        <div className="p-6 md:p-8 h-full">
          <div className="h-full space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1 animate-fade-in">
                Projects
              </h1>
              <p
                className="text-muted-foreground animate-fade-in"
                style={{ animationDelay: "0.1s" }}
              >
                Welcome back! Here's what's happening with your projects today.
              </p>
              <div className="text-end">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl group"
                  size="lg"
                >
                  <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                  Create New Project
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-slide-up"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="border bg-gradient-to-tr from-slate-900 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold gradient-text">
                  {projects.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Projects
                </div>
              </div>
              <div className="border bg-gradient-to-tr from-slate-900 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold gradient-text">
                  {projects.filter((p) => p.status === "active").length}
                </div>
                <div className="text-sm text-muted-foreground">Active</div>
              </div>
              <div className="border bg-gradient-to-tr from-slate-900 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold gradient-text">
                  {projects.filter((p) => p.status === "completed").length}
                </div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
              {/* <div className="border bg-gradient-to-tr from-slate-900 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold gradient-text">
                  {projects.reduce((acc, p) => acc + p.members.length, 0)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Team Members
                </div>
              </div> */}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                <ProjectListSkeleton />
              ) : projects.length ? (
                projects.map((project) => (
                  <Link
                    key={project.projectId}
                    href={`/workspaces/${slug}/projects/${project.projectId}/manage`}
                  >
                    <Card className="p-6 group cursor-pointer animate-scale-in relative">
                      <div className="group-hover:opacity-100 opacity-0 h-1 rounded-b-lg bg-purple-400/40 absolute top-0 left-0 right-0 transition-opacity delay-200 ease-in"></div>
                      {/* Project Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-full flex items-center space-x-3">
                          <div className="p-2 rounded-lg bg-gradient-primary/20">
                            <Folder className="h-6 w-6 text-primary" />
                          </div>
                          <div className="w-full flex flex-wrap gap-2 items-center justify-between">
                            <h3 className="text-lg font-semibold text-foreground transition-all duration-300">
                              {project.name}
                            </h3>
                            {/* <div
                              className={`rounded-lg px-2 border ${getStatusColor(
                                project.status!
                              )}`}
                            >
                              <p>{project.status}</p>
                            </div> */}
                          </div>
                        </div>
                      </div>

                      {/* Project Description */}
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {project.description || "No description available"}
                      </p>

                      {/* Progress Bar */}
                      {/* <div className="mb-4">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-gradient-primary h-2 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div> */}

                      {/* Project Footer */}
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

                      {/* Activity Indicator */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Activity className="h-4 w-4 text-primary animate-pulse" />
                      </div>
                    </Card>
                  </Link>
                ))
              ) : (
                <div className="w-full p-10">
                  <span>No Projects</span>
                </div>
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
