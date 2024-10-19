import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { UserProfile } from './transfers/user';
import { UserService } from './data/user/user.service';
import { Store } from '@ngrx/store';
import { AppState, userStateKey } from './data/app.state';
import { clearSessionUser, loadSessionUser, updateSessionUser } from './data/user/user.actions';
import { UserState } from './data/user/user.state';
import { produce } from 'immer';
import { loadPcBuilds } from './data/pc-build/pc-build.actions';

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
    this._store.dispatch(loadSessionUser());
    this._store.dispatch(loadPcBuilds())
    this._store.select(userStateKey).subscribe((state: UserState) => {
      this.user = state.currentUser;
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
          this._store.dispatch(updateSessionUser({ user }));
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
    const updatedUser: UserProfile = produce(this.user, (draft) => {
      draft.displayName = displayName;
    });
    this._userService.updateUserProfile(updatedUser)
      .subscribe((user: UserProfile | undefined) => {
        if (user) {
          this._store.dispatch(updateSessionUser({ user }));
        }
        this.isEditProfileFormOpen = false;
      });
  }

  public logOutUser() {
    this._userService.clearSessionUser()
      .subscribe(() => {
        this._store.dispatch(clearSessionUser());
      });
  }
}
