import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CpuComponent } from 'src/app/models/pc-builder';
import { PcBuilderService } from 'src/app/services/pc-builder/pc-builder.service';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent {
  public cpuList$: Observable<CpuComponent[]>;

  constructor(pcBuilderService: PcBuilderService) {
    const cpuIds = pcBuilderService.selectedCpuIds;
    this.cpuList$ = pcBuilderService.getCpuComponents(cpuIds);
  }
}
