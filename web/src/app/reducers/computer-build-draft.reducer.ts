import { createAction, createReducer, on, props } from '@ngrx/store';
import { produce } from 'immer';
import { ComputerBuildDraftDto } from 'src/app/models/pc-builder';

export const stateName = "computerBuildDraft";
export const updateDraftInfo = createAction("updateComputerBuildDraftInfo", props<{ displayName: string, description: string }>());
export const updateDraftComponentIds = createAction("updateComputerBuildDraftComponentIds", props<{ componentType: string, ids: string[] }>());

const emptyState: ComputerBuildDraftDto = {
  displayName: "Example name",
  description: "Example description",
  cpuIds: [],
  motherboardIds: [],
  memoryIds: [],
  storageIds: [],
  videoCardIds: [],
  powerSupplyIds: []
};

function getInitialState(): ComputerBuildDraftDto {
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
