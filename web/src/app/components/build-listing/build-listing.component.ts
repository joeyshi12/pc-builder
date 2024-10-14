import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PcBuildService } from 'src/app/pc-build/pc-build.service';
import { PcBuild } from 'src/app/transfers/pc_build';

@Component({
  selector: 'app-build-listing',
  templateUrl: './build-listing.component.html',
  styleUrls: ['./build-listing.component.css']
})
export class BuildListingComponent {
  public readonly builds$: Observable<PcBuild[]>;

  constructor(pcBuildService: PcBuildService) {
    this.builds$ = pcBuildService.getPcBuilds();
  }
}
