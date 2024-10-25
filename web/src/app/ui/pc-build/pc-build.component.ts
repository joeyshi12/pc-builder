import { Component } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { catchError, map, Observable, switchMap, tap } from "rxjs";
import { PcBuildService } from "src/app/data/pc-build/pc-build.service";
import { PcComponentService } from "src/app/data/pc-component/pc-component.service";
import { PcBuild } from "src/app/transfers/pc_build";
import { ComponentListModel, toComponentListModels } from "../pc-components.util";

type InternalState = {
  build: PcBuild;
  listModels: ComponentListModel[];
};

@Component({
  selector: 'app-pc-build',
  templateUrl: './pc-build.component.html',
  styleUrls: ['./pc-build.component.css'],
})
export class PcBuildComponent {
  public readonly state$: Observable<InternalState>;

  constructor(route: ActivatedRoute,
              router: Router,
              pcBuildService: PcBuildService,
              pcComponentsService: PcComponentService) {
    this.state$ = route.params.pipe(
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
      switchMap(builds => {
        const build = builds[0];
        return pcComponentsService.getPcComponents(builds[0]).pipe(
          map(components => {
            const listModels = toComponentListModels(components)
              .filter(model => model.items.length > 0);
            return { build, listModels }
          })
        );
      })
    );
  }
}
