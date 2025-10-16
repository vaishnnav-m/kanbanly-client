"use client";
import ProjectListingPageTemplate from "@/components/templates/project/ProjectListingPageTemplate";
import { useGetAllProjects } from "@/lib/hooks/useProject";
import { useDebounce } from "@/lib/utils";
import { RootState } from "@/store";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function ProjectListingPage() {
  const worksapceId = useSelector(
    (state: RootState) => state.workspace.workspaceId
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("lastUpdated");
  const [memberFilter, setMemberFilter] = useState("any");

  // hook for debounce
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const filters = {
    search: debouncedSearchTerm,
    memberFilter: memberFilter,
  };

  const [sortField, sortOrder] = sortBy.split("-");
  const sorting = {
    sortBy: sortField,
    order: sortOrder || (sortField === "lastUpdated" ? "desc" : "asc"),
  };

  const { data: projectsData, isFetching } = useGetAllProjects(
    worksapceId,
    filters,
    sorting
  );
  const projects = projectsData?.data ? projectsData.data : [];

  return (
    <ProjectListingPageTemplate
      projects={projects}
      isLoading={isFetching}
      totalProjectsCount={projects.length}
      //filters
      searchTerm={searchTerm}
      sortBy={sortBy}
      memberFilter={memberFilter}
      //filter methods
      onSearchChange={setSearchTerm}
      onSortChange={setSortBy}
      onMemberFilterChange={setMemberFilter}
    />
  );
}
