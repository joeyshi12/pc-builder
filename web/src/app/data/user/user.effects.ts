import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { filter, map, Observable, switchMap, take } from "rxjs";
import { UserService } from "./user.service";
import { UserProfile } from "src/app/transfers/user";
import { Action, Store } from "@ngrx/store";
import * as UserActions from "./user.actions";
import { AppState } from "../app.state";
import { userSelector } from "./user.selectors";

@Injectable()
export class UserStateEffects {
  public loadSessionUser$: Observable<Action> = createEffect(() => this._actions$.pipe(
    ofType(UserActions.loadSessionUser),
    switchMap(() => this._userService.getSessionUser()),
    map((user: UserProfile) => UserActions.setSessionUser({ user }))
  ));

  public updateSessionUser$: Observable<Action> = createEffect(() => this._actions$.pipe(
    ofType(UserActions.updateSessionUser),
    switchMap(() => this._store.select(userSelector).pipe(take(1))),
    filter((user: UserProfile | undefined) => Boolean(user?.username)),
    switchMap((user: UserProfile | undefined) => this._userService.updateUserProfile(user!)),
    map((user: UserProfile | undefined) => UserActions.setSessionUser({ user }))
  ));

  public clearSessionUser$: Observable<Action> = createEffect(() => this._actions$.pipe(
    ofType(UserActions.clearSessionUser),
    switchMap(() => this._userService.clearSessionUser()),
    map(() => UserActions.clearSessionUserSuccess())
  ));

  constructor(private _actions$: Actions,
              private _store: Store<AppState>,
              private _userService: UserService) {
  }
}
