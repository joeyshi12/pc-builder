import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map, switchMap } from 'rxjs';
import * as ComputerBuildDraftReducer from '../../reducers/computer-build-draft.reducer';
import { Router } from '@angular/router';
import { PcBuilderService } from 'src/app/services/pc-builder.service';
import { PcBuildDraft } from 'src/app/transfers/pc_build';

interface ComponentItem {
  displayName: string;
  price: number;
}

interface ComponentListDefinition {
  items: ComponentItem[];
  componentType: string;
  displayName: string;
}

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent {
  public draft$: Observable<PcBuildDraft>;
  public isEditDraftOpen: boolean = false;
  public componentListDefs$: Observable<ComponentListDefinition[]>;

  constructor(private _pcBuilderService: PcBuilderService,
              private _store: Store<any>,
              private _router: Router) {
    this.draft$ = _store.select(ComputerBuildDraftReducer.stateName);
    this.componentListDefs$ = this.draft$.pipe(
      switchMap((draft: PcBuildDraft) => {
        return combineLatest([
          _pcBuilderService.getCpuComponents(draft.cpuIds),
          _pcBuilderService.getMotherboardComponents(draft.motherboardIds),
          _pcBuilderService.getMemoryComponents(draft.memoryIds),
          _pcBuilderService.getStorageComponents(draft.storageIds),
          _pcBuilderService.getVideoCardComponents(draft.videoCardIds),
          _pcBuilderService.getPowerSupplyComponents(draft.powerSupplyIds)
        ]);
      }),
      map(([cpuList, motherboardList, memoryList, storageList, videoCardList, powerSupplyList]) => {
        return [
          {
            items: cpuList.map(component => {
              const clockString = component.coreClock ? ` ${component.coreClock} GHz` : "";
              const coreCountString = component.coreCount ? ` ${component.coreCount}-Core` : "";
              const displayName = component.displayName + clockString + coreCountString + " Processor";
              const price = component.price ?? -1;
              return {displayName, price}
            }),
            componentType: "cpu",
            displayName: "CPU"
          },
          {
            items: motherboardList.map(component => {
              return {
                displayName: component.displayName ?? "",
                price: component.price ?? -1
              };
            }),
            componentType: "motherboard",
            displayName: "Motherboard"
          },
          {
            items: memoryList.map(component => {
              return {
                displayName: component.displayName ?? "",
                price: component.price ?? -1
              };
            }),
            componentType: "memory",
            displayName: "Memory"
          },
          {
            items: storageList.map(component => {
              return {
                displayName: component.displayName ?? "",
                price: component.price ?? -1
              };
            }),
            componentType: "storage",
            displayName: "Storage"
          },
          {
            items: videoCardList.map(component => {
              return {
                displayName: component.displayName ?? "",
                price: component.price ?? -1
              };
            }),
            componentType: "videoCard",
            displayName: "Video card"
          },
          {
            items: powerSupplyList.map(component => {
              return {
                displayName: component.displayName ?? "",
                price: component.price ?? -1
              };
            }),
            componentType: "powerSupply",
            displayName: "Power supply"
          },
        ]
      })
    );
  }

  public saveDraft(buildList: PcBuildDraft) {
    const currentUser = this._pcBuilderService.currentUser$.getValue()
    if (!currentUser) {
      alert("Must be logged in first");
      return;
    }
    this._pcBuilderService.createComputerBuild(buildList).subscribe(() => {
      this._router.navigate(["user-profile"]);
    });
  }

  public formPriceString(price: number): string {
    if (price < 0) {
      return ""
    }
    return `$${price}`
  }

  public updateDraftInfo(displayName: string, description: string) {
    this._store.dispatch(ComputerBuildDraftReducer.updateDraftInfo({displayName, description}))
  }
}
