import { Component } from '@angular/core';
import { UserProfile } from '../../transfers/user';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { PcBuild } from 'src/app/transfers/pc_build';
import { PcBuildService } from 'src/app/pc-build/pc-build.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  public userProfile$: BehaviorSubject<UserProfile | undefined>;
  public isEditProfileFormOpen: boolean = false;
  public buildList$: Observable<PcBuild[]>;

  constructor(private _userService: UserService,
              pcBuildService: PcBuildService) {
    this.userProfile$ = _userService.currentUser$;
    this.buildList$ = this.userProfile$.pipe(
      switchMap(userProfile => pcBuildService.getPcBuilds(undefined, userProfile?.username))
    );
  }

  updateUserProfile(displayName: string, email: string): void {
    this._userService.updateUserProfile(displayName, email)
      .subscribe((_: UserProfile | undefined) => {
        this.isEditProfileFormOpen = false;
      })
  }
}
