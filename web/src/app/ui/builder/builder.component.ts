import { Component, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { AgGridEvent, ColDef, GridOptions, SelectionChangedEvent } from "ag-grid-community";
import { Observable, map, switchMap } from 'rxjs';
import * as PcBuildReducer from '../../data/pc-build/pc-build.reducer';
import * as PcBuildActions from '../../data/pc-build/pc-build.actions';
import { Router } from '@angular/router';
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

  @HostListener("document:keydown.escape", ["$event"])
  public onEscapeDown(event: KeyboardEvent): void {
    this.isBuildListOpen = false;
    this.isEditDraftOpen = false;
  }

  constructor(private _pcBuildService: PcBuildService,
              pcComponentService: PcComponentService,
              private _userService: UserService,
              private _store: Store<any>,
              private _router: Router) {
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

  public resizeGrid(event: AgGridEvent) {
    event.api.sizeColumnsToFit();
  }

  public updateBuildSelection(event: SelectionChangedEvent) {
  }

  public saveDraft(build: PcBuild) {
    const currentUser = this._userService.currentUser$.getValue()
    if (!currentUser) {
      alert("Must be logged in first");
      return;
    }
    if (build.uuid) {
      this._pcBuildService.updatePcBuild(build).subscribe(() => {
        this._router.navigate(["user-profile"]);
      });
    } else {
      this._pcBuildService.createPcBuild(build).subscribe(() => {
        this._router.navigate(["user-profile"]);
      });
    }
    this._store.dispatch(PcBuildActions.clearBuild());
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
