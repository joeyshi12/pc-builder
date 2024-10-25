import { PcBuild } from "src/app/transfers/pc_build";
import { PcComponents } from "../pc-component/pc-component";

export type PcBuildState = {
  builds: PcBuild[];
  draftBuild: PcBuild;
  draftBuildComponents: PcComponents,
  isDraftLoading: boolean;
}

export type PcBuildBasicInfo = {
  displayName: string;
  description: string;
};
