import { Component } from '@angular/core';
<<<<<<< HEAD
import { UserProfile } from '../../transfers/user';
=======
import { PcBuilderService } from '../../services/pc-builder/pc-builder.service';
import { ComputerBuildDto, UserProfileDto } from '../../models/pc-builder';
>>>>>>> origin/main
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
  public userProfile$: BehaviorSubject<UserProfileDto | null>;
  public isEditProfileFormOpen: boolean = false;
<<<<<<< HEAD
  public buildList$: Observable<PcBuild[]>;
=======
  public buildList$: Observable<ComputerBuildDto[]>;
>>>>>>> origin/main

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
      .subscribe((_: UserProfileDto | null) => {
        this.isEditProfileFormOpen = false;
      })
  }
}
