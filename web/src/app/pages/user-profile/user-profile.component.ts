import { Component } from '@angular/core';
import { PcBuilderService } from '../../services/pc-builder/pc-builder.service';
import { ComputerBuild, UserProfile } from '../../models/pc-builder';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  public userProfile$: BehaviorSubject<UserProfile | null>;
  public isEditProfileFormOpen: boolean = false;
  public buildList$: Observable<ComputerBuild[]>;

  constructor(private _pcBuilderService: PcBuilderService,
              router: Router) {
    this.userProfile$ = _pcBuilderService.currentUser$;
    const currentUser = this.userProfile$.getValue();
    if (!currentUser) {
      router.navigate(["/"]);
    }
    this.buildList$ = _pcBuilderService.getComputerBuilds(undefined, currentUser?.username);
  }

  updateUserProfile(displayName: string, email: string): void {
    this._pcBuilderService.updateUserProfile(displayName, email)
      .subscribe((_: UserProfile | null) => {
        this.isEditProfileFormOpen = false;
      })
  }
}
