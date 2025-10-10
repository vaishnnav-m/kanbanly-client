import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import { Section } from "@/components/organisms/project/BacklogView";
import { Eye, EyeOff } from "lucide-react";

interface BacklogHeaderProps {
  sections: Section[];
  onToggleEpics: () => void;
  showEpics: boolean;
}

export const BacklogHeader = ({
  sections,
  onToggleEpics,
  showEpics,
}: BacklogHeaderProps) => {
  return (
    <div className="bg-card dark:bg-gray-800/20  border-b border-border p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-foreground">
            Backlog Management
          </h2>
          <Badge variant="outline" className="text-xs">
            {sections.reduce((total, section) => total + section.issueCount, 0)}{" "}
            total work items
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onToggleEpics()}
            className="text-muted-foreground hover:text-foreground bg-inherit"
          >
            {showEpics ? (
              <>
                <EyeOff className="w-4 h-4 mr-2" />
                Hide Epics
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-2" />
                Show Epics
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
