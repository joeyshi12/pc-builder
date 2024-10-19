import { PcBuildState } from "./pc-build/pc-build.state"
import { UserState } from "./user/user.state";

export const pcBuildStateKey = "pcBuildState";
export const userStateKey = "userState";

export type AppState = {
  [pcBuildStateKey]: PcBuildState;
  [userStateKey]: UserState;
}

