import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { BehaviorSubject, catchError, combineLatest, filter, map, Observable, Subscription, switchMap, tap } from "rxjs";
import { PcBuildService } from "src/app/data/pc-build/pc-build.service";
import { PcComponentService } from "src/app/data/pc-component/pc-component.service";
import { PcBuild } from "src/app/transfers/pc_build";
import { ComponentListModel, toComponentListModels } from "../pc-components.util";
import { Comment } from "src/app/transfers/comment";
import { AppState } from "src/app/data/app.state";
import { Store } from "@ngrx/store";
import { userSelector } from "src/app/data/user/user.selectors";
import { UserProfile } from "src/app/transfers/user";

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
export class PcBuildComponent implements OnDestroy {
  public readonly state$: Observable<InternalState>;

  private _user?: UserProfile;
  private readonly _comments$: BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>([]);
  private readonly _currentTimeMillis: number = new Date().getTime();
  private readonly _userSubscription: Subscription;

  constructor(store: Store<AppState>,
              route: ActivatedRoute,
              router: Router,
              private _pcBuildService: PcBuildService,
              pcComponentsService: PcComponentService) {
    this._userSubscription = store.select(userSelector).subscribe(user => {
      this._user = user;
    });
    this.state$ = route.params.pipe(
      switchMap((params: Params) => _pcBuildService.getPcBuilds([params["id"]]).pipe(catchError(() => []))),
      tap(builds => {
        if (builds.length === 0) {
          router.navigate(["/builds"]);
        }
      }),
      filter(builds => builds.length > 0),
      switchMap(builds => {
        const build = builds[0];
        const listModels$ = pcComponentsService.getPcComponents(build).pipe(
          map(components => toComponentListModels(components).filter(model => model.items.length > 0))
        );
        this._pcBuildService.getBuildComments(build.uuid!).subscribe(comments => {
          this._comments$.next(comments);
        });
        return combineLatest([listModels$, this._comments$]).pipe(
          map(([listModels, comments]) => {
            return { build, listModels, comments };
          })
        );
      })
    );
  }

  public ngOnDestroy(): void {
    this._userSubscription.unsubscribe();
  }

  public get isLoggedIn(): boolean {
    return Boolean(this._user);
  }

  public isEditable(comment: Comment): boolean {
    return this.isLoggedIn && comment.username === this._user?.username;
  }

  public submitComment(commentContent: string, buildId: string): void {
    const comment: Comment = {
      content: commentContent,
      buildId: buildId
    };
    this._pcBuildService.createBuildComment(comment).subscribe((comment) => {
      this._comments$.next([comment, ...this._comments$.value]);
    });
  }

  public formatLastUpdated(comment: Comment): string | undefined {
    if (!comment.lastUpdateDate) {
      return undefined;
    }
    const deltaTimeSeconds = Math.max(0, this._currentTimeMillis - comment.lastUpdateDate!) / 1000;
    if (deltaTimeSeconds < 60) {
      return `${Math.round(deltaTimeSeconds)} seconds ago`;
    }
    const deltaTimeMinutes = deltaTimeSeconds / 60;
    if (deltaTimeMinutes < 60) {
      return `${Math.round(deltaTimeMinutes)} minutes ago`;
    }
    const deltaTimeHours = deltaTimeMinutes / 60;
    if (deltaTimeHours < 60) {
      return `${Math.round(deltaTimeHours)} hours ago`;
    }
    const deltaTimeDays = deltaTimeHours / 24;
    if (deltaTimeDays < 7) {
      return `${Math.round(deltaTimeDays)} days ago`;
    }
    const deltaTimeWeeks = deltaTimeDays / 7;
    if (deltaTimeDays < 30) {
      return `${Math.round(deltaTimeWeeks)} weeks ago`;
    }
    const deltaTimeMonths = deltaTimeDays / 30;
    if (deltaTimeDays < 365) {
      return `${Math.round(deltaTimeMonths)} months ago`;
    }
    const deltaTimeYears = deltaTimeDays / 365;
    return `${Math.round(deltaTimeYears)} years ago`;
  }
}
