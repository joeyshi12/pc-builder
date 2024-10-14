import { NgModule } from '@angular/core';
import { RouterModule, Routes}  from '@angular/router';
import { BuildListingComponent } from "./components/build-listing/build-listing.component";
import { ComponentListingComponent } from "./components/component-listing/component-listing.component";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { BuilderComponent } from "./components/builder/builder.component";

const routes: Routes = [
  {
    path: '',
    component: BuildListingComponent
  },
  {
    path: 'component-listing',
    component: ComponentListingComponent
  },
  {
    path: 'user-profile',
    component: UserProfileComponent
  },
  {
    path: 'builder',
    component: BuilderComponent
  },
  {
    path: '**',
    component: BuildListingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
