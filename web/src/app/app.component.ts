import { Component, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserProfile } from './transfers/user';
import { UserService } from './data/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public userProfile$: BehaviorSubject<UserProfile | undefined>;
  public isLoginFormOpen: boolean = false;
  public errorMessage?: string;

  @HostListener("document:keydown.escape", ["$event"])
  public onEscapeDown(event: KeyboardEvent): void {
    this.isLoginFormOpen = false;
  }

  constructor(private _userService: UserService) {
    this.userProfile$ = this._userService.currentUser$;
  }

  public openFormDialog() {
    this.errorMessage = undefined;
    this.isLoginFormOpen = true;
  }

  public authenticateUser(username: string, password: string) {
    if (username.length === 0) {
      this.errorMessage = "Missing email";
      return;
    }

    if (password.length === 0) {
      this.errorMessage = "Missing password";
      return;
    }

    this._userService.authenticateUser({ username, password })
      .subscribe({
        next: (userProfile: UserProfile) => {
          this._userService.setCurrentUser(userProfile);
          this.isLoginFormOpen = false;
        },
        error: () => {
          this.errorMessage = "Failed to authenticate user";
        }
      });
  }

  public signOutUser() {
    this._userService.clearSessionUser();
  }
}
