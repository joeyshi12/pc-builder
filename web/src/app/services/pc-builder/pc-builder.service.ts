import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import {
  ComputerBuildDto,
  ComputerBuildDraftDto,
  ComputerBuildListDto,
  CpuComponentDto,
  CpuComponentListDto, MemoryComponentDto, MemoryComponentListDto,
  MotherboardComponentDto,
  MotherboardComponentListDto, PowerSupplyComponentDto, PowerSupplyComponentListDto,
  StorageComponentDto, StorageComponentListDto, UserProfileDto, VideoCardComponentDto, VideoCardComponentListDto
} from "../../models/pc-builder";

@Injectable({
  providedIn: 'root'
})
export class PcBuilderService {
  public static USERNAME_KEY: string = "username";
  public currentUser$: BehaviorSubject<UserProfileDto | null> = new BehaviorSubject<UserProfileDto | null>(null);

  constructor(private http: HttpClient) {
    const userId: string | undefined = localStorage.getItem(PcBuilderService.USERNAME_KEY) || undefined;
    if (userId) {
      this.getSessionUser().subscribe({
        next: (userProfile: UserProfileDto) => {
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

  public authenticateUser(userProfile: UserProfileDto): Observable<UserProfileDto> {
    return this.http.post<UserProfileDto>('/session/authenticate', userProfile);
  }

  public setCurrentUser(userProfile: UserProfileDto): void {
    if (userProfile.email) {
      this.currentUser$.next(userProfile);
      localStorage.setItem(PcBuilderService.USERNAME_KEY, userProfile.email);
    }
  }

  public getSessionUser(): Observable<UserProfileDto> {
    const headers = new HttpHeaders().set("credentials", "include");
    return this.http.get<UserProfileDto>('/session/user', { headers: headers });
  }

  public clearSessionUser(): Observable<void> {
    localStorage.removeItem(PcBuilderService.USERNAME_KEY);
    const headers = new HttpHeaders().set("credentials", "include");
    return this.http.delete<void>('/session/user', { headers: headers });
  }

  public updateUserProfile(displayName: string, email: string): Observable<UserProfileDto | null> {
    const userProfile = this.currentUser$.getValue();
    if (!userProfile) {
      return this.currentUser$;
    }
    userProfile.displayName = displayName;
    userProfile.email = email;
    return this.http.put<UserProfileDto>(`/users/${userProfile.email}`, userProfile);
  }

  public getCpuComponents(ids?: string[]): Observable<CpuComponentDto[]> {
    if (ids?.length === 0) {
      return of([]);
    }
    const url = ids ? `/cpu?ids=${ids.join(",")}` : "/cpu";
    return this.http.get<CpuComponentListDto>(url)
      .pipe(map((cpuList: CpuComponentListDto) => cpuList?.cpuComponents ?? []));
  }

  public getMotherboardComponents(ids?: string[]): Observable<MotherboardComponentDto[]> {
    if (ids?.length === 0) {
      return of([]);
    }
    const url = ids ? `/motherboards?ids=${ids.join(",")}` : "/motherboards";
    return this.http.get<MotherboardComponentListDto>(url)
      .pipe(map((motherboardList: MotherboardComponentListDto) => motherboardList?.motherboardComponents ?? []));
  }

  public getMemoryComponents(ids?: string[]): Observable<MemoryComponentDto[]> {
    if (ids?.length === 0) {
      return of([]);
    }
    const url = ids ? `/memory?ids=${ids.join(",")}` : "/memory";
    return this.http.get<MemoryComponentListDto>(url)
      .pipe(map((memoryList: MemoryComponentListDto) => memoryList?.memoryComponents ?? []));
  }

  public getStorageComponents(ids?: string[]): Observable<StorageComponentDto[]> {
    if (ids?.length === 0) {
      return of([]);
    }
    const url = ids ? `/storage?ids=${ids.join(",")}` : "/storage";
    return this.http.get<StorageComponentListDto>(url)
      .pipe(map((storageList: StorageComponentListDto) => storageList?.storageComponents ?? []));
  }

  public getVideoCardComponents(ids?: string[]): Observable<VideoCardComponentDto[]> {
    if (ids?.length === 0) {
      return of([]);
    }
    const url = ids ? `/video-cards?ids=${ids.join(",")}` : "/video-cards";
    return this.http.get<VideoCardComponentListDto>(url)
      .pipe(map((videoCardList: VideoCardComponentListDto) => videoCardList?.videoCardComponents ?? []));
  }

  public getPowerSupplyComponents(ids?: string[]): Observable<PowerSupplyComponentDto[]> {
    if (ids?.length === 0) {
      return of([]);
    }
    const url = ids ? `/power-supplies?ids=${ids.join(",")}` : "/power-supplies";
    return this.http.get<PowerSupplyComponentListDto>(url)
      .pipe(map((powerSupplyList: PowerSupplyComponentListDto) => powerSupplyList?.powerSupplyComponents ?? []));
  }

  public createComputerBuild(draft: ComputerBuildDraftDto): Observable<ComputerBuildDto> {
    return this.http.put<ComputerBuildDto>("/builds", draft);
  }

  public getComputerBuilds(ids?: string[], username?: string): Observable<ComputerBuildDto[]> {
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
    return this.http.get<ComputerBuildListDto>(url)
      .pipe(map((buildList: ComputerBuildListDto) => buildList.computerBuilds ?? []));
  }
}
