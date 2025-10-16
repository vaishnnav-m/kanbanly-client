"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Layers, MoreHorizontal, Plus } from "lucide-react";
import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import { Progress } from "@/components/atoms/progress";
import { epicColors } from "@/lib/constants/color.constants";
import { useTaskPageContext } from "@/contexts/TaskPageContext";

interface EpicsSidebarProps {
  showEpics: boolean;
  addEpic: (title: string, color: string) => void;
  setIsEpicModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedEpic: Dispatch<SetStateAction<string>>;
}

export function EpicsSidebar({
  showEpics,
  addEpic,
  setIsEpicModalOpen,
  setSelectedEpic,
}: EpicsSidebarProps) {
  const [addingEpic, setAddingEpic] = useState(false);
  const [epicName, setEpicName] = useState("");
  const [epicColor, setEpicColor] = useState("blue");

  const { epics } = useTaskPageContext();

  const handleAddEpic = () => {
    if (!epicName.trim() || !epicColor.trim()) return;

    addEpic(epicName.trim(), epicColor.trim());

    setEpicName("");
    setAddingEpic(false);
  };

  return (
    showEpics && (
      <div className="w-80 bg-card rounded-lg">
        <div className="dark:bg-gray-800/20 p-4 rounded-lg border-b border-border mb-2">
          <div className="flex items-center justify-between h-9">
            <div className="flex items-center gap-3">
              <Layers className="w-5 h-5 text-muted-foreground" />
              <h3 className="font-medium text-foreground">Epics</h3>
              <Badge variant="secondary" className="text-xs">
                {epics.length}
              </Badge>
            </div>
          </div>
        </div>
        <div className="dark:bg-gray-800/20 rounded-lg p-4 space-y-3 max-h-[calc(100vh-200px)] max-w-full overflow-y-auto">
          {epics.map((epic) => (
            <div key={epic.epicId} className="border border-border rounded-md">
              <div className="text-xs text-gray-600">
                <Progress className="h-1" value={epic.percentageDone || 0} />
                <div className="flex justify-between pt-1 px-2">
                  <span>Done</span>
                  <span>{epic.percentageDone}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between py-2 px-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      epicColors[epic.color as keyof typeof epicColors]
                    }`}
                  ></div>
                  <h4 className="font-medium text-foreground text-sm">
                    {epic.title}
                  </h4>
                </div>
                <Button
                  onClick={() => {
                    setIsEpicModalOpen(true);
                    setSelectedEpic(epic.epicId);
                  }}
                  variant="ghost"
                  size="sm"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
          {addingEpic ? (
            <div className="max-w-full">
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
              {/* Color selection */}
              <div className="flex items-center flex-wrap gap-2 mt-3">
                {Object.entries(epicColors).map((color) => (
                  <button
                    key={color[0]}
                    type="button"
                    className={`w-5 h-5 rounded-full border-2 ${
                      color[1]
                    } flex-shrink-0 transition-all duration-100 ${
                      epicColor === color[0]
                        ? "border-foreground scale-110"
                        : "border-transparent opacity-80"
                    }`}
                    onClick={() => setEpicColor(color[0])}
                    aria-label={`Select color ${color[0]}`}
                  />
                ))}
              </div>
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
              className="w-full text-muted-foreground hover:bg-gray-200 dark:hover:bg-gray-800/30 hover:text-muted-foreground"
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
