import { createAction, createReducer, on, props } from '@ngrx/store';
import { ComputerBuildDraft } from 'src/app/models/pc-builder';


export const updateDraftInfo = createAction("updateComputerBuildDraftInfo", props<{ displayName: string, description: string }>());
export const updateDraftComponentIds = createAction("updateComputerBuildDraftComponentIds", props<{ componentType: string, ids: string[] }>());

const emptyState: ComputerBuildDraft = {
  displayName: "Example name",
  description: "Example description",
  cpuIds: [],
  motherboardIds: [],
  memoryIds: [],
  storageIds: [],
  videoCardIds: [],
  powerSupplyIds: []
};

function getInitialState(): ComputerBuildDraft {
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

export const buildListReducer = createReducer(
  getInitialState(),
  on(updateDraftInfo, (state: ComputerBuildDraft, { displayName, description }) => {
    const newState = {
      ...state,
      displayName, description
    };
    localStorage.setItem("draft", JSON.stringify(newState));
    return newState;
  }),
  on(updateDraftComponentIds, (state: ComputerBuildDraft, { componentType, ids }) => {
    let newState: ComputerBuildDraft;
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
