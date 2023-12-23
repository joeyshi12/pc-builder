import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {
    ComputerBuild,
  CpuComponent,
  CpuComponentList, MemoryComponent, MemoryComponentList,
  MotherboardComponent,
  MotherboardComponentList, PowerSupplyComponent, PowerSupplyComponentList,
  StorageComponent, StorageComponentList, UserProfile, VideoCardComponent, VideoCardComponentList
} from "../../models/pc-builder";

@Injectable({
  providedIn: 'root'
})
export class PcBuilderService {
  public static BUILD_KEY: string = "build";
  public static USERNAME_KEY: string = "username";

  public currentBuild$: BehaviorSubject<ComputerBuild> = new BehaviorSubject({});
  public currentUser$: BehaviorSubject<UserProfile> = new BehaviorSubject({});

  private _selectedCpuIds: string[];
  private _selectedMotherboardIds: string[];
  private _selectedMemoryIds: string[];
  private _selectedStorageIds: string[];
  private _selectedVideoCardIds: string[];
  private _selectedPowerSupplyIds: string[];

  constructor(private http: HttpClient) {
    const build: ComputerBuild | undefined = JSON.parse(localStorage.getItem(PcBuilderService.BUILD_KEY) || "null");
    if (build) {
      this.currentBuild$.next(build);
    }
    const userId: string | undefined = localStorage.getItem(PcBuilderService.USERNAME_KEY) || undefined;
    if (userId) {
      this.getSessionUser().subscribe({
        next: (userProfile: UserProfile) => {
          if (userProfile.username) {
            this.currentUser$.next(userProfile);
          }
        },
        error: () => {
          this.clearSessionUser();
        }
      });
    }

    // TODO: move hard coded values elsewhere
    this._selectedCpuIds = this._toStringArray(localStorage.getItem("cpu"));
    this._selectedMotherboardIds = this._toStringArray(localStorage.getItem("motherboard"));
    this._selectedMemoryIds = this._toStringArray(localStorage.getItem("memory"));
    this._selectedStorageIds = this._toStringArray(localStorage.getItem("storage"));
    this._selectedVideoCardIds = this._toStringArray(localStorage.getItem("videoCard"));
    this._selectedPowerSupplyIds = this._toStringArray(localStorage.getItem("powerSupply"));
  }

  public get selectedCpuIds() {
    return this._selectedCpuIds;
  }

  public get selectedMotherboardIds() {
    return this._selectedMotherboardIds;
  }

  public get selectedMemoryIds() {
    return this._selectedMemoryIds;
  }

  public get selectedStorageIds() {
    return this._selectedStorageIds;
  }

  public get selectedVideoCardIds() {
    return this._selectedVideoCardIds;
  }

  public get selectedPowerSupplyIds() {
    return this._selectedPowerSupplyIds;
  }

  public set selectedCpuIds(ids: string[]) {
    localStorage.setItem("cpu", JSON.stringify(ids));
    this._selectedCpuIds = ids;
  }

  public set selectedMotherboardIds(ids: string[]) {
    localStorage.setItem("motherboard", JSON.stringify(ids));
    this._selectedMotherboardIds = ids;
  }

  public set selectedMemoryIds(ids: string[]) {
    localStorage.setItem("memory", JSON.stringify(ids));
    this._selectedMemoryIds = ids;
  }

  public set selectedStorageIds(ids: string[]) {
    localStorage.setItem("storage", JSON.stringify(ids));
    this._selectedStorageIds = ids;
  }

  public set selectedVideoCardIds(ids: string[]) {
    localStorage.setItem("videoCard", JSON.stringify(ids));
    this._selectedVideoCardIds = ids;
  }

  public set selectedPowerSupplyIds(ids: string[]) {
    localStorage.setItem("powerSupply", JSON.stringify(ids));
    this._selectedPowerSupplyIds = ids;
  }

  public authenticateUser(userProfile: UserProfile): Observable<UserProfile> {
    return this.http.post<UserProfile>('/session/authenticate', userProfile);
  }

  public setCurrentUser(userProfile: UserProfile): void {
    if (userProfile.username) {
      this.currentUser$.next(userProfile);
      localStorage.setItem(PcBuilderService.USERNAME_KEY, userProfile.username);
    }
  }

  public getSessionUser(): Observable<UserProfile> {
    const headers = new HttpHeaders().set("credentials", "include");
    return this.http.get<UserProfile>('/session/user', { headers: headers });
  }

  public clearSessionUser(): Observable<void> {
    localStorage.removeItem(PcBuilderService.USERNAME_KEY);
    const headers = new HttpHeaders().set("credentials", "include");
    return this.http.delete<void>('/session/user', { headers: headers });
  }

  public updateUserProfile(displayName: string, email: string): Observable<UserProfile> {
    const userProfile = this.currentUser$.getValue();
    userProfile.displayName = displayName;
    userProfile.email = email;
    return this.http.put<UserProfile>(`/users/${userProfile.username}`, userProfile);
  }

  public getCpuComponents(ids?: string[]): Observable<CpuComponent[]> {
    const url = ids ? `/cpu?ids=${ids.join(",")}` : "/cpu";
    return this.http.get<CpuComponentList>(url)
      .pipe(map((cpuList: CpuComponentList) => cpuList?.cpuComponents ?? []));
  }

  public getMotherboardComponents(ids?: string[]): Observable<MotherboardComponent[]> {
    const url = ids ? `/motherboards?ids=${ids.join(",")}` : "/motherboards";
    return this.http.get<MotherboardComponentList>(url)
      .pipe(map((motherboardList: MotherboardComponentList) => motherboardList?.motherboardComponents ?? []));
  }

  public getMemoryComponents(ids?: string[]): Observable<MemoryComponent[]> {
    const url = ids ? `/memory?ids=${ids.join(",")}` : "/memory";
    return this.http.get<MemoryComponentList>(url)
      .pipe(map((memoryList: MemoryComponentList) => memoryList?.memoryComponents ?? []));
  }

  public getStorageComponents(ids?: string[]): Observable<StorageComponent[]> {
    const url = ids ? `/storage?ids=${ids.join(",")}` : "/storage";
    return this.http.get<StorageComponentList>(url)
      .pipe(map((storageList: StorageComponentList) => storageList?.storageComponents ?? []));
  }

  public getVideoCardComponents(ids?: string[]): Observable<VideoCardComponent[]> {
    const url = ids ? `/video-cards?ids=${ids.join(",")}` : "/video-cards";
    return this.http.get<VideoCardComponentList>(url)
      .pipe(map((videoCardList: VideoCardComponentList) => videoCardList?.videoCardComponents ?? []));
  }

  public getPowerSupplyComponents(ids?: string[]): Observable<PowerSupplyComponent[]> {
    const url = ids ? `/power-supplies?ids=${ids.join(",")}` : "/power-supplies";
    return this.http.get<PowerSupplyComponentList>(url)
      .pipe(map((powerSupplyList: PowerSupplyComponentList) => powerSupplyList?.powerSupplyComponents ?? []));
  }

  private _toStringArray(value: string | null): string[] {
    if (!value) {
      return [];
    }
    try {
      const parsedValue = JSON.parse(value);
      if (!Array.isArray(parsedValue)) {
        return [];
      }
      return parsedValue;
    } catch {
      return [];
    }
  }
}
