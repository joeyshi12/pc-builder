import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PcBuildService } from "./pc-build.service";
import { filter, map, switchMap, take } from "rxjs";
import { PcBuild } from "src/app/transfers/pc_build";
import * as PcBuildActions from "./pc-build.actions";
import { Store } from "@ngrx/store";
import { AppState, pcBuildStateKey } from "../app.state";
import { PcBuildState } from "./pc-build.state";
import { isLoggedInSelector } from "../user/user.selectors";
import { draftSelector } from "./pc-build.selectors";
import { PcComponentService } from "../pc-component/pc-component.service";
import { PcComponents } from "../pc-component/pc-component";

@Injectable()
export class PcBuildStateEffects {
  public updateDraftBuild$ = createEffect(() => this._actions$.pipe(
    ofType(
      PcBuildActions.updateBasicInfo,
      PcBuildActions.updateCpuIds,
      PcBuildActions.updateMotherboardIds,
      PcBuildActions.updateMemoryIds,
      PcBuildActions.updateStorageIds,
      PcBuildActions.updateVideoCardIds,
      PcBuildActions.updatePowerSupplyIds
    ),
    switchMap(() => this._store.select(isLoggedInSelector).pipe(take(1))),
    filter((isLoggedIn) => isLoggedIn),
    switchMap(() => this._store.select(draftSelector).pipe(take(1))),
    switchMap((draftBuild: PcBuild) =>
      draftBuild.uuid
        ? this._pcBuildService.updatePcBuild(draftBuild)
        : this._pcBuildService.createPcBuild(draftBuild)
    ),
    map((build: PcBuild) => PcBuildActions.updateDraftSuccess({ draftBuild: build }))
  ));

  public loadPcBuilds$ = createEffect(() => this._actions$.pipe(
    ofType(PcBuildActions.loadPcBuilds),
    switchMap(() => this._pcBuildService.getPcBuilds()),
    map((builds: PcBuild[]) => PcBuildActions.setPcBuilds({ builds }))
  ));

  public loadDraftComponents$ = createEffect(() => this._actions$.pipe(
    ofType(
      PcBuildActions.clearDraftBuild,
      PcBuildActions.setPcBuilds,
      PcBuildActions.updateDraftSuccess
    ),
    switchMap(() => this._store.select(draftSelector).pipe(take(1))),
    switchMap((draftBuild: PcBuild) => this._pcComponentsService.getPcComponents(draftBuild)),
    map((pcComponents: PcComponents) => PcBuildActions.loadDraftComponentsSuccess({ components: pcComponents }))
  ));

  public deleteDraftBuild$ = createEffect(() => this._actions$.pipe(
    ofType(PcBuildActions.deleteDraftBuild),
    switchMap(() => this._store.select(pcBuildStateKey).pipe(take(1))),
    filter((buildState: PcBuildState) => Boolean(buildState.draftBuild.uuid)),
    switchMap(buildState => this._pcBuildService.deletePcBuild(buildState.draftBuild.uuid!)),
    map(() => PcBuildActions.clearDraftBuild())
  ));

  constructor(private _actions$: Actions,
              private _store: Store<AppState>,
              private _pcBuildService: PcBuildService,
              private _pcComponentsService: PcComponentService) {
  }
}