// import { Button } from "@/components/atoms/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/atoms/select";
// import { Calendar, Filter } from "lucide-react";

function DashboardFilters() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold mb-1">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Track your team&#39;s progress and performance
        </p>
      </div>

      {/* <div className="flex flex-wrap gap-3">
        <Select defaultValue="all-workspaces">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select workspace" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-workspaces">All Workspaces</SelectItem>
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="this-month">
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="this-week">This Week</SelectItem>
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="this-quarter">This Quarter</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="icon">
          <Calendar className="h-4 w-4" />
        </Button>

        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div> */}
    </div>
  );
}

export default DashboardFilters;
