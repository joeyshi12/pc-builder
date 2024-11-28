import { Component } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { catchError, combineLatest, map, Observable, switchMap, take, tap } from "rxjs";
import { PcBuildService } from "src/app/data/pc-build/pc-build.service";
import { PcComponentService } from "src/app/data/pc-component/pc-component.service";
import { PcBuild } from "src/app/transfers/pc_build";
import { ComponentListModel, toComponentListModels } from "../pc-components.util";
import { Comment } from "src/app/transfers/comment";
import { AppState } from "src/app/data/app.state";
import { Store } from "@ngrx/store";
import { isLoggedInSelector } from "src/app/data/user/user.selectors";

type InternalState = {
  build: PcBuild;
  listModels: ComponentListModel[];
  comments: Comment[];
};

@Component({
  selector: 'app-pc-build',
  templateUrl: './pc-build.component.html',
  styleUrls: ['./pc-build.component.css'],
})
export class PcBuildComponent {
  public readonly state$: Observable<InternalState>;
  public readonly isLoggedIn$: Observable<boolean>;

  constructor(store: Store<AppState>,
              route: ActivatedRoute,
              router: Router,
              private _pcBuildService: PcBuildService,
              pcComponentsService: PcComponentService) {
    this.isLoggedIn$ = store.select(isLoggedInSelector);
    this.state$ = route.params.pipe(
      switchMap((params: Params) =>
        _pcBuildService.getPcBuilds([params["id"]]).pipe(
          catchError(() => [])
        )
      ),
      tap(builds => {
        if (builds.length === 0) {
          router.navigate(["/builds"]);
        }
      }),
      switchMap(builds => {
        const build = builds[0];
        return combineLatest([
          pcComponentsService.getPcComponents(build).pipe(
            map(components => toComponentListModels(components).filter(model => model.items.length > 0))
          ),
          _pcBuildService.getBuildComments(build.uuid!)
        ]).pipe(
          map(([listModels, comments]) => {
            return { build, listModels, comments };
          })
        );
      })
    );
  }

  public submitComment(commentContent: string, buildId: string): void {
    const comment: Comment = {
      content: commentContent,
      buildId: buildId
    };
    this._pcBuildService.createBuildComment(comment).subscribe((response) => {
      console.log(response);
    });
  }
}
