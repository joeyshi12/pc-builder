import { createSelector } from "@ngrx/store";
import { AppState, userStateKey } from "../app.state";
import { UserState } from "./user.state";

export const userStateSelector = (state: AppState) => state[userStateKey];

export const userSelector = createSelector(
  userStateSelector,
  (state: UserState) => state.currentUser
);

export const isLoggedInSelector = createSelector(
  userStateSelector,
  (state: UserState) => Boolean(state.currentUser)
);
