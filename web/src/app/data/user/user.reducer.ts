import { ActionReducer, createReducer, on } from "@ngrx/store";
import { UserState } from "./user.state";
import { clearSessionUser, setSessionUser } from "./user.actions";
import { produce } from "immer";

export const userStateReducer: ActionReducer<UserState> = createReducer(
  {},
  on(clearSessionUser, (state: UserState) => {
    return produce(state, (draft) => {
      draft.currentUser = undefined;
    });
  }),
  on(setSessionUser, (state: UserState, payload) => {
    return produce(state, (draft) => {
      if (payload.user?.username) {
        draft.currentUser = payload.user;
      } else {
        draft.currentUser = undefined;
      }
    });
  })
);
