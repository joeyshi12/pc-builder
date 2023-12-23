import { ChangeDetectionStrategy, Component } from '@angular/core';
import {PcBuilderService} from "../../services/pc-builder/pc-builder.service";
import { Observable } from "rxjs";
import {CpuComponent} from "../../models/pc-builder";
import { ColDef, GridColumnsChangedEvent } from "ag-grid-community";
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-component-listing',
  templateUrl: './component-listing.component.html',
  styleUrls: ['./component-listing.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentListingComponent {
  public components$!: Observable<CpuComponent[]>;
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };
  public columnDefs!: ColDef[];
  public searchText: string = "";

  constructor(private _pcBuilderService: PcBuilderService) {
    this._updateCpuGrid();
  }

  public onColumnsChanged(params: GridColumnsChangedEvent, componentType: string) {
    const selectedIds = new Set(this._getSelectedIds(componentType));
    console.log(params);
    params.api.forEachNode((node) => {
      if (selectedIds.has(node.data.uuid)) {
        node.setSelected(true);
      }
    })
    this.resizeGrid(params);
  }

  public resizeGrid(params: GridColumnsChangedEvent) {
    params.api.sizeColumnsToFit();
  }

  public getRowId(row: any) {
    return row.data.uuid;
  }

  public onUpdateSearchText(searchText: string) {
    this.searchText = searchText;
  }

  public updateBuildList(componentType: string, grid: AgGridAngular) {
    const componentIds: string[] = grid.api.getSelectedRows().map(component => component.uuid);
    console.log(grid.api.getSelectedRows());
    localStorage.setItem(componentType, JSON.stringify(componentIds));
  }

  public updateComponentSelection(componentType: string) {
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

  private _getSelectedIds(componentType: string): string[] {
    switch (componentType) {
      case "cpu":
        return this._pcBuilderService.selectedCpuIds;
      case "motherboard":
        return this._pcBuilderService.selectedMotherboardIds;
      case "memory":
        return this._pcBuilderService.selectedMemoryIds;
      case "storage":
        return this._pcBuilderService.selectedStorageIds;
      case "videoCard":
        return this._pcBuilderService.selectedVideoCardIds;
      case "powerSupply":
        return this._pcBuilderService.selectedPowerSupplyIds;
      default:
        throw Error(`Selected invalid componentType ${componentType}`)
    }
  }
}
