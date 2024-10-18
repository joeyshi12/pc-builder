import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PcBuildService } from "./pc-build.service";
import { exhaustMap, map } from "rxjs";
import { PcBuild } from "src/app/transfers/pc_build";

@Injectable()
export class PcBuildEffects {
  public loadPcBuilds$ = createEffect(() => this._actions$.pipe(
    ofType("LoadPcBuilds"),
    exhaustMap(() => this._pcBuildService.getPcBuilds().pipe(
      map((pcBuilds: PcBuild[]) => ({type: "UpdatePcBuilds", payload: pcBuilds}))
    ))
  ));

  constructor(private _actions$: Actions,
              private _pcBuildService: PcBuildService) {
  }
}
