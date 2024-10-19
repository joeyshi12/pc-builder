import { Component, HostListener, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AgGridEvent, ColDef, GridOptions, SelectionChangedEvent } from "ag-grid-community";
import { combineLatest, map, Subscription } from 'rxjs';
import * as PcBuildActions from '../../data/pc-build/pc-build.actions';
import { PcBuild } from 'src/app/transfers/pc_build';
import { PcComponentService } from 'src/app/data/pc-component/pc-component.service';
import { PcComponents, PcComponentType } from 'src/app/data/pc-component/pc-component';
import { AppState, pcBuildStateKey, userStateKey } from 'src/app/data/app.state';

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
export class BuilderComponent implements OnDestroy {
  public draftBuild?: PcBuild = undefined;
  public userBuilds: PcBuild[] = [];
  public componentListModels: ComponentListModel[] = [];
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
  public isBuildListOpen: boolean = false;
  public isEditDraftOpen: boolean = false;
  private readonly _subscription: Subscription;
  private _selectedBuild?: PcBuild;

  @HostListener("document:keydown.escape")
  public onEscapeDown(): void {
    this.isBuildListOpen = false;
    this.isEditDraftOpen = false;
  }

  constructor(private _store: Store<AppState>, pcComponentService: PcComponentService) {
    this._subscription = combineLatest([
      this._store.select(pcBuildStateKey),
      this._store.select(userStateKey).pipe(map(state => state.currentUser))
    ]).subscribe(([buildState, user]) => {
      this.isLoggedIn = Boolean(user?.username);
      if (this.isLoggedIn) {
        this.userBuilds = buildState.builds.filter(build => build.username === user?.username);
      }
      if (!this.draftBuild || this.draftBuild.uuid !== buildState.draftBuild.uuid) {
        pcComponentService.getPcComponents(buildState.draftBuild).subscribe(pcComponents => {
          this.componentListModels = this._toComponentListModels(pcComponents);
        });
      }
      this.draftBuild = buildState.draftBuild;
    });
  }

  public ngOnDestroy(): void {
      this._subscription.unsubscribe();
  }

  public get hasSelectedBuild(): boolean {
    return Boolean(this._selectedBuild);
  }

  public resizeGrid(event: AgGridEvent) {
    event.api.sizeColumnsToFit();
  }

  public createNewDraft(): void {
    this._store.dispatch(PcBuildActions.setNewPcBuild());
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
      this._store.dispatch(PcBuildActions.updateBuild({ build: this._selectedBuild }));
      this.isBuildListOpen = false;
      this._selectedBuild = undefined;
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
