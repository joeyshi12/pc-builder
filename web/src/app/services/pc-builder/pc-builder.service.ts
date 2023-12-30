import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import {
    ComputerBuild,
  ComputerBuildDraft,
  ComputerBuildList,
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
  public static USERNAME_KEY: string = "username";
  public currentUser$: BehaviorSubject<UserProfile | null> = new BehaviorSubject<UserProfile | null>(null);

  constructor(private http: HttpClient) {
    const userId: string | undefined = localStorage.getItem(PcBuilderService.USERNAME_KEY) || undefined;
    if (userId) {
      this.getSessionUser().subscribe({
        next: (userProfile: UserProfile) => {
          if (userProfile.email) {
            this.currentUser$.next(userProfile);
          }
        },
        error: () => {
          this.clearSessionUser();
        }
      });
    }
  }

  public authenticateUser(userProfile: UserProfile): Observable<UserProfile> {
    return this.http.post<UserProfile>('/session/authenticate', userProfile);
  }

  public setCurrentUser(userProfile: UserProfile): void {
    if (userProfile.email) {
      this.currentUser$.next(userProfile);
      localStorage.setItem(PcBuilderService.USERNAME_KEY, userProfile.email);
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

  public updateUserProfile(displayName: string, email: string): Observable<UserProfile | null> {
    const userProfile = this.currentUser$.getValue();
    if (!userProfile) {
      return this.currentUser$;
    }
    userProfile.displayName = displayName;
    userProfile.email = email;
    return this.http.put<UserProfile>(`/users/${userProfile.email}`, userProfile);
  }

  public getCpuComponents(ids?: string[]): Observable<CpuComponent[]> {
    if (ids?.length === 0) {
      return of([]);
    }
    const url = ids ? `/cpu?ids=${ids.join(",")}` : "/cpu";
    return this.http.get<CpuComponentList>(url)
      .pipe(map((cpuList: CpuComponentList) => cpuList?.cpuComponents ?? []));
  }

  public getMotherboardComponents(ids?: string[]): Observable<MotherboardComponent[]> {
    if (ids?.length === 0) {
      return of([]);
    }
    const url = ids ? `/motherboards?ids=${ids.join(",")}` : "/motherboards";
    return this.http.get<MotherboardComponentList>(url)
      .pipe(map((motherboardList: MotherboardComponentList) => motherboardList?.motherboardComponents ?? []));
  }

  public getMemoryComponents(ids?: string[]): Observable<MemoryComponent[]> {
    if (ids?.length === 0) {
      return of([]);
    }
    const url = ids ? `/memory?ids=${ids.join(",")}` : "/memory";
    return this.http.get<MemoryComponentList>(url)
      .pipe(map((memoryList: MemoryComponentList) => memoryList?.memoryComponents ?? []));
  }

  public getStorageComponents(ids?: string[]): Observable<StorageComponent[]> {
    if (ids?.length === 0) {
      return of([]);
    }
    const url = ids ? `/storage?ids=${ids.join(",")}` : "/storage";
    return this.http.get<StorageComponentList>(url)
      .pipe(map((storageList: StorageComponentList) => storageList?.storageComponents ?? []));
  }

  public getVideoCardComponents(ids?: string[]): Observable<VideoCardComponent[]> {
    if (ids?.length === 0) {
      return of([]);
    }
    const url = ids ? `/video-cards?ids=${ids.join(",")}` : "/video-cards";
    return this.http.get<VideoCardComponentList>(url)
      .pipe(map((videoCardList: VideoCardComponentList) => videoCardList?.videoCardComponents ?? []));
  }

  public getPowerSupplyComponents(ids?: string[]): Observable<PowerSupplyComponent[]> {
    if (ids?.length === 0) {
      return of([]);
    }
    const url = ids ? `/power-supplies?ids=${ids.join(",")}` : "/power-supplies";
    return this.http.get<PowerSupplyComponentList>(url)
      .pipe(map((powerSupplyList: PowerSupplyComponentList) => powerSupplyList?.powerSupplyComponents ?? []));
  }

  public createComputerBuild(draft: ComputerBuildDraft): Observable<ComputerBuild> {
    return this.http.put<ComputerBuild>("/builds", draft);
  }

  public getComputerBuilds(ids?: string[], username?: string): Observable<ComputerBuild[]> {
    if (ids?.length === 0) {
      return of([]);
    }
    const params = [];
    if (ids && ids.length > 0) {
      params.push(`ids=${ids.join(",")}`);
    }
    if (username) {
      params.push(`user=${username}`);
    }
    const url = params.length > 0 ? `/builds?` + params.join("&") : "/builds";
    return this.http.get<ComputerBuildList>(url)
      .pipe(map((buildList: ComputerBuildList) => buildList.computerBuilds ?? []));
  }
}
