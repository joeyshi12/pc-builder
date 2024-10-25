import { createSelector } from "@ngrx/store";
import { AppState, pcBuildStateKey } from "../app.state";
import { PcBuildState } from "./pc-build.state";

export const pcBuildStateSelector = (state: AppState) => state[pcBuildStateKey];

export const pcBuildsSelector = createSelector(
  pcBuildStateSelector,
  (state: PcBuildState) => state.builds
);

export const draftSelector = createSelector(
  pcBuildStateSelector,
  (state: PcBuildState) => state.draftBuild
);

export const draftComponentsSelector = createSelector(
  pcBuildStateSelector,
  (state: PcBuildState) => state.draftBuildComponents
);

export const isDraftLoadingSelector = createSelector(
  pcBuildStateSelector,
  (state: PcBuildState) => state.isDraftLoading
);

