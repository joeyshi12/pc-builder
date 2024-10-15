import { Component, HostListener } from '@angular/core';
import { UserProfile } from '../../transfers/user';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { PcBuild } from 'src/app/transfers/pc_build';
import { PcBuildService } from 'src/app/data/pc-build/pc-build.service';
import { UserService } from 'src/app/data/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  public userProfile$: BehaviorSubject<UserProfile | undefined>;
  public isEditProfileFormOpen: boolean = false;
  public buildList$: Observable<PcBuild[]>;

  @HostListener("document:keydown.escape", ["$event"])
  public onEscapeDown(event: KeyboardEvent): void {
    this.isEditProfileFormOpen = false;
  }

  constructor(private _userService: UserService,
              private _router: Router,
              pcBuildService: PcBuildService) {
    this.userProfile$ = _userService.currentUser$;
    this.buildList$ = this.userProfile$.pipe(
      switchMap(userProfile => pcBuildService.getPcBuilds(undefined, userProfile?.username))
    );
  }

  public signOut(): void {
    this._userService.clearSessionUser().subscribe(() => {
      this._router.navigate(["/"]);
    });
  }

  public updateUserProfile(displayName: string, email: string): void {
    this._userService.updateUserProfile(displayName, email)
      .subscribe((_: UserProfile | undefined) => {
        this.isEditProfileFormOpen = false;
      })
  }
}
