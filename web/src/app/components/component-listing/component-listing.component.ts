import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AgGridEvent, ColDef, GridOptions, SelectionChangedEvent } from "ag-grid-community";
import { Store } from '@ngrx/store';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PcComponent, PcComponentType } from 'src/app/pc-component/pc-component';
import { PcComponentService } from 'src/app/pc-component/pc-component.service';
import { updateCpuIds, updateMemoryIds, updateMotherboardIds, updatePowerSupplyIds, updateStorageIds, updateVideoCardIds } from 'src/app/pc-build/pc-build.actions';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-component-listing',
  templateUrl: './component-listing.component.html',
  styleUrls: ['./component-listing.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentListingComponent {
  public readonly gridOptions: GridOptions = {
    defaultColDef: {
      sortable: true,
      filter: true,
    },
    pagination: true,
    suppressCellFocus: true,
    rowSelection: "multiple",
    rowMultiSelectWithClick: true,
    suppressRowDeselection: true
  }
  public components$: BehaviorSubject<PcComponent[]> = new BehaviorSubject<PcComponent[]>([]);
  public columnDefs!: ColDef[];
  public searchText: string = "";
  public selectedComponentType: PcComponentType = "cpu";
  private _selectedComponents: PcComponent[] = [];

  constructor(private _store: Store<any>,
              private _router: Router,
              private _pcComponentService: PcComponentService,
              route: ActivatedRoute) {
    route.queryParamMap.subscribe(((paramMap: ParamMap) => {
      const componentType = paramMap.get("component");
      this.updateComponentType(componentType ?? "cpu");
    }));
  }

  public resizeGrid(event: AgGridEvent) {
    event.api.sizeColumnsToFit();
  }

  public addComponentsToBuild() {
    const ids: string[] = this._selectedComponents
      .map(component => component.uuid)
      .filter((id: string | undefined): id is string => Boolean(id));

    switch (this.selectedComponentType) {
      case "cpu":
        this._store.dispatch(updateCpuIds({ ids }));
        break;
      case "motherboard":
        this._store.dispatch(updateMotherboardIds({ ids }));
        break;
      case "memory":
        this._store.dispatch(updateMemoryIds({ ids }));
        break;
      case "storage":
        this._store.dispatch(updateStorageIds({ ids }));
        break;
      case "video-card":
        this._store.dispatch(updateVideoCardIds({ ids }));
        break;
      case "power-supply":
        this._store.dispatch(updatePowerSupplyIds({ ids }));
        break;
      default:
        throw Error(`Selected invalid componentType ${this.selectedComponentType}`);
    }

    this._router.navigate(["builder"]);
  }

  public updateSelection(event: SelectionChangedEvent) {
    this._selectedComponents = event.api.getSelectedRows();
  }

  public updateComponentType(componentType: string) {
    this.selectedComponentType = componentType as PcComponentType;
    switch (this.selectedComponentType) {
      case "cpu":
        this._updateCpuGrid();
        break
      case "motherboard":
        this._updateMotherboardGrid();
        break
      case "memory":
        this._updateMemoryGrid();
        break;
      case "storage":
        this._updateStorageGrid();
        break;
      case "video-card":
        this._updateVideoCardGrid();
        break;
      case "power-supply":
        this._updatePowerSupplyGrid();
        break;
      default:
        throw Error(`Selected invalid componentType ${this.selectedComponentType}`)
    }
  }

  private _updateCpuGrid() {
    this.columnDefs = [
      { field: 'displayName', checkboxSelection: true },
      { field: 'coreCount' },
      { field: 'coreClock' },
      { field: 'integratedGraphics' },
      { field: 'hasSmt' },
      { field: 'price' }
    ];
    this._pcComponentService.getCpuComponents()
      .subscribe(components => this.components$.next(components));
  }

  private _updateMotherboardGrid() {
    this.columnDefs = [
      { field: 'displayName', checkboxSelection: true },
      { field: 'cpuSocket' },
      { field: 'formFactor' },
      { field: 'numMemorySlots' },
      { field: 'price' }
    ];
    this._pcComponentService.getMotherboardComponents()
      .subscribe(components => this.components$.next(components));
  }

  private _updateMemoryGrid() {
    this.columnDefs = [
      { field: 'displayName', checkboxSelection: true },
      { field: 'ddrVersion' },
      { field: 'ddrClock' },
      { field: 'numModules' },
      { field: 'moduleSizeGigabytes' },
      { field: 'price' }
    ]
    this._pcComponentService.getMemoryComponents()
      .subscribe(components => this.components$.next(components));
  }

  private _updateStorageGrid() {
    this.columnDefs = [
      { field: 'displayName', checkboxSelection: true },
      { field: 'capacityGigabytes' },
      { field: 'type' },
      { field: 'cacheSizeMegabtyes' },
      { field: 'formFactor' },
      { field: 'interface' },
      { field: 'price' }
    ]
    this._pcComponentService.getStorageComponents()
      .subscribe(components => this.components$.next(components));
  }

  private _updateVideoCardGrid() {
    this.columnDefs = [
      { field: 'displayName', checkboxSelection: true },
      { field: 'chipset' },
      { field: 'memoryGigabytes' },
      { field: 'coreClock' },
      { field: 'boostClock' },
      { field: 'lengthMillimeters' },
      { field: 'price' }
    ]
    this._pcComponentService.getVideoCardComponents()
      .subscribe(components => this.components$.next(components));
  }

  private _updatePowerSupplyGrid() {
    this.columnDefs = [
      { field: 'displayName', checkboxSelection: true },
      { field: 'type' },
      { field: 'efficiency' },
      { field: 'wattage' },
      { field: 'modular' },
      { field: 'colour' },
      { field: 'price' }
    ]
    this._pcComponentService.getPowerSupplyComponents()
      .subscribe(components => this.components$.next(components));
  }
}
