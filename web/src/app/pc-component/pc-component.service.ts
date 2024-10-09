import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, combineLatest, map } from "rxjs";
import { CpuComponent, MemoryComponent, MotherboardComponent, PowerSupplyComponent, StorageComponent, VideoCardComponent } from "../transfers/pc_component";
import { PcBuild } from "../transfers/pc_build";
import { PcComponents } from "./pc-component";

@Injectable({
  providedIn: 'root'
})
export class PcComponentService {
  constructor(private http: HttpClient) {
  }

  public getPcComponents(build: PcBuild): Observable<PcComponents> {
    return combineLatest([
      this.getCpuComponents(build.cpuIds),
      this.getMotherboardComponents(build.motherboardIds),
      this.getMemoryComponents(build.memoryIds),
      this.getStorageComponents(build.storageIds),
      this.getVideoCardComponents(build.videoCardIds),
      this.getPowerSupplyComponents(build.powerSupplyIds)
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
