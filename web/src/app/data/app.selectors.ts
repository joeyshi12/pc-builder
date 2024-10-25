import { createSelector } from "@ngrx/store";
import { UserProfile } from "../transfers/user";
import { PcBuild } from "../transfers/pc_build";
import { pcBuildsSelector } from "./pc-build/pc-build.selectors";
import { userSelector } from "./user/user.selectors";

export const userBuildsSelector = createSelector(
  userSelector,
  pcBuildsSelector,
  (user: UserProfile | undefined, builds: PcBuild[]) => {
    if (!user) {
      return [];
    }
    return builds.filter(build => build.username === user.username);
  }
);
