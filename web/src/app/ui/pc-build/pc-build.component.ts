import { Component } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { catchError, map, Observable, switchMap, tap } from "rxjs";
import { PcBuildService } from "src/app/data/pc-build/pc-build.service";
import { PcBuild } from "src/app/transfers/pc_build";

@Component({
  selector: 'app-pc-build',
  templateUrl: './pc-build.component.html',
  styleUrls: ['./pc-build.component.css'],
})
export class PcBuildComponent {
  public readonly build$: Observable<PcBuild>;

  constructor(route: ActivatedRoute,
              router: Router,
              pcBuildService: PcBuildService) {
    this.build$ = route.params.pipe(
      switchMap((params: Params) =>
        pcBuildService.getPcBuilds([params["id"]]).pipe(
          catchError(() => [])
        )
      ),
      tap(builds => {
        if (builds.length === 0) {
          router.navigate(["/builds"]);
        }
      }),
      map(builds => builds[0])
    );
  }
}
