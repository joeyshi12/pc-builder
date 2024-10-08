import { createAction, createReducer, on, props } from '@ngrx/store';
<<<<<<< HEAD:web/src/app/pages/component-listing/build-list.reducer.ts
import { PcBuildDraft } from 'src/app/transfers/pc_build';


export const updateDraftInfo = createAction("updatePcBuildDraftInfo", props<{ displayName: string, description: string }>());
export const updateDraftComponentIds = createAction("updatePcBuildDraftComponentIds", props<{ componentType: string, ids: string[] }>());

const emptyState: PcBuildDraft = {
=======
import { produce } from 'immer';
import { ComputerBuildDraftDto } from 'src/app/models/pc-builder';

export const stateName = "computerBuildDraft";
export const updateDraftInfo = createAction("updateComputerBuildDraftInfo", props<{ displayName: string, description: string }>());
export const updateDraftComponentIds = createAction("updateComputerBuildDraftComponentIds", props<{ componentType: string, ids: string[] }>());

const emptyState: ComputerBuildDraftDto = {
>>>>>>> origin/main:web/src/app/reducers/computer-build-draft.reducer.ts
  displayName: "Example name",
  description: "Example description",
  cpuIds: [],
  motherboardIds: [],
  memoryIds: [],
  storageIds: [],
  videoCardIds: [],
  powerSupplyIds: []
};

<<<<<<< HEAD:web/src/app/pages/component-listing/build-list.reducer.ts
function getInitialState(): PcBuildDraft {
=======
function getInitialState(): ComputerBuildDraftDto {
>>>>>>> origin/main:web/src/app/reducers/computer-build-draft.reducer.ts
  const storedValue = localStorage.getItem("draft");
  if (!storedValue) {
    return emptyState;
  }
  try {
    return JSON.parse(storedValue);
  } catch {
    return emptyState;
  }
}

export const reducer = createReducer(
  getInitialState(),
<<<<<<< HEAD:web/src/app/pages/component-listing/build-list.reducer.ts
  on(updateDraftInfo, (state: PcBuildDraft, { displayName, description }) => {
    const newState = {
      ...state,
      displayName, description
    };
    localStorage.setItem("draft", JSON.stringify(newState));
    return newState;
  }),
  on(updateDraftComponentIds, (state: PcBuildDraft, { componentType, ids }) => {
    let newState: PcBuildDraft;
    switch (componentType) {
      case "cpu":
        newState = {
          ...state,
          cpuIds: ids
        };
        break;
      case "motherboard":
        newState = {
          ...state,
          motherboardIds: ids
        };
        break;
      case "memory":
        newState = {
          ...state,
          memoryIds: ids
        };
        break;
      case "storage":
        newState = {
          ...state,
          storageIds: ids
        };
        break;
      case "videoCard":
        newState = {
          ...state,
          videoCardIds: ids
        };
        break;
      case "powerSupply":
        newState = {
          ...state,
          powerSupplyIds: ids
        };
        break;
      default:
        throw Error(`Invalid componentType ${componentType}`)
    }
=======
  on(updateDraftInfo, (state: ComputerBuildDraftDto, { displayName, description }) => {
    const newState = produce(state, (draft) => {
      draft.displayName = displayName;
      draft.description = description;
    });
    localStorage.setItem("draft", JSON.stringify(newState));
    return newState;
  }),
  on(updateDraftComponentIds, (state: ComputerBuildDraftDto, { componentType, ids }) => {
    const newState = updateComponentIds(state, componentType, ids);
>>>>>>> origin/main:web/src/app/reducers/computer-build-draft.reducer.ts
    localStorage.setItem("draft", JSON.stringify(newState));
    return newState;
  })
)

function updateComponentIds(state: ComputerBuildDraftDto, componentType: string, ids: string[]) {
  return produce(state, (draft) => {
    switch (componentType) {
      case "cpu":
        draft.cpuIds = ids;
        break;
      case "motherboard":
        draft.motherboardIds = ids;
        break;
      case "memory":
        draft.memoryIds = ids;
        break;
      case "storage":
        draft.storageIds = ids;
        break;
      case "videoCard":
        draft.videoCardIds = ids;
        break;
      case "powerSupply":
        draft.powerSupplyIds = ids;
        break;
      default:
        throw Error(`Invalid componentType ${componentType}`)
    }
  });
}
