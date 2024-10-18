import { produce } from 'immer';
import { PcBuild } from 'src/app/transfers/pc_build';
import { setNewPcBuild as setNewPcBuild, updateBasicInfo, updateBuild, updateCpuIds, updateMemoryIds, updateMotherboardIds, updatePcBuilds, updatePowerSupplyIds, updateStorageIds, updateVideoCardIds } from './pc-build.actions';
import { ActionReducer, createReducer, on } from '@ngrx/store';
import { PcBuildState, localStoragePcDraftKey } from './pc-build.state';

const newBuild: PcBuild = {
  displayName: "PC Build",
  description: "New build",
  cpuIds: [],
  motherboardIds: [],
  memoryIds: [],
  storageIds: [],
  videoCardIds: [],
  powerSupplyIds: []
};

function getInitialState(): PcBuildState {
  return {
    builds: [],
    currentBuild: getInitialBuild()
  };
}

function getInitialBuild(): PcBuild {
  const storedValue = localStorage.getItem(localStoragePcDraftKey);
  if (!storedValue) {
    return newBuild;
  }
  try {
    return JSON.parse(storedValue);
  } catch {
    return newBuild;
  }
}

function saveDraft(draft: PcBuild): void {
  localStorage.setItem(localStoragePcDraftKey, JSON.stringify(draft));
}

export const pcBuildStateReducer: ActionReducer<PcBuildState> = createReducer(
  getInitialState(),
  on(updateBasicInfo, (state: PcBuildState, payload) => {
    const updatedState: PcBuildState = produce(state, (draft) => {
      draft.currentBuild.displayName = payload.displayName;
      draft.currentBuild.description = payload.description;
    });
    saveDraft(updatedState.currentBuild);
    return updatedState;
  }),
  on(setNewPcBuild, (state: PcBuildState) => {
    const updatedState: PcBuildState = produce(state, (draft) => {
      draft.currentBuild = newBuild;
    });
    saveDraft(updatedState.currentBuild);
    return updatedState;
  }),
  on(updatePcBuilds, (state: PcBuildState, payload) => {
    return produce(state, (draft) => {
      draft.builds = payload.builds;
      const updatedBuild = draft.builds.find((build) => build.uuid === draft.currentBuild.uuid);
      if (updatedBuild) {
        draft.currentBuild = updatedBuild;
      }
    });
  }),
  on(updateBuild, (state: PcBuildState, payload) => {
    const updatedState: PcBuildState = produce(state, (draft) => {
      draft.currentBuild = {
        uuid: payload.uuid,
        displayName: payload.displayName,
        description: payload.description,
        creationDate: payload.creationDate,
        lastUpdateDate: payload.lastUpdateDate,
        cpuIds: payload.cpuIds,
        motherboardIds: payload.motherboardIds,
        memoryIds: payload.memoryIds,
        storageIds: payload.storageIds,
        videoCardIds: payload.videoCardIds,
        powerSupplyIds: payload.powerSupplyIds
      };
    });
    saveDraft(updatedState.currentBuild);
    return updatedState;
  }),
  on(updateCpuIds, (state: PcBuildState, payload) => {
    const updatedState: PcBuildState = produce(state, (draft) => {
      draft.currentBuild.cpuIds = payload.ids;
    });
    saveDraft(state.currentBuild);
    return updatedState;
  }),
  on(updateMotherboardIds, (state: PcBuildState, payload) => {
    const updatedState: PcBuildState = produce(state, (draft) => {
      draft.currentBuild.motherboardIds = payload.ids;
    });
    saveDraft(state.currentBuild);
    return updatedState;
  }),
  on(updateMemoryIds, (state: PcBuildState, payload) => {
    const updatedState: PcBuildState = produce(state, (draft) => {
      draft.currentBuild.memoryIds = payload.ids;
    });
    saveDraft(state.currentBuild);
    return updatedState;
  }),
  on(updateStorageIds, (state: PcBuildState, payload) => {
    const updatedState: PcBuildState = produce(state, (draft) => {
      draft.currentBuild.storageIds = payload.ids;
    });
    saveDraft(state.currentBuild);
    return updatedState;
  }),
  on(updateVideoCardIds, (state: PcBuildState, payload) => {
    const updatedState: PcBuildState = produce(state, (draft) => {
      draft.currentBuild.videoCardIds = payload.ids;
    });
    saveDraft(state.currentBuild);
    return updatedState;
  }),
  on(updatePowerSupplyIds, (state: PcBuildState, payload) => {
    const updatedState: PcBuildState = produce(state, (draft) => {
      draft.currentBuild.powerSupplyIds = payload.ids;
    });
    saveDraft(state.currentBuild);
    return updatedState;
  })
);
