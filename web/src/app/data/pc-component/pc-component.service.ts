import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, combineLatest, map, of } from "rxjs";
import { CpuComponent, MemoryComponent, MotherboardComponent, PowerSupplyComponent, StorageComponent, VideoCardComponent } from "../../transfers/pc_component";
import { PcBuild } from "../../transfers/pc_build";
import { PcComponents } from "./pc-component";

@Injectable({
  providedIn: 'root'
})
export class PcComponentService {
  constructor(private http: HttpClient) {
  }

  public getPcComponents(build: PcBuild): Observable<PcComponents> {
    const cpuComponents$ = build.cpuIds && build.cpuIds.length > 0
      ? this.getCpuComponents(build.cpuIds)
      : of<CpuComponent[]>([]);
    const motherboardComponents$ = build.motherboardIds && build.motherboardIds.length > 0
      ? this.getCpuComponents(build.motherboardIds)
      : of<MotherboardComponent[]>([]);
    const memoryComponents$ = build.memoryIds && build.memoryIds.length > 0
      ? this.getCpuComponents(build.memoryIds)
      : of<MemoryComponent[]>([]);
    const storageComponents$ = build.storageIds && build.storageIds.length > 0
      ? this.getCpuComponents(build.storageIds)
      : of<StorageComponent[]>([]);
    const videoCardComponents$ = build.videoCardIds && build.videoCardIds.length > 0
      ? this.getCpuComponents(build.videoCardIds)
      : of<VideoCardComponent[]>([]);
    const powerSupplyComponents$ = build.powerSupplyIds && build.powerSupplyIds.length > 0
      ? this.getCpuComponents(build.powerSupplyIds)
      : of<PowerSupplyComponent[]>([]);
    return combineLatest([
      cpuComponents$,
      motherboardComponents$,
      memoryComponents$,
      storageComponents$,
      videoCardComponents$,
      powerSupplyComponents$
    ]).pipe(
      map(([cpuList, motherboardList, memoryList, storageList, videoCardList, powerSupplyList]) => {
        return {cpuList, motherboardList, memoryList, storageList, videoCardList, powerSupplyList};
      })
    );
  }

  public getCpuComponents(ids?: string[]): Observable<CpuComponent[]> {
    return this.http.get<CpuComponent[]>(this._getComponentsUrl("cpu", ids));
  }

  public getMotherboardComponents(ids?: string[]): Observable<MotherboardComponent[]> {
    return this.http.get<MotherboardComponent[]>(this._getComponentsUrl("motherboards", ids));
  }

  public getMemoryComponents(ids?: string[]): Observable<MemoryComponent[]> {
    return this.http.get<MemoryComponent[]>(this._getComponentsUrl("memory", ids));
  }

  public getStorageComponents(ids?: string[]): Observable<StorageComponent[]> {
    return this.http.get<StorageComponent[]>(this._getComponentsUrl("storage", ids));
  }

  public getVideoCardComponents(ids?: string[]): Observable<VideoCardComponent[]> {
    return this.http.get<VideoCardComponent[]>(this._getComponentsUrl("video-cards", ids));
  }

  public getPowerSupplyComponents(ids?: string[]): Observable<PowerSupplyComponent[]> {
    return this.http.get<PowerSupplyComponent[]>(this._getComponentsUrl("power-supplies", ids));
  }

  private _getComponentsUrl(componentType: string, ids?: string[]): string {
    const uri: string = "/components/" + componentType;
    return ids ? uri + `?ids=${ids.join(",")}` : uri;
  }
}
