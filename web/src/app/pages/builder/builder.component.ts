import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
<<<<<<< HEAD
import { Observable, catchError, of, switchMap } from 'rxjs';
import { CpuComponent, MemoryComponent, MotherboardComponent, PowerSupplyComponent, StorageComponent, VideoCardComponent } from 'src/app/transfers/pc_component';
import { updateDraftInfo } from '../component-listing/build-list.reducer';
=======
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { ComputerBuildDraftDto } from 'src/app/models/pc-builder';
import { PcBuilderService } from 'src/app/services/pc-builder/pc-builder.service';
import * as ComputerBuildDraftReducer from '../../reducers/computer-build-draft.reducer';
>>>>>>> origin/main
import { Router } from '@angular/router';
import { PcBuilderService } from 'src/app/services/pc-builder.service';
import { PcBuildDraft } from 'src/app/transfers/pc_build';

interface ComponentItem {
  displayName: string;
  price: number;
}

interface ComponentListDefinition {
  items$: Observable<ComponentItem[]>;
  componentType: string;
  displayName: string;
}

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent {
<<<<<<< HEAD
  public draft$: Observable<PcBuildDraft>;
  public cpuList$: Observable<CpuComponent[]>;
  public motherboardList$: Observable<MotherboardComponent[]>;
  public memoryList$: Observable<MemoryComponent[]>;
  public storageList$: Observable<StorageComponent[]>;
  public videoCardList$: Observable<VideoCardComponent[]>;
  public powerSupplyList$: Observable<PowerSupplyComponent[]>;
=======
  public draft$: Observable<ComputerBuildDraftDto>;
>>>>>>> origin/main
  public isEditDraftOpen: boolean = false;
  public componentListDefs: ComponentListDefinition[];

  constructor(private _pcBuilderService: PcBuilderService,
              private _store: Store<any>,
              private _router: Router) {
<<<<<<< HEAD
    this.draft$ = _store.select("buildList");
    this.cpuList$ = this.draft$.pipe(
      switchMap((buildList: PcBuildDraft) => _pcBuilderService.getCpuComponents(buildList.cpuIds)),
      catchError(() => of([]))
    );
    this.motherboardList$ = this.draft$.pipe(
      switchMap((buildList: PcBuildDraft) => _pcBuilderService.getMotherboardComponents(buildList.motherboardIds)),
      catchError(() => of([]))
    );
    this.memoryList$ = this.draft$.pipe(
      switchMap((buildList: PcBuildDraft) => _pcBuilderService.getMemoryComponents(buildList.memoryIds)),
      catchError(() => of([]))
    );
    this.storageList$ = this.draft$.pipe(
      switchMap((buildList: PcBuildDraft) => _pcBuilderService.getStorageComponents(buildList.storageIds)),
      catchError(() => of([]))
    );
    this.videoCardList$ = this.draft$.pipe(
      switchMap((buildList: PcBuildDraft) => _pcBuilderService.getVideoCardComponents(buildList.videoCardIds)),
      catchError(() => of([]))
    );
    this.powerSupplyList$ = this.draft$.pipe(
      switchMap((buildList: PcBuildDraft) => _pcBuilderService.getPowerSupplyComponents(buildList.powerSupplyIds)),
=======
    this.draft$ = _store.select(ComputerBuildDraftReducer.stateName);
    const cpuItems$: Observable<ComponentItem[]> = this.draft$.pipe(
      switchMap((draft: ComputerBuildDraftDto) => _pcBuilderService.getCpuComponents(draft.cpuIds)),
      map((components) => components.map(component => {
        const clockString = component.coreClock ? ` ${component.coreClock} GHz` : "";
        const coreCountString = component.coreCount ? ` ${component.coreCount}-Core` : "";
        const displayName = component.displayName + clockString + coreCountString + " Processor";
        const price = component.price ?? -1;
        return { displayName, price }
      })),
      catchError(() => of([]))
    );
    const motherboardItems$ = this.draft$.pipe(
      switchMap((draft: ComputerBuildDraftDto) => _pcBuilderService.getMotherboardComponents(draft.motherboardIds)),
      map((components) => components.map(component => {
        return {
          displayName: component.displayName ?? "",
          price: component.price ?? -1
        };
      })),
      catchError(() => of([]))
    );
    const memoryItems$ = this.draft$.pipe(
      switchMap((draft: ComputerBuildDraftDto) => _pcBuilderService.getMemoryComponents(draft.memoryIds)),
      map((components) => components.map(component => {
        return {
          displayName: component.displayName ?? "",
          price: component.price ?? -1
        };
      })),
      catchError(() => of([]))
    );
    const storageItems$ = this.draft$.pipe(
      switchMap((draft: ComputerBuildDraftDto) => _pcBuilderService.getStorageComponents(draft.storageIds)),
      map((components) => components.map(component => {
        return {
          displayName: component.displayName ?? "",
          price: component.price ?? -1
        };
      })),
      catchError(() => of([]))
    );
    const videoCardItems$ = this.draft$.pipe(
      switchMap((draft: ComputerBuildDraftDto) => _pcBuilderService.getVideoCardComponents(draft.videoCardIds)),
      map((components) => components.map(component => {
        return {
          displayName: component.displayName ?? "",
          price: component.price ?? -1
        };
      })),
      catchError(() => of([]))
    );
    const powerSupplyItems$ = this.draft$.pipe(
      switchMap((draft: ComputerBuildDraftDto) => _pcBuilderService.getPowerSupplyComponents(draft.powerSupplyIds)),
      map((components) => components.map(component => {
        return {
          displayName: component.displayName ?? "",
          price: component.price ?? -1
        };
      })),
>>>>>>> origin/main
      catchError(() => of([]))
    );
    this.componentListDefs = [
      {
        items$: cpuItems$,
        componentType: "cpu",
        displayName: "CPU"
      },
      {
        items$: motherboardItems$,
        componentType: "motherboard",
        displayName: "Motherboard"
      },
      {
        items$: memoryItems$,
        componentType: "memory",
        displayName: "Memory"
      },
      {
        items$: storageItems$,
        componentType: "storage",
        displayName: "Storage"
      },
      {
        items$: videoCardItems$,
        componentType: "videoCard",
        displayName: "Video card"
      },
      {
        items$: powerSupplyItems$,
        componentType: "powerSupply",
        displayName: "Power supply"
      },
    ]
  }

<<<<<<< HEAD
  public saveDraft(buildList: PcBuildDraft) {
=======
  public saveDraft(buildList: ComputerBuildDraftDto) {
>>>>>>> origin/main
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
