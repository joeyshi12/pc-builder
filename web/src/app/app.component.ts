import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
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

  constructor(private _userService: UserService) {
    this.userProfile$ = this._userService.currentUser$;
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
        next: (userProfile: UserProfile) => {
          this._userService.setCurrentUser(userProfile);
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
    this._userService.updateUserProfile(displayName)
      .subscribe((_: UserProfile | undefined) => {
        this.isEditProfileFormOpen = false;
      })
  }

  public logOutUser() {
    this._userService.clearSessionUser();
  }
}
