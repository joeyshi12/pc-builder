import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map, switchMap } from 'rxjs';
import * as PcBuildReducer from '../../pc-build/pc-build.reducer';
import * as PcBuildActions from '../../pc-build/pc-build.actions';
import { Router } from '@angular/router';
import { PcBuild } from 'src/app/transfers/pc_build';
import { PcBuildService } from 'src/app/pc-build/pc-build.service';
import { PcComponentService } from 'src/app/pc-component/pc-component.service';
import { UserService } from 'src/app/user/user.service';
import { PcComponents } from 'src/app/pc-component/pc-component';

interface ComponentItem {
  displayName: string;
  price: number;
}

interface ComponentListModel {
  displayName: string;
  componentType: string;
  items: ComponentItem[];
}

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent {
  public draft$: Observable<PcBuild>;
  public isEditDraftOpen: boolean = false;
  public componentListModels$: Observable<ComponentListModel[]>;

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
  }

  public saveDraft(buildList: PcBuild) {
    const currentUser = this._userService.currentUser$.getValue()
    if (!currentUser) {
      alert("Must be logged in first");
      return;
    }
    this._pcBuildService.createPcBuild(buildList).subscribe(() => {
      this._router.navigate(["user-profile"]);
    });
  }

  public formPriceString(price: number): string {
    return price >= 0 ? `$${price}` : "";
  }

  public updateDraftInfo(displayName: string, description: string) {
    this._store.dispatch(PcBuildActions.updateBasicInfo({displayName, description}))
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
          const price = component.price ?? -1;
          return {displayName, price}
        }),
      },
      {
        displayName: "Motherboard",
        componentType: "motherboard",
        items: pcComponents.motherboardList.map(component => {
          return {
            displayName: component.displayName ?? "",
            price: component.price ?? -1
          };
        }),
      },
      {
        displayName: "Memory",
        componentType: "memory",
        items: pcComponents.memoryList.map(component => {
          return {
            displayName: component.displayName ?? "",
            price: component.price ?? -1
          };
        }),
      },
      {
        displayName: "Storage",
        componentType: "storage",
        items: pcComponents.storageList.map(component => {
          return {
            displayName: component.displayName ?? "",
            price: component.price ?? -1
          };
        }),
      },
      {
        displayName: "Video card",
        componentType: "videoCard",
        items: pcComponents.videoCardList.map(component => {
          return {
            displayName: component.displayName ?? "",
            price: component.price ?? -1
          };
        }),
      },
      {
        displayName: "Power supply",
        componentType: "powerSupply",
        items: pcComponents.powerSupplyList.map(component => {
          return {
            displayName: component.displayName ?? "",
            price: component.price ?? -1
          };
        }),
      },
    ];
  }
}
