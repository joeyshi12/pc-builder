import { produce } from 'immer';
import { PcBuild } from 'src/app/transfers/pc_build';
import { clearBuild, updateBasicInfo, updateBuild, updateCpuIds, updateMemoryIds, updateMotherboardIds, updatePowerSupplyIds, updateStorageIds, updateVideoCardIds } from './pc-build.actions';
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

function saveDraft(draft: PcBuild): PcBuild {
  localStorage.setItem(localStorageBuildKey, JSON.stringify(draft));
  return draft;
}

export const reducer: ActionReducer<PcBuild> = createReducer(
  getInitialState(),
  on(updateBasicInfo, (state: PcBuild, payload: PcBuildBasicInfo) => {
    return saveDraft(produce(state, (draft) => {
      draft.displayName = payload.displayName;
      draft.description = payload.description;
    }));
  }),
  on(clearBuild, () => {
    return saveDraft(initialState);
  }),
  on(updateBuild, (state: PcBuild, payload: PcBuild) => {
    return saveDraft(payload);
  }),
  on(updateCpuIds, (state: PcBuild, payload: ComponentIds) => {
    return saveDraft(produce(state, (draft) => {
      draft.cpuIds = payload.ids;
    }));
  }),
  on(updateMotherboardIds, (state: PcBuild, payload: ComponentIds) => {
    return saveDraft(produce(state, (draft) => {
      draft.motherboardIds = payload.ids;
    }));
  }),
  on(updateMemoryIds, (state: PcBuild, payload: ComponentIds) => {
    return saveDraft(produce(state, (draft) => {
      draft.memoryIds = payload.ids;
    }));
  }),
  on(updateStorageIds, (state: PcBuild, payload: ComponentIds) => {
    return saveDraft(produce(state, (draft) => {
      draft.storageIds = payload.ids;
    }));
  }),
  on(updateVideoCardIds, (state: PcBuild, payload: ComponentIds) => {
    return saveDraft(produce(state, (draft) => {
      draft.videoCardIds = payload.ids;
    }));
  }),
  on(updatePowerSupplyIds, (state: PcBuild, payload: ComponentIds) => {
    return saveDraft(produce(state, (draft) => {
      draft.powerSupplyIds = payload.ids;
    }));
  }),
);
