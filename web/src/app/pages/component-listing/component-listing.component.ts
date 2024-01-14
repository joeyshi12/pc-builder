import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PcBuilderService } from "../../services/pc-builder/pc-builder.service";
import { Observable } from "rxjs";
import { AgGridEvent, ColDef, GridOptions } from "ag-grid-community";
import { AgGridAngular } from 'ag-grid-angular';
import { Store } from '@ngrx/store';
import { updateDraftComponentIds } from '../../reducers/computer-build-draft.reducer';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-component-listing',
  templateUrl: './component-listing.component.html',
  styleUrls: ['./component-listing.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentListingComponent {
  public components$!: Observable<any[]>;
  public gridOptions: GridOptions = {
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
  public columnDefs!: ColDef[];
  public searchText: string = "";
  public selectedComponentType: string = "cpu";

  constructor(private _store: Store<any>,
              private _router: Router,
              private _pcBuilderService: PcBuilderService,
              route: ActivatedRoute) {
    route.queryParamMap.subscribe(((paramMap: ParamMap) => {
      const componentType = paramMap.get("component");
      this.updateComponentType(componentType ?? "cpu");
    }).bind(this));
  }

  public resizeGrid(params: AgGridEvent) {
    params.api.sizeColumnsToFit();
  }

  public onUpdateSearchText(searchText: string) {
    this.searchText = searchText;
  }

  public updateBuildList(componentType: string, grid: AgGridAngular) {
    const ids: string[] = grid.api.getSelectedRows().map(component => component.uuid);
    this._store.dispatch(updateDraftComponentIds({ componentType, ids }));
    this._router.navigate(["builder"]);
  }

  public updateComponentType(componentType: string) {
    this.selectedComponentType = componentType;
    switch (componentType) {
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
      case "videoCard":
        this._updateVideoCardGrid();
        break;
      case "powerSupply":
        this._updatePowerSupplyGrid();
        break;
      default:
        throw Error(`Selected invalid componentType ${componentType}`)
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
    this.components$ = this._pcBuilderService.getCpuComponents();
  }

  private _updateMotherboardGrid() {
    this.columnDefs = [
      { field: 'displayName', checkboxSelection: true },
      { field: 'cpuSocket' },
      { field: 'formFactor' },
      { field: 'numMemorySlots' },
      { field: 'price' }
    ];
    this.components$ = this._pcBuilderService.getMotherboardComponents();
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
    this.components$ = this._pcBuilderService.getMemoryComponents();
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
    this.components$ = this._pcBuilderService.getStorageComponents();
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
    this.components$ = this._pcBuilderService.getVideoCardComponents();
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
    this.components$ = this._pcBuilderService.getPowerSupplyComponents();
  }
}
