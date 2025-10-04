import { getStorageItem } from "@/lib/utils";
import { projectTemplate } from "@/types/project.enum";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const projectName = getStorageItem("projectName") || "";
const projectTemplateValue =
  (getStorageItem("projectTemplate") as projectTemplate) ||
  projectTemplate.kanban;
const projectKey = getStorageItem("projectKey") || "";

interface ProjectState {
  projectName: string;
  projectTemplate: projectTemplate;
  projectKey: string;
}

const initialState: ProjectState = {
  projectName: projectName || "",
  projectTemplate: projectTemplateValue || projectTemplate.kanban,
  projectKey: projectKey || "",
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setprojectData: (
      state,
      action: PayloadAction<{
        projectName: string;
        projectTemplate: projectTemplate;
        projectKey: string;
      }>
    ) => {
      state.projectName = action.payload.projectName;
      state.projectTemplate = action.payload.projectTemplate;
      state.projectKey = action.payload.projectKey;
    },
    removeprojectData: (state) => {
      state.projectName = "";
      state.projectTemplate = projectTemplate.kanban;
      state.projectKey = "";
    },
  },
});

export const { removeprojectData, setprojectData } = projectSlice.actions;
export default projectSlice.reducer;
