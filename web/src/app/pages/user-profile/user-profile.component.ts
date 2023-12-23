import { Component } from '@angular/core';
import { PcBuilderService } from '../../services/pc-builder/pc-builder.service';
import { UserProfile } from '../../models/pc-builder';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  public userProfile$: BehaviorSubject<UserProfile>;
  public isEditProfileFormOpen: boolean = false;

  constructor(private _pcBuilderService: PcBuilderService,
              router: Router) {
    this.userProfile$ = _pcBuilderService.currentUser$;
    const currentUser = this.userProfile$.getValue();
    if (!currentUser.username) {
      router.navigate(["/"]);
    }
  }

  updateUserProfile(displayName: string, email: string): void {
    this._pcBuilderService.updateUserProfile(displayName, email)
      .subscribe((userProfile: UserProfile) => {
        this.isEditProfileFormOpen = false;
      })
  }
}
