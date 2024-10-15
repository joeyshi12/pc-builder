import { createAction, props } from '@ngrx/store';
import { ComponentIds, PcBuildBasicInfo } from './pc-build';
import { PcBuild } from 'src/app/transfers/pc_build';

export const updateBasicInfo = createAction(
  "UpdatePcBuildInfo",
  props<PcBuildBasicInfo>()
);

export const clearBuild = createAction("ClearPcBuild");

export const updateBuild = createAction(
  "UpdatePcBuild",
  props<PcBuild>()
);

export const updateCpuIds = createAction(
  "UpdatePcBuildCpuIds",
  props<ComponentIds>()
);

export const updateMotherboardIds = createAction(
  "UpdatePcBuildMotherboardIds",
  props<ComponentIds>()
);

export const updateMemoryIds = createAction(
  "UpdatePcBuildMemoryIds",
  props<ComponentIds>()
);

export const updateStorageIds = createAction(
  "UpdatePcBuildStorageIds",
  props<ComponentIds>()
);

export const updateVideoCardIds = createAction(
  "UpdatePcBuildVideoCardIds",
  props<ComponentIds>()
);

export const updatePowerSupplyIds = createAction(
  "UpdatePcBuildPowerSupplyIds",
  props<ComponentIds>()
);
