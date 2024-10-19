import { createAction, props } from '@ngrx/store';
import { PcBuildBasicInfo } from './pc-build.state';
import { PcBuild } from 'src/app/transfers/pc_build';

export const loadPcBuilds = createAction("LoadPcBuilds")

export const updateBasicInfo = createAction(
  "UpdatePcBuildInfo",
  props<PcBuildBasicInfo>()
);

export const setNewPcBuild = createAction("SetNewPcBuild");

export const updatePcBuilds = createAction(
  "UpdatePcBuilds",
  props<{ builds: PcBuild[] }>()
);

export const updateBuild = createAction(
  "UpdatePcBuild",
  props<{ build: PcBuild }>()
);

export const updateCpuIds = createAction(
  "UpdatePcBuildCpuIds",
  props<{ ids: string[] }>()
);

export const updateMotherboardIds = createAction(
  "UpdatePcBuildMotherboardIds",
  props<{ ids: string[] }>()
);

export const updateMemoryIds = createAction(
  "UpdatePcBuildMemoryIds",
  props<{ ids: string[] }>()
);

export const updateStorageIds = createAction(
  "UpdatePcBuildStorageIds",
  props<{ ids: string[] }>()
);

export const updateVideoCardIds = createAction(
  "UpdatePcBuildVideoCardIds",
  props<{ ids: string[] }>()
);

export const updatePowerSupplyIds = createAction(
  "UpdatePcBuildPowerSupplyIds",
  props<{ ids: string[] }>()
);
