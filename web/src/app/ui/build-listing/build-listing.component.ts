import { Component } from '@angular/core';
import { AgGridEvent, ColDef, GridOptions, ValueGetterParams } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { PcBuildService } from 'src/app/data/pc-build/pc-build.service';
import { PcBuild } from 'src/app/transfers/pc_build';

@Component({
  selector: 'app-build-listing',
  templateUrl: './build-listing.component.html',
  styleUrls: ['./build-listing.component.css']
})
export class BuildListingComponent {
  public readonly gridOptions: GridOptions = {
    defaultColDef: {
      sortable: true,
      filter: true,
    }
  };
  public searchText: string = "";
  public columnDefs: ColDef[];
  public readonly builds$: Observable<PcBuild[]>;
  private readonly _dateTimeFormat: Intl.DateTimeFormat = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  });

  constructor(pcBuildService: PcBuildService) {
    this.columnDefs = [
      {field: "displayName"},
      {field: "description"},
      {headerName: "Builder", field: "username"},
      {
        headerName: "Creation Date",
        valueGetter: (params: ValueGetterParams<PcBuild>) => {
          const creationDate = params.data?.creationDate;
          return creationDate ? this._formatDate(Number(creationDate)) : undefined;
        }
      },
      {
        headerName: "Last Update Date",
        valueGetter: (params: ValueGetterParams<PcBuild>) => {
          const lastUpdateDate = params.data?.lastUpdateDate;
          return lastUpdateDate ? this._formatDate(Number(lastUpdateDate)) : undefined;
        }
      }
    ];
    this.builds$ = pcBuildService.getPcBuilds();
  }

  public resizeGrid(event: AgGridEvent) {
    event.api.sizeColumnsToFit();
  }

  private _formatDate(millis: number): string {
    return this._dateTimeFormat.format(new Date(millis));
  }
}
