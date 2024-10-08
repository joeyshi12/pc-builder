import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PcBuild, PcBuildDraft } from "../transfers/pc_build";
import {
  CpuComponent,
  MemoryComponent,
  MotherboardComponent,
  PowerSupplyComponent,
  StorageComponent, VideoCardComponent
} from "../transfers/pc_component";
import { UserProfile } from '../transfers/user';

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
    return this.http.post<UserProfile>('/users/authenticate', userProfile);
  }

  public setCurrentUser(userProfile: UserProfile): void {
    if (userProfile.email) {
      this.currentUser$.next(userProfile);
      localStorage.setItem(PcBuilderService.USERNAME_KEY, userProfile.email);
    }
  }

  public getSessionUser(): Observable<UserProfile> {
    const headers = new HttpHeaders().set("credentials", "include");
    return this.http.get<UserProfile>('/users/session-user', { headers: headers });
  }

  public clearSessionUser(): Observable<void> {
    localStorage.removeItem(PcBuilderService.USERNAME_KEY);
    const headers = new HttpHeaders().set("credentials", "include");
    return this.http.delete<void>('/users/session-user', { headers: headers });
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
    const url = ids ? `/components/cpu?ids=${ids.join(",")}` : "/components/cpu";
    return this.http.get<CpuComponent[]>(url);
  }

  public getMotherboardComponents(ids?: string[]): Observable<MotherboardComponent[]> {
    if (ids?.length === 0) {
      return of([]);
    }
    const url = ids ? `/components/motherboards?ids=${ids.join(",")}` : "/components/motherboards";
    return this.http.get<MotherboardComponent[]>(url);
  }

  public getMemoryComponents(ids?: string[]): Observable<MemoryComponent[]> {
    if (ids?.length === 0) {
      return of([]);
    }
    const url = ids ? `/components/memory?ids=${ids.join(",")}` : "/components/memory";
    return this.http.get<MemoryComponent[]>(url);
  }

  public getStorageComponents(ids?: string[]): Observable<StorageComponent[]> {
    if (ids?.length === 0) {
      return of([]);
    }
    const url = ids ? `/components/storage?ids=${ids.join(",")}` : "/components/storage";
    return this.http.get<StorageComponent[]>(url);
  }

  public getVideoCardComponents(ids?: string[]): Observable<VideoCardComponent[]> {
    if (ids?.length === 0) {
      return of([]);
    }
    const url = ids ? `/components/video-cards?ids=${ids.join(",")}` : "/components/video-cards";
    return this.http.get<VideoCardComponent[]>(url);
  }

  public getPowerSupplyComponents(ids?: string[]): Observable<PowerSupplyComponent[]> {
    if (ids?.length === 0) {
      return of([]);
    }
    const url = ids ? `/components/power-supplies?ids=${ids.join(",")}` : "/components/power-supplies";
    return this.http.get<PowerSupplyComponent[]>(url);
  }

  public createComputerBuild(draft: PcBuildDraft): Observable<PcBuild> {
    return this.http.put<PcBuild>("/builds", draft);
  }

  public getPcBuilds(ids?: string[], username?: string): Observable<PcBuild[]> {
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
    return this.http.get<PcBuild[]>(url);
  }
}
