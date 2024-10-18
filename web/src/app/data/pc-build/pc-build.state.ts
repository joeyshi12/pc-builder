import { PcBuild } from "src/app/transfers/pc_build";

export const localStoragePcDraftKey: string = "DraftPcBuild";

export type PcBuildState = {
  builds: PcBuild[];
  currentBuild: PcBuild;
}

export type PcBuildBasicInfo = {
  displayName: string;
  description: string;
};

export type PcBuildList = {
  builds: PcBuild[];
}

export type ComponentIdList = {
  ids: string[];
};
