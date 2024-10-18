import { PcBuildState } from "./pc-build/pc-build.state"

export type AppState = {
  pcBuildState: PcBuildState;
  userState: UserState;
}
