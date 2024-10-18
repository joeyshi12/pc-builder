import { createAction, props } from '@ngrx/store';
import { ComponentIdList, PcBuildBasicInfo, PcBuildList } from './pc-build';
import { PcBuild } from 'src/app/transfers/pc_build';

export const updateBasicInfo = createAction(
  "UpdatePcBuildInfo",
  props<PcBuildBasicInfo>()
);

export const setNewPcBuild = createAction("ClearPcBuild");

export const updatePcBuilds = createAction(
  "UpdatePcBuilds",
  props<PcBuildList>()
);

export const updateBuild = createAction(
  "UpdatePcBuild",
  props<PcBuild>()
);

export const updateCpuIds = createAction(
  "UpdatePcBuildCpuIds",
  props<ComponentIdList>()
);

export const updateMotherboardIds = createAction(
  "UpdatePcBuildMotherboardIds",
  props<ComponentIdList>()
);

export const updateMemoryIds = createAction(
  "UpdatePcBuildMemoryIds",
  props<ComponentIdList>()
);

export const updateStorageIds = createAction(
  "UpdatePcBuildStorageIds",
  props<ComponentIdList>()
);

export const updateVideoCardIds = createAction(
  "UpdatePcBuildVideoCardIds",
  props<ComponentIdList>()
);

export const updatePowerSupplyIds = createAction(
  "UpdatePcBuildPowerSupplyIds",
  props<ComponentIdList>()
);
