import { PcBuild } from "src/app/transfers/pc_build";

export type PcBuildState = {
  builds: PcBuild[];
  draftBuild: PcBuild;
}

export type PcBuildBasicInfo = {
  displayName: string;
  description: string;
};
