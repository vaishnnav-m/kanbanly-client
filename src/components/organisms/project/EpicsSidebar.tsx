import { useState } from "react";
import {
  Layers,
  EyeOff,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import { IEpic } from "@/lib/api/epic/epic.types";

interface EpicsSidebarProps {
  epics: IEpic[];
  showEpics: boolean;
  setShowEpics: (show: boolean) => void;
  addEpic: (title: string) => void;
}

export function EpicsSidebar({
  epics,
  showEpics,
  setShowEpics,
  addEpic,
}: EpicsSidebarProps) {
  const [addingEpic, setAddingEpic] = useState(false);
  const [epicName, setEpicName] = useState("");

  const handleAddEpic = () => {
    if (!epicName.trim()) return;

    addEpic(epicName.trim());

    setEpicName("");
    setAddingEpic(false);
  };

  return (
    showEpics && (
      <div className="w-80 border-r border-border bg-card">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Layers className="w-5 h-5 text-muted-foreground" />
              <h3 className="font-medium text-foreground">Epics</h3>
              <Badge variant="secondary" className="text-xs">
                {epics.length}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowEpics(false)}
            >
              <EyeOff className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="p-4 space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
          {epics.map((epic) => (
            <div key={epic.epicId} className="border border-border rounded-md">
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full"></div>
                  <h4 className="font-medium text-foreground text-sm">
                    {epic.title}
                  </h4>
                  {/* <Badge variant="outline" className="text-xs">
                    {epic.issues.length}
                  </Badge> */}
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
          {addingEpic ? (
            <div className="">
              <input
                type="text"
                value={epicName}
                onChange={(e) => setEpicName(e.target.value)}
                placeholder="Epic name"
                className="w-full px-2 py-2 rounded border border-border bg-background text-sm"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddEpic();
                  if (e.key === "Escape") setAddingEpic(false);
                }}
              />
              <div className="flex mt-3">
                <Button
                  size="sm"
                  onClick={handleAddEpic}
                  disabled={!epicName.trim()}
                  className="px-3"
                >
                  Add
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setAddingEpic(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-muted-foreground hover:text-foreground"
              onClick={() => setAddingEpic(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create epic
            </Button>
          )}
        </div>
      </div>
    )
  );
}
