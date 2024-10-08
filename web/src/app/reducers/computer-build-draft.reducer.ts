import { produce } from 'immer';
import { createAction, createReducer, on, props } from '@ngrx/store';
import { PcBuildDraft } from 'src/app/transfers/pc_build';

export const stateName = "computerBuildDraft";
export const updateDraftInfo = createAction("updatePcBuildDraftInfo", props<{ displayName: string, description: string }>());
export const updateDraftComponentIds = createAction("updatePcBuildDraftComponentIds", props<{ componentType: string, ids: string[] }>());

const emptyState: PcBuildDraft = {
  displayName: "Example name",
  description: "Example description",
  cpuIds: [],
  motherboardIds: [],
  memoryIds: [],
  storageIds: [],
  videoCardIds: [],
  powerSupplyIds: []
};

function getInitialState(): PcBuildDraft {
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
    localStorage.setItem("draft", JSON.stringify(newState));
    return newState;
  })
)

function updateComponentIds(state: PcBuildDraft, componentType: string, ids: string[]) {
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
