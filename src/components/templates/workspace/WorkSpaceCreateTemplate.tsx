"use client";
import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import { Card, CardContent } from "@/components/atoms/card";
import { Input } from "@/components/atoms/input";
import { Textarea } from "@/components/atoms/textarea";
import { workspaceIcons } from "@/constants/icons";
import { WorkspaceCreatePayload } from "@/lib/api/workspace/workspace.types";
import { Label } from "@radix-ui/react-label";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";

interface workspaceCreateProps {
  handleCreateWorkspace: (payload: WorkspaceCreatePayload) => void;
  isLoading: boolean;
}

function WorkSpaceCreateTemplate({
  handleCreateWorkspace,
  isLoading,
}: workspaceCreateProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedIcon, setSelectedIcon] = useState(workspaceIcons[0]);
  const [workspaceName, setWorkspaceName] = useState("");
  const [description, setDescription] = useState("");
  const [workspaceNameError, setWorkspaceNameError] = useState<string | null>(
    null
  );

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateForm = () => {
    if (!workspaceName.trim()) {
      setWorkspaceNameError("Workspace name is required.");
      return false;
    }
    setWorkspaceNameError(null);
    return true;
  };

  const handleFormSubmit = () => {
    if (!validateForm()) return;

    handleCreateWorkspace({
      name: workspaceName,
      description,
      logo: selectedIcon.name,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 transition-colors duration-300">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div className="flex items-center space-x-4">
            {currentStep > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Create a new workspace
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                A workspace is a group of pages where teammates can collaborate
              </p>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="flex space-x-2">
            {[1, 2].map((step) => (
              <div
                key={step}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  step <= currentStep
                    ? "bg-primary"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Main Content */}
        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-all duration-500">
          <CardContent className="p-8">
            {/* Step 1: Icon Selection */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-scale-in">
                <div className="text-center space-y-2">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Choose your workspace icon
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Pick an icon that represents your workspace
                  </p>
                </div>

                <div className="grid grid-cols-5 gap-4 max-w-md mx-auto">
                  {workspaceIcons.map((iconData, index) => {
                    const IconComponent = iconData.icon;
                    return (
                      <button
                        key={iconData.name}
                        onClick={() => setSelectedIcon(iconData)}
                        className={`p-4 rounded-xl transition-all duration-200 hover:scale-110 hover:shadow-lg ${
                          selectedIcon.name === iconData.name
                            ? "ring-2 ring-primary shadow-lg scale-105"
                            : "hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div
                          className={`w-12 h-12 rounded-lg ${iconData.color} flex items-center justify-center mx-auto`}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-center pt-4">
                  <Button
                    onClick={handleNext}
                    className="px-8 py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Workspace Details */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-scale-in">
                <div className="text-center space-y-2">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Workspace details
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Give your workspace a name and description
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="workspace-name"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Workspace name
                    </Label>
                    <Input
                      id="workspace-name"
                      placeholder="e.g. Marketing Team"
                      required
                      value={workspaceName}
                      onChange={(e) => {
                        setWorkspaceName(e.target.value);
                        if (workspaceNameError) setWorkspaceNameError(null);
                      }}
                      className={`border ${
                        workspaceNameError
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 dark:border-gray-600 focus:ring-primary focus:border-primary"
                      }`}
                    />
                    {workspaceNameError && (
                      <p className="text-sm text-red-500 mt-1">
                        {workspaceNameError}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="description"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Description (optional)
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="What's this workspace for?"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="border-gray-300 dark:border-gray-600 focus:ring-primary focus:border-primary resize-none"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="flex justify-center pt-4">
                  <Button
                    onClick={handleFormSubmit}
                    className="px-8 py-2 bg-accent hover:bg-accent/90 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg"
                  >
                    {isLoading ? "Creating..." : "Create workspace"}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400 animate-fade-in">
          <p>
            Need help? Check out our{" "}
            <a href="#" className="text-primary hover:underline">
              workspace guide
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default WorkSpaceCreateTemplate;
