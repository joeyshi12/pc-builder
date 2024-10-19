import { createAction, props } from '@ngrx/store';
import { UserProfile } from 'src/app/transfers/user';

export const loadSessionUser = createAction("LoadSessionUser");

export const updateSessionUser = createAction(
  "UpdateSessionUser",
  props<{ user: UserProfile }>()
);

export const clearSessionUser = createAction("ClearSessionUser");
