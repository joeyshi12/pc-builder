import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AgGridEvent, ColDef, GridOptions, SelectionChangedEvent } from "ag-grid-community";
import { Store } from '@ngrx/store';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PcComponent, PcComponentType } from 'src/app/data/pc-component/pc-component';
import { PcComponentService } from 'src/app/data/pc-component/pc-component.service';
import * as PcBuildActions from 'src/app/data/pc-build/pc-build.actions';
import { BehaviorSubject, combineLatest, Observable, take } from 'rxjs';
import { draftSelector, isDraftLoadingSelector } from 'src/app/data/pc-build/pc-build.selectors';
import { AppState } from 'src/app/data/app.state';

@Component({
  selector: 'app-component-listing',
  templateUrl: './component-listing.component.html',
  styleUrls: ['./component-listing.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentListingComponent {
  public readonly isDraftLoading$: Observable<boolean>;
  public readonly gridOptions: GridOptions = {
    defaultColDef: {
      sortable: true,
      filter: true,
    },
    pagination: true,
    suppressCellFocus: true,
    rowSelection: {
      mode: "multiRow",
      headerCheckbox: false,
    },
  };
  public components$: BehaviorSubject<PcComponent[]> = new BehaviorSubject<PcComponent[]>([]);
  public columnDefs!: ColDef[];
  public searchText: string = "";
  public selectedComponentType: PcComponentType = "cpu";
  private _selectedComponents: PcComponent[] = [];

  constructor(route: ActivatedRoute,
              private readonly _store: Store<AppState>,
              private readonly _router: Router,
              private readonly _pcComponentService: PcComponentService) {
    this.isDraftLoading$ = _store.select(isDraftLoadingSelector);
    route.queryParamMap.subscribe(((paramMap: ParamMap) => {
      const componentType = paramMap.get("component");
      this.updateComponentType(componentType ?? "cpu");
    }));
  }

  public resizeGrid(event: AgGridEvent) {
    event.api.sizeColumnsToFit();
  }

  public onModelUpdate(event: AgGridEvent<PcComponent>) {
    this._store.select(draftSelector).pipe(take(1)).subscribe(draft => {
      switch (this.selectedComponentType) {
        case "cpu":
          event.api.forEachNode(node => {
            const isSelected = draft.cpuIds?.includes(node.data?.uuid ?? "") ?? false;
            node.setSelected(isSelected);
          });
          break;
        case "motherboard":
          event.api.forEachNode(node => {
            const isSelected = draft.motherboardIds?.includes(node.data?.uuid ?? "") ?? false;
            node.setSelected(isSelected);
          });
          break;
        case "memory":
          event.api.forEachNode(node => {
            const isSelected = draft.memoryIds?.includes(node.data?.uuid ?? "") ?? false;
            node.setSelected(isSelected);
          });
          break;
        case "storage":
          event.api.forEachNode(node => {
            const isSelected = draft.storageIds?.includes(node.data?.uuid ?? "") ?? false;
            node.setSelected(isSelected);
          });
          break;
        case "video-card":
          event.api.forEachNode(node => {
            const isSelected = draft.videoCardIds?.includes(node.data?.uuid ?? "") ?? false;
            node.setSelected(isSelected);
          });
          break;
        case "power-supply":
          event.api.forEachNode(node => {
            const isSelected = draft.powerSupplyIds?.includes(node.data?.uuid ?? "") ?? false;
            node.setSelected(isSelected);
          });
          break;
        default:
          throw Error(`Selected invalid componentType ${this.selectedComponentType}`);
      }
    });
  }

  public addComponentsToBuild() {
    const ids: string[] = this._selectedComponents
      .map(component => component.uuid)
      .filter((id: string | undefined): id is string => Boolean(id));

    switch (this.selectedComponentType) {
      case "cpu":
        this._store.dispatch(PcBuildActions.updateCpuIds({ ids }));
        break;
      case "motherboard":
        this._store.dispatch(PcBuildActions.updateMotherboardIds({ ids }));
        break;
      case "memory":
        this._store.dispatch(PcBuildActions.updateMemoryIds({ ids }));
        break;
      case "storage":
        this._store.dispatch(PcBuildActions.updateStorageIds({ ids }));
        break;
      case "video-card":
        this._store.dispatch(PcBuildActions.updateVideoCardIds({ ids }));
        break;
      case "power-supply":
        this._store.dispatch(PcBuildActions.updatePowerSupplyIds({ ids }));
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
      { field: 'displayName' },
      { field: 'coreCount' },
      { field: 'coreClock' },
      { field: 'integratedGraphics' },
      { field: 'hasSmt' },
      { field: 'price' }
    ];
    combineLatest([
      this._pcComponentService.getCpuComponents(),
      this._store.select(draftSelector).pipe(take(1))
    ]).subscribe(([components, draft]) => {
      this.components$.next(components.sort(component => {
        if (!draft.cpuIds || !component.uuid) {
          return 1;
        }
        return draft.cpuIds.includes(component.uuid) ? -1 : 1;
      }));
    });
  }

  private _updateMotherboardGrid() {
    this.columnDefs = [
      { field: 'displayName' },
      { field: 'cpuSocket' },
      { field: 'formFactor' },
      { field: 'numMemorySlots' },
      { field: 'price' }
    ];
    combineLatest([
      this._pcComponentService.getMotherboardComponents(),
      this._store.select(draftSelector).pipe(take(1))
    ]).subscribe(([components, draft]) => {
      this.components$.next(components.sort(component => {
        if (!draft.motherboardIds || !component.uuid) {
          return 1;
        }
        return draft.motherboardIds.includes(component.uuid) ? -1 : 1;
      }));
    });
  }

  private _updateMemoryGrid() {
    this.columnDefs = [
      { field: 'displayName' },
      { field: 'ddrVersion' },
      { field: 'ddrClock' },
      { field: 'numModules' },
      { field: 'moduleSizeGigabytes' },
      { field: 'price' }
    ];
    combineLatest([
      this._pcComponentService.getMemoryComponents(),
      this._store.select(draftSelector).pipe(take(1))
    ]).subscribe(([components, draft]) => {
      this.components$.next(components.sort(component => {
        if (!draft.memoryIds || !component.uuid) {
          return 1;
        }
        return draft.memoryIds.includes(component.uuid) ? -1 : 1;
      }));
    });
  }

  private _updateStorageGrid() {
    this.columnDefs = [
      { field: 'displayName' },
      { field: 'capacityGigabytes' },
      { field: 'type' },
      { field: 'cacheSizeMegabtyes' },
      { field: 'formFactor' },
      { field: 'interface' },
      { field: 'price' }
    ];
    combineLatest([
      this._pcComponentService.getStorageComponents(),
      this._store.select(draftSelector).pipe(take(1))
    ]).subscribe(([components, draft]) => {
      this.components$.next(components.sort(component => {
        if (!draft.storageIds || !component.uuid) {
          return 1;
        }
        return draft.storageIds.includes(component.uuid) ? -1 : 1;
      }));
    });
  }

  private _updateVideoCardGrid() {
    this.columnDefs = [
      { field: 'displayName' },
      { field: 'chipset' },
      { field: 'memoryGigabytes' },
      { field: 'coreClock' },
      { field: 'boostClock' },
      { field: 'lengthMillimeters' },
      { field: 'price' }
    ];
    combineLatest([
      this._pcComponentService.getVideoCardComponents(),
      this._store.select(draftSelector).pipe(take(1))
    ]).subscribe(([components, draft]) => {
      this.components$.next(components.sort(component => {
        if (!draft.videoCardIds || !component.uuid) {
          return 1;
        }
        return draft.videoCardIds.includes(component.uuid) ? -1 : 1;
      }));
    });
  }

  private _updatePowerSupplyGrid() {
    this.columnDefs = [
      { field: 'displayName' },
      { field: 'type' },
      { field: 'efficiency' },
      { field: 'wattage' },
      { field: 'modular' },
      { field: 'colour' },
      { field: 'price' }
    ];
    combineLatest([
      this._pcComponentService.getPowerSupplyComponents(),
      this._store.select(draftSelector).pipe(take(1))
    ]).subscribe(([components, draft]) => {
      this.components$.next(components.sort(component => {
        if (!draft.powerSupplyIds || !component.uuid) {
          return 1;
        }
        return draft.powerSupplyIds.includes(component.uuid) ? -1 : 1;
      }));
    });
  }
}
