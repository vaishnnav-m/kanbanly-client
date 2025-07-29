import { createSlice, PayloadAction } from "@reduxjs/toolkit";

function getInitialprojectName() {
  if (typeof window !== undefined) {
    return localStorage.getItem("projectName") || "";
  }
  return "";
}

const projectName = getInitialprojectName();
interface ProjectState {
  projectName: string;
}
const initialState: ProjectState = {
  projectName: projectName || "",
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setprojectData: (state, action: PayloadAction<{ projectName: string }>) => {
      state.projectName = action.payload.projectName;
    },
    removeprojectData: (state) => {
      state.projectName = "";
    },
  },
});

export const { removeprojectData, setprojectData } = projectSlice.actions;
export default projectSlice.reducer;
