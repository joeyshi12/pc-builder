import { createAction, createReducer, on } from '@ngrx/store';


export type ComponentType = "cpu" | "motherboard" | "memory" | "storage" | "videoCard" | "powerSupply";

export interface BuildList {
  displayName: string;
  description: string;
  componentIds: Map<ComponentType, string[]>;
}

export const updateBuildListName = createAction("updateBuildListName");
export const updateBuildListDescription = createAction("updateBuildListDescription");
export const updateBuildListComponentIds = createAction("updateBuildListComponentIds");
export const resetBuildList = createAction("resetBuildList");

export const initialState: BuildList = {
  displayName: "",
  description: "",
  componentIds: new Map()
};

export const buildListReducer = createReducer(
  initialState,
  on(updateBuildListName, (state: BuildList) => {
    console.log("name");
    return state;
  }),
  on(updateBuildListDescription, (state: BuildList) => {
    console.log("description");
    return state;
  }),
  on(updateBuildListComponentIds, (state: BuildList) => {
    console.log("componentIds");
    return state;
  }),
  on(resetBuildList, (state: BuildList) => {
    console.log("reset");
    return state;
  })
)
