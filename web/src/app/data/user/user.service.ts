import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserProfile } from "../../transfers/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  public updateUserProfile(userProfile: UserProfile): Observable<UserProfile | undefined> {
    return this.http.put<UserProfile>("/users", userProfile);
  }

  public authenticateUser(userProfile: UserProfile): Observable<UserProfile> {
    return this.http.post<UserProfile>("/users/authenticate", userProfile);
  }

  public getSessionUser(): Observable<UserProfile> {
    return this.http.get<UserProfile>("/users/session-user");
  }

  public clearSessionUser(): Observable<void> {
    return this.http.delete<void>("/users/session-user");
  }
}
