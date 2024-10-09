import { Component } from '@angular/core';
import { UserProfile } from '../../transfers/user';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { PcBuilderService } from 'src/app/services/pc-builder.service';
import { PcBuild } from 'src/app/transfers/pc_build';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  public userProfile$: BehaviorSubject<UserProfile | null>;
  public isEditProfileFormOpen: boolean = false;
  public buildList$: Observable<PcBuild[]>;

  constructor(private _pcBuilderService: PcBuilderService,
              router: Router) {
    this.userProfile$ = _pcBuilderService.currentUser$;
    const currentUser = this.userProfile$.getValue();
    if (!currentUser) {
      router.navigate(["/"]);
    }
    this.buildList$ = _pcBuilderService.getPcBuilds(undefined, currentUser?.username);
  }

  updateUserProfile(displayName: string, email: string): void {
    this._pcBuilderService.updateUserProfile(displayName, email)
      .subscribe((_: UserProfile | null) => {
        this.isEditProfileFormOpen = false;
      })
  }
}
