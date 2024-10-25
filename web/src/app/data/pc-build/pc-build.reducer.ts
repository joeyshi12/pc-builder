import { produce } from 'immer';
import { PcBuild } from 'src/app/transfers/pc_build';
import { setNewPcBuild, updateBasicInfo, updateDraftSuccess, updateCpuIds, updateMemoryIds, updateMotherboardIds, setPcBuilds, updatePowerSupplyIds, updateStorageIds, updateVideoCardIds, clearDraftBuild, loadDraftComponentsSuccess } from './pc-build.actions';
import { ActionReducer, createReducer, on } from '@ngrx/store';
import { PcBuildState } from './pc-build.state';
import { PcComponents } from '../pc-component/pc-component';

const localStorageDraftKey = "draftBuild";

function getInitialState(): PcBuildState {
  return {
    builds: [],
    draftBuild: getInitialBuild(),
    draftBuildComponents: getInitialBuildComponents(),
    isDraftLoading: false,
  };
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

function getInitialBuildComponents(): PcComponents {
  return {
    cpuList: [],
    motherboardList: [],
    memoryList: [],
    storageList: [],
    videoCardList: [],
    powerSupplyList: [],
  };
}

function saveDraft(draft: PcBuild): void {
  localStorage.setItem(localStorageDraftKey, JSON.stringify(draft));
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
  on(updateBasicInfo, (state: PcBuildState, action) => {
    const updatedState: PcBuildState = produce(state, (draft) => {
      draft.draftBuild.displayName = action.displayName;
      draft.draftBuild.description = action.description;
      draft.isDraftLoading = true;
    });
    saveDraft(updatedState.draftBuild);
    return updatedState;
  }),
  on(setNewPcBuild, (state: PcBuildState) => {
    const updatedState: PcBuildState = produce(state, (draft) => {
      draft.draftBuild = createNewBuild();
      draft.draftBuildComponents = getInitialBuildComponents();
    });
    saveDraft(updatedState.draftBuild);
    return updatedState;
  }),
  on(setPcBuilds, (state: PcBuildState, action) => {
    const updatedState: PcBuildState = produce(state, (draft) => {
      draft.builds = action.builds;
      const updatedDraftBuild = action.builds.find(build => build.uuid === state.draftBuild.uuid);
      if (updatedDraftBuild) {
        draft.draftBuild = updatedDraftBuild;
      }
    });
    saveDraft(updatedState.draftBuild);
    return updatedState;
  }),
  on(updateDraftSuccess, (state: PcBuildState, action) => {
    const updatedState: PcBuildState = produce(state, (draft) => {
      draft.draftBuild = action.draftBuild;
      draft.isDraftLoading = false;
    });
    saveDraft(updatedState.draftBuild);
    return updatedState;
  }),
  on(loadDraftComponentsSuccess, (state: PcBuildState, action) => {
    return produce(state, (draft) => {
      draft.draftBuildComponents = action.components;
    });
  }),
  on(clearDraftBuild, (state: PcBuildState) => {
    const updatedState: PcBuildState = produce(state, ((draft: any) => {
      if (state.draftBuild.uuid) {
        draft.builds = state.builds.filter(build => build.uuid !== state.draftBuild.uuid);
      }
      if (draft.builds.length > 0) {
        draft.draftBuild = draft.builds[0];
      } else {
        draft.draftBuild = createNewBuild();
      }
    }).bind(this));
    saveDraft(updatedState.draftBuild);
    return updatedState;
  }),
  on(updateCpuIds, (state: PcBuildState, action) => {
    const updatedState: PcBuildState = produce(state, (draft) => {
      draft.draftBuild.cpuIds = action.ids;
      draft.isDraftLoading = true;
    });
    saveDraft(state.draftBuild);
    return updatedState;
  }),
  on(updateMotherboardIds, (state: PcBuildState, action) => {
    const updatedState: PcBuildState = produce(state, (draft) => {
      draft.draftBuild.motherboardIds = action.ids;
      draft.isDraftLoading = true;
    });
    saveDraft(state.draftBuild);
    return updatedState;
  }),
  on(updateMemoryIds, (state: PcBuildState, action) => {
    const updatedState: PcBuildState = produce(state, (draft) => {
      draft.draftBuild.memoryIds = action.ids;
      draft.isDraftLoading = true;
    });
    saveDraft(state.draftBuild);
    return updatedState;
  }),
  on(updateStorageIds, (state: PcBuildState, action) => {
    const updatedState: PcBuildState = produce(state, (draft) => {
      draft.draftBuild.storageIds = action.ids;
      draft.isDraftLoading = true;
    });
    saveDraft(state.draftBuild);
    return updatedState;
  }),
  on(updateVideoCardIds, (state: PcBuildState, action) => {
    const updatedState: PcBuildState = produce(state, (draft) => {
      draft.draftBuild.videoCardIds = action.ids;
      draft.isDraftLoading = true;
    });
    saveDraft(state.draftBuild);
    return updatedState;
  }),
  on(updatePowerSupplyIds, (state: PcBuildState, action) => {
    const updatedState: PcBuildState = produce(state, (draft) => {
      draft.draftBuild.powerSupplyIds = action.ids;
      draft.isDraftLoading = true;
    });
    saveDraft(state.draftBuild);
    return updatedState;
  })
);
