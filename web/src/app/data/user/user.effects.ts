import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, Observable } from "rxjs";
import { UserService } from "./user.service";
import { loadSessionUser, updateSessionUser } from "./user.actions";
import { UserProfile } from "src/app/transfers/user";
import { Action } from "@ngrx/store";

@Injectable()
export class UserStateEffects {
  public loadSessionUser$: Observable<Action> = createEffect(() => this._actions$.pipe(
    ofType(loadSessionUser),
    exhaustMap(() => this._userService.getSessionUser().pipe(
      map((user: UserProfile) => updateSessionUser({ user }))
    ))
  ));

  constructor(private _actions$: Actions,
              private _userService: UserService) {
  }
}
