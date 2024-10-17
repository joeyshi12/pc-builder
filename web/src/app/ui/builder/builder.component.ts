import { Component, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { AgGridEvent, ColDef, GridOptions, SelectionChangedEvent } from "ag-grid-community";
import { Observable, map, switchMap } from 'rxjs';
import * as PcBuildReducer from '../../data/pc-build/pc-build.reducer';
import * as PcBuildActions from '../../data/pc-build/pc-build.actions';
import { PcBuild } from 'src/app/transfers/pc_build';
import { PcBuildService } from 'src/app/data/pc-build/pc-build.service';
import { PcComponentService } from 'src/app/data/pc-component/pc-component.service';
import { UserService } from 'src/app/data/user/user.service';
import { PcComponents, PcComponentType } from 'src/app/data/pc-component/pc-component';
import { UserProfile } from 'src/app/transfers/user';

type ComponentItem = {
  displayName: string;
  price: string;
};

type ComponentListModel = {
  displayName: string;
  componentType: PcComponentType;
  items: ComponentItem[];
};

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent {
  public draft$: Observable<PcBuild>;
  public isBuildListOpen: boolean = false;
  public isEditDraftOpen: boolean = false;
  public componentListModels$: Observable<ComponentListModel[]>;
  public buildList: PcBuild[] = [];
  public isLoggedIn: boolean = false;
  public readonly columnDefs: ColDef[] = [
    { field: "displayName", checkboxSelection: true },
    { field: "description" }
  ];
  public readonly gridOptions: GridOptions = {
    defaultColDef: {
      sortable: true
    }
  };
  private _selectedBuild?: PcBuild;

  @HostListener("document:keydown.escape")
  public onEscapeDown(): void {
    this.isBuildListOpen = false;
    this.isEditDraftOpen = false;
  }

  constructor(private _pcBuildService: PcBuildService,
              pcComponentService: PcComponentService,
              private _userService: UserService,
              private _store: Store<any>) {
    this.draft$ = _store.select(PcBuildReducer.stateName);
    this.componentListModels$ = this.draft$.pipe(
      switchMap((draft: PcBuild) => pcComponentService.getPcComponents(draft)),
      map((pcComponents) => this._toComponentListModels(pcComponents))
    );
    _userService.currentUser$.subscribe((currentUser: UserProfile | undefined) => {
      if (currentUser?.username) {
        this.isLoggedIn = true;
        _pcBuildService.getPcBuilds(undefined, currentUser.username).subscribe((builds: PcBuild[]) => {
          this.buildList = builds;
        });
      }
    });
  }

  public get hasSelectedBuild(): boolean {
    return Boolean(this._selectedBuild);
  }

  public resizeGrid(event: AgGridEvent) {
    event.api.sizeColumnsToFit();
  }

  public openBuildList(): void {
    this._selectedBuild = undefined;
    this.isBuildListOpen = true;
  }

  public updateBuildSelection(event: SelectionChangedEvent<PcBuild>) {
    this._selectedBuild = event.api.getSelectedRows()[0];
  }

  public switchBuild(): void {
    if (this._selectedBuild) {
      this._store.dispatch(PcBuildActions.updateBuild(this._selectedBuild));
      this.isBuildListOpen = false;
    }
  }

  public saveDraft(build: PcBuild) {
    const currentUser = this._userService.currentUser$.getValue()
    if (!currentUser) {
      alert("Must be logged in first");
      return;
    }
    if (build.uuid) {
      this._pcBuildService.updatePcBuild(build).subscribe(() => {
        window.location.reload();
      });
    } else {
      this._pcBuildService.createPcBuild(build).subscribe(() => {
        window.location.reload();
      });
    }
  }

  public updateDraftInfo(displayName: string, description: string) {
    this._store.dispatch(PcBuildActions.updateBasicInfo({displayName, description}))
    this.isEditDraftOpen = false;
  }

  private _toComponentListModels(pcComponents: PcComponents): ComponentListModel[] {
    return [
      {
        displayName: "CPU",
        componentType: "cpu",
        items: pcComponents.cpuList.map(component => {
          const clockString = component.coreClock ? ` ${component.coreClock} GHz` : "";
          const coreCountString = component.coreCount ? ` ${component.coreCount}-Core` : "";
          const displayName = component.displayName + clockString + coreCountString + " Processor";
          const price = this._formPriceString(component.price);
          return {displayName, price}
        }),
      },
      {
        displayName: "Motherboard",
        componentType: "motherboard",
        items: pcComponents.motherboardList.map(component => {
          return {
            displayName: component.displayName ?? "",
            price: this._formPriceString(component.price)
          };
        }),
      },
      {
        displayName: "Memory",
        componentType: "memory",
        items: pcComponents.memoryList.map(component => {
          return {
            displayName: component.displayName ?? "",
            price: this._formPriceString(component.price)
          };
        }),
      },
      {
        displayName: "Storage",
        componentType: "storage",
        items: pcComponents.storageList.map(component => {
          return {
            displayName: component.displayName ?? "",
            price: this._formPriceString(component.price)
          };
        }),
      },
      {
        displayName: "Video card",
        componentType: "video-card",
        items: pcComponents.videoCardList.map(component => {
          return {
            displayName: component.displayName ?? "",
            price: this._formPriceString(component.price)
          };
        }),
      },
      {
        displayName: "Power supply",
        componentType: "power-supply",
        items: pcComponents.powerSupplyList.map(component => {
          return {
            displayName: component.displayName ?? "",
            price: this._formPriceString(component.price)
          };
        }),
      },
    ];
  }

  private _formPriceString(price: number | undefined): string {
    return price ? `$${price}` : "N/A";
  }
}
