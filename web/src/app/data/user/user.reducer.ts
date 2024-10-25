import { ActionReducer, createReducer, on } from "@ngrx/store";
import { UserState } from "./user.state";
import { clearSessionUserSuccess, setSessionUser } from "./user.actions";
import { produce } from "immer";

export const userStateReducer: ActionReducer<UserState> = createReducer(
  {},
  on(setSessionUser, (state: UserState, payload) => {
    return produce(state, (draft) => {
      if (payload.user?.username) {
        draft.currentUser = payload.user;
      } else {
        draft.currentUser = undefined;
      }
    });
  }),
  on(clearSessionUserSuccess, (state: UserState) => {
    return produce(state, (draft) => {
      draft.currentUser = undefined;
    });
  }),
);
