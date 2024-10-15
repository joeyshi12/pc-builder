import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { UserProfile } from "../../transfers/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUser$: BehaviorSubject<UserProfile | undefined> = new BehaviorSubject<UserProfile | undefined>(undefined);

  constructor(private http: HttpClient) {
    const userId: string | null = localStorage.getItem("username");
    if (userId) {
      this.getSessionUser().subscribe({
        next: (userProfile: UserProfile) => {
          this.currentUser$.next(userProfile);
        },
        error: () => {
          this.clearSessionUser();
        }
      });
    }
  }

  public authenticateUser(userProfile: UserProfile): Observable<UserProfile> {
    return this.http.post<UserProfile>("/users/authenticate", userProfile);
  }

  public setCurrentUser(userProfile: UserProfile): void {
    this.currentUser$.next(userProfile);
    localStorage.setItem("username", userProfile.username!);
  }

  public getSessionUser(): Observable<UserProfile> {
    return this.http.get<UserProfile>("/users/session-user");
  }

  public clearSessionUser(): Observable<void> {
    localStorage.removeItem("username");
    this.currentUser$.next(undefined);
    return this.http.delete<void>("/users/session-user");
  }

  public updateUserProfile(displayName: string, username: string): Observable<UserProfile | undefined> {
    const userProfile = this.currentUser$.getValue();
    if (!userProfile) {
      return this.currentUser$;
    }
    userProfile.displayName = displayName;
    userProfile.username = username;
    return this.http.put<UserProfile>("/users", userProfile);
  }
}
