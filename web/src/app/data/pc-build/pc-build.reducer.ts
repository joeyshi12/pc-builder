import { produce } from 'immer';
import { PcBuild } from 'src/app/transfers/pc_build';
import { setNewPcBuild, updateBasicInfo, updateBuild, updateCpuIds, updateMemoryIds, updateMotherboardIds, updatePcBuilds, updatePowerSupplyIds, updateStorageIds, updateVideoCardIds } from './pc-build.actions';
import { ActionReducer, createReducer, on } from '@ngrx/store';
import { PcBuildState } from './pc-build.state';

const localStorageDraftKey = "draftBuild";

function getInitialState(): PcBuildState {
  return {
    builds: [],
    draftBuild: getInitialBuild()
  };
}

function saveDraft(draft: PcBuild): void {
  localStorage.setItem(localStorageDraftKey, JSON.stringify(draft));
}

function getInitialBuild(): PcBuild {
  const storedValue = localStorage.getItem(localStorageDraftKey);
  if (!storedValue) {
    return createNewBuild();
  }
  try {
    return JSON.parse(storedValue);
  } catch {
    return createNewBuild();
  }
}

function createNewBuild(): PcBuild {
  return {
    displayName: "PC Build",
    description: "New build",
    cpuIds: [],
    motherboardIds: [],
    memoryIds: [],
    storageIds: [],
    videoCardIds: [],
    powerSupplyIds: []
  };
}

export const pcBuildStateReducer: ActionReducer<PcBuildState> = createReducer(
  getInitialState(),
  on(updateBasicInfo, (state: PcBuildState, payload) => {
    const updatedState: PcBuildState = produce(state, (draft) => {
      draft.draftBuild.displayName = payload.displayName;
      draft.draftBuild.description = payload.description;
    });
    saveDraft(updatedState.draftBuild);
    return updatedState;
  }),
  on(setNewPcBuild, (state: PcBuildState) => {
    const updatedState: PcBuildState = produce(state, (draft) => {
      draft.draftBuild = createNewBuild();
    });
    saveDraft(updatedState.draftBuild);
    return updatedState;
  }),
  on(updatePcBuilds, (state: PcBuildState, payload) => {
    return produce(state, (draft) => {
      draft.builds = payload.builds;
      const updatedBuild = draft.builds.find((build) => build.uuid === draft.draftBuild.uuid);
      if (updatedBuild) {
        saveDraft(updatedBuild);
        draft.draftBuild = updatedBuild;
      }
    });
  }),
  on(updateBuild, (state: PcBuildState, payload) => {
    const updatedState: PcBuildState = produce(state, (draft) => {
      draft.draftBuild = payload.build;
    });
    saveDraft(updatedState.draftBuild);
    return updatedState;
  }),
  on(updateCpuIds, (state: PcBuildState, payload) => {
    const updatedState: PcBuildState = produce(state, (draft) => {
      draft.draftBuild.cpuIds = payload.ids;
    });
    saveDraft(state.draftBuild);
    return updatedState;
  }),
  on(updateMotherboardIds, (state: PcBuildState, payload) => {
    const updatedState: PcBuildState = produce(state, (draft) => {
      draft.draftBuild.motherboardIds = payload.ids;
    });
    saveDraft(state.draftBuild);
    return updatedState;
  }),
  on(updateMemoryIds, (state: PcBuildState, payload) => {
    const updatedState: PcBuildState = produce(state, (draft) => {
      draft.draftBuild.memoryIds = payload.ids;
    });
    saveDraft(state.draftBuild);
    return updatedState;
  }),
  on(updateStorageIds, (state: PcBuildState, payload) => {
    const updatedState: PcBuildState = produce(state, (draft) => {
      draft.draftBuild.storageIds = payload.ids;
    });
    saveDraft(state.draftBuild);
    return updatedState;
  }),
  on(updateVideoCardIds, (state: PcBuildState, payload) => {
    const updatedState: PcBuildState = produce(state, (draft) => {
      draft.draftBuild.videoCardIds = payload.ids;
    });
    saveDraft(state.draftBuild);
    return updatedState;
  }),
  on(updatePowerSupplyIds, (state: PcBuildState, payload) => {
    const updatedState: PcBuildState = produce(state, (draft) => {
      draft.draftBuild.powerSupplyIds = payload.ids;
    });
    saveDraft(state.draftBuild);
    return updatedState;
  })
);
