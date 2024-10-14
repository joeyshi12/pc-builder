import { Component } from '@angular/core';
import { UserProfile } from '../../transfers/user';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
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
              pcBuildService: PcBuildService,
              router: Router) {
    this.userProfile$ = _userService.currentUser$;
    const currentUser = this.userProfile$.getValue();
    if (!currentUser) {
      router.navigate(["/"]);
    }
    this.buildList$ = pcBuildService.getPcBuilds(undefined, currentUser?.username);
  }

  updateUserProfile(displayName: string, email: string): void {
    this._userService.updateUserProfile(displayName, email)
      .subscribe((_: UserProfile | undefined) => {
        this.isEditProfileFormOpen = false;
      })
  }
}
