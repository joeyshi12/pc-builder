import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { UserProfile } from './transfers/user';
import { UserService } from './data/user/user.service';
import { Store } from '@ngrx/store';
import { AppState } from './data/app.state';
import { clearSessionUser, loadSessionUser, setSessionUser, updateSessionUser } from './data/user/user.actions';
import { produce } from 'immer';
import { userSelector } from './data/user/user.selectors';
import { setNewPcBuild } from './data/pc-build/pc-build.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public user: UserProfile | undefined = undefined;
  public isLoginFormOpen: boolean = false;
  public isUserProfileMenuOpen: boolean = false;
  public isEditProfileFormOpen: boolean = false;
  public errorMessage?: string;

  @ViewChild("userProfileButton")
  private _userProfileButtonRef?: ElementRef;

  @ViewChild("userProfileMenu")
  private _userProfileMenuRef?: ElementRef;

  @HostListener("document:keydown.escape")
  public onEscapeDown(): void {
    this.isUserProfileMenuOpen = false;
  }

  @HostListener("document:mousedown", ["$event.target"])
  public onMouseDown(target: EventTarget): void {
    if (this.isUserProfileMenuOpen &&
        !this._userProfileButtonRef?.nativeElement.contains(target) &&
        !this._userProfileMenuRef?.nativeElement.contains(target)) {
      this.isUserProfileMenuOpen = false;
    }
  }

  constructor(private _store: Store<AppState>,
              private _userService: UserService) {
    if (localStorage.getItem("isLoggedIn") === "true") {
      this._store.dispatch(loadSessionUser());
    }
    this._store.select(userSelector).subscribe((user: UserProfile | undefined) => {
      this.user = user;
    });
  }

  public openLoginFormDialog(): void {
    this.errorMessage = undefined;
    this.isLoginFormOpen = true;
  }

  public openEditProfileFormDialog(): void {
    this.isEditProfileFormOpen = true;
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
        next: (user: UserProfile) => {
          this._store.dispatch(setSessionUser({ user }));
          this.isLoginFormOpen = false;
          this.isEditProfileFormOpen = false;
        },
        error: () => {
          this.errorMessage = "Failed to authenticate user";
        }
      });
  }

  public updateUserProfile(displayName: string): void {
    if (displayName.length === 0) {
      alert("Display name cannot be empty");
      return;
    }
    if (!this.user?.username) {
      alert("Not logged in");
      return;
    }
    const user: UserProfile = produce(this.user, (draft) => {
      draft.displayName = displayName;
    });
    this._store.dispatch(updateSessionUser({ user }));
    this.isEditProfileFormOpen = false;
  }

  public logOutUser() {
    this._store.dispatch(clearSessionUser());
    this._store.dispatch(setNewPcBuild());
  }
}
