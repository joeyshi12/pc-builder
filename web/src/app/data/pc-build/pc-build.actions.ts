import { createAction, props } from '@ngrx/store';
import { PcBuildBasicInfo } from './pc-build.state';
import { PcBuild } from 'src/app/transfers/pc_build';
import { PcComponents } from '../pc-component/pc-component';

export const loadPcBuilds = createAction("LoadPcBuilds")

export const setPcBuilds = createAction(
  "SetPcBuilds",
  props<{ builds: PcBuild[] }>()
);

export const updateBasicInfo = createAction(
  "UpdatePcBuildInfo",
  props<PcBuildBasicInfo>()
);

export const setNewPcBuild = createAction("SetNewPcBuild");

export const updateDraftSuccess = createAction(
  "UpdateDraftSuccess",
  props<{ draftBuild: PcBuild }>()
);

export const loadDraftComponentsSuccess = createAction(
  "LoadDraftPcBuildComponentsSuccess",
  props<{ components: PcComponents }>()
);

export const deleteDraftBuild = createAction("DeleteDraftPcBuild");

export const clearDraftBuild = createAction("ClearDraftPcBuild");

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
