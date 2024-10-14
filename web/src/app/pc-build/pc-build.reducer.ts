import { produce } from 'immer';
import { PcBuild } from 'src/app/transfers/pc_build';
import { updateBasicInfo, updateCpuIds, updateMemoryIds, updateMotherboardIds, updatePowerSupplyIds, updateStorageIds, updateVideoCardIds } from './pc-build.actions';
import { ActionReducer, createReducer, on } from '@ngrx/store';
import { ComponentIds, PcBuildBasicInfo, localStorageBuildKey } from './pc-build';

export const stateName = "pcBuildDraft";

const initialState: PcBuild = {
  displayName: "Example name",
  description: "Example description",
  cpuIds: [],
  motherboardIds: [],
  memoryIds: [],
  storageIds: [],
  videoCardIds: [],
  powerSupplyIds: []
};

function getInitialState(): PcBuild {
  const storedValue = localStorage.getItem(localStorageBuildKey);
  if (!storedValue) {
    return initialState;
  }
  try {
    return JSON.parse(storedValue);
  } catch {
    return initialState;
  }
}

export const reducer: ActionReducer<PcBuild> = createReducer(
  getInitialState(),
  on(updateBasicInfo, (state: PcBuild, payload: PcBuildBasicInfo) => {
    return produce(state, (draft) => {
      draft.displayName = payload.displayName;
      draft.description = payload.description;
    });
  }),
  on(updateCpuIds, (state: PcBuild, payload: ComponentIds) => {
    return produce(state, (draft) => {
      draft.cpuIds = payload.ids;
    })
  }),
  on(updateMotherboardIds, (state: PcBuild, payload: ComponentIds) => {
    return produce(state, (draft) => {
      draft.motherboardIds = payload.ids;
    })
  }),
  on(updateMemoryIds, (state: PcBuild, payload: ComponentIds) => {
    return produce(state, (draft) => {
      draft.memoryIds = payload.ids;
    })
  }),
  on(updateStorageIds, (state: PcBuild, payload: ComponentIds) => {
    return produce(state, (draft) => {
      draft.storageIds = payload.ids;
    })
  }),
  on(updateVideoCardIds, (state: PcBuild, payload: ComponentIds) => {
    return produce(state, (draft) => {
      draft.videoCardIds = payload.ids;
    })
  }),
  on(updatePowerSupplyIds, (state: PcBuild, payload: ComponentIds) => {
    return produce(state, (draft) => {
      draft.powerSupplyIds = payload.ids;
    })
  }),
);
