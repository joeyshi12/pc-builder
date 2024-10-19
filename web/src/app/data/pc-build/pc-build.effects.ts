import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PcBuildService } from "./pc-build.service";
import { exhaustMap, filter, map, switchMap } from "rxjs";
import { PcBuild } from "src/app/transfers/pc_build";
import { loadPcBuilds, updateBasicInfo, updateBuild, updateCpuIds, updateMemoryIds, updateMotherboardIds, updatePcBuilds, updatePowerSupplyIds, updateStorageIds, updateVideoCardIds } from "./pc-build.actions";
import { Store } from "@ngrx/store";
import { AppState, pcBuildStateKey, userStateKey } from "../app.state";
import { PcBuildState } from "./pc-build.state";
import { UserState } from "../user/user.state";

@Injectable()
export class PcBuildStateEffects {
  public updateCpuIds$ = createEffect(() => this._actions$.pipe(
    ofType(updateBasicInfo, updateCpuIds, updateMotherboardIds, updateMemoryIds, updateStorageIds, updateVideoCardIds, updatePowerSupplyIds, updateBuild),
    switchMap(() => this._store.select(userStateKey)),
    filter((userState: UserState) => Boolean(userState.currentUser?.username)),
    switchMap(() => this._store.select(pcBuildStateKey)),
    exhaustMap(((buildState: PcBuildState) => {
      if (buildState.draftBuild.uuid) {
        return this._pcBuildService.updatePcBuild(buildState.draftBuild).pipe(
          map((build: PcBuild) => updateBuild({ build }))
        );
      } else {
        return this._pcBuildService.createPcBuild(buildState.draftBuild).pipe(
          switchMap(() => this._pcBuildService.getPcBuilds()),
          map(builds => updatePcBuilds({ builds }))
        );
      }
    }))
  ));

  // TODO
  //public deletePcBuild$ = createEffect(() => this._actions$.pipe(
  //  ofType(deleteBuild)
  //));

  public loadPcBuilds$ = createEffect(() => this._actions$.pipe(
    ofType(loadPcBuilds),
    exhaustMap(() => this._pcBuildService.getPcBuilds().pipe(
      map((builds: PcBuild[]) => updatePcBuilds({ builds }))
    ))
  ));

  constructor(private _actions$: Actions,
              private _store: Store<AppState>,
              private _pcBuildService: PcBuildService) {
  }
}
