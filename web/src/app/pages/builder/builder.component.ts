import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { ComputerBuildDraft, CpuComponent, MemoryComponent, MotherboardComponent, PowerSupplyComponent, StorageComponent, VideoCardComponent } from 'src/app/models/pc-builder';
import { PcBuilderService } from 'src/app/services/pc-builder/pc-builder.service';
import { updateDraftInfo } from '../component-listing/build-list.reducer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent {
  public draft$: Observable<ComputerBuildDraft>;
  public cpuList$: Observable<CpuComponent[]>;
  public motherboardList$: Observable<MotherboardComponent[]>;
  public memoryList$: Observable<MemoryComponent[]>;
  public storageList$: Observable<StorageComponent[]>;
  public videoCardList$: Observable<VideoCardComponent[]>;
  public powerSupplyList$: Observable<PowerSupplyComponent[]>;
  public isEditDraftOpen: boolean = false;

  constructor(private _pcBuilderService: PcBuilderService,
              private _store: Store<any>,
              private _router: Router) {
    this.draft$ = _store.select("buildList");
    this.cpuList$ = this.draft$.pipe(
      switchMap((buildList: ComputerBuildDraft) => _pcBuilderService.getCpuComponents(buildList.cpuIds)),
      catchError(() => of([]))
    );
    this.motherboardList$ = this.draft$.pipe(
      switchMap((buildList: ComputerBuildDraft) => _pcBuilderService.getMotherboardComponents(buildList.motherboardIds)),
      catchError(() => of([]))
    );
    this.memoryList$ = this.draft$.pipe(
      switchMap((buildList: ComputerBuildDraft) => _pcBuilderService.getMemoryComponents(buildList.memoryIds)),
      catchError(() => of([]))
    );
    this.storageList$ = this.draft$.pipe(
      switchMap((buildList: ComputerBuildDraft) => _pcBuilderService.getStorageComponents(buildList.storageIds)),
      catchError(() => of([]))
    );
    this.videoCardList$ = this.draft$.pipe(
      switchMap((buildList: ComputerBuildDraft) => _pcBuilderService.getVideoCardComponents(buildList.videoCardIds)),
      catchError(() => of([]))
    );
    this.powerSupplyList$ = this.draft$.pipe(
      switchMap((buildList: ComputerBuildDraft) => _pcBuilderService.getPowerSupplyComponents(buildList.powerSupplyIds)),
      catchError(() => of([]))
    );
  }

  public saveDraft(buildList: ComputerBuildDraft) {
    const currentUser = this._pcBuilderService.currentUser$.getValue()
    if (!currentUser) {
      alert("Must be logged in first");
      return;
    }
    this._pcBuilderService.createComputerBuild(buildList).subscribe(() => {
      this._router.navigate(["user-profile"]);
    });
  }

  public formCpuName(cpu: CpuComponent): string {
    const clockString = cpu.coreClock ? ` ${cpu.coreClock} GHz` : "";
    const coreCountString = cpu.coreCount ? ` ${cpu.coreCount}-Core` : "";
    return cpu.displayName + clockString + coreCountString + " Processor";
  }

  public formMotherboardName(motherboard: MotherboardComponent): string {
    return motherboard.displayName ?? "idk";
  }

  public formMemoryName(memory: MemoryComponent): string {
    return memory.displayName ?? "idk";
  }

  public formStorageName(storage: StorageComponent): string {
    return storage.displayName ?? "idk";
  }

  public formVideoCardName(videoCard: VideoCardComponent): string {
    return videoCard.displayName ?? "idk";
  }

  public formPowerSupplyName(powerSupply: PowerSupplyComponent): string {
    return powerSupply.displayName ?? "idk";
  }

  public formPriceString(price?: number): string {
    if (!price) {
      return ""
    }
    return `$${price}`
  }

  public updateDraftInfo(displayName: string, description: string) {
    this._store.dispatch(updateDraftInfo({displayName, description}))
  }
}
