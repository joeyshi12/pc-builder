import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserProfile } from './transfers/user';
import { PcBuilderService } from './services/pc-builder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public userProfile$: BehaviorSubject<UserProfile | null>;
  public isLoginFormOpen: boolean = false;
  public errorMessage?: string;

  constructor(private _pcBuilderService: PcBuilderService) {
    this.userProfile$ = this._pcBuilderService.currentUser$;
  }

  public openFormDialog() {
    this.errorMessage = undefined;
    this.isLoginFormOpen = true;
  }

  public authenticateUser(email: string, password: string) {
    if (email.length === 0) {
      this.errorMessage = "Missing email";
      return;
    }

    if (password.length === 0) {
      this.errorMessage = "Missing password";
      return;
    }

    this._pcBuilderService.authenticateUser({ email, password })
      .subscribe({
        next: (userProfile: UserProfile) => {
          this._pcBuilderService.setCurrentUser(userProfile);
          this.isLoginFormOpen = false;
        },
        error: () => {
          this.errorMessage = "Failed to authenticate user";
        }
      });
  }

  public signOutUser() {
    this._pcBuilderService.clearSessionUser();
  }
}
