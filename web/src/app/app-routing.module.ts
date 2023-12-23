import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BuildListingComponent} from "./pages/build-listing/build-listing.component";
import {ComponentListingComponent} from "./pages/component-listing/component-listing.component";
import {UserProfileComponent} from "./pages/user-profile/user-profile.component";
import {BuilderComponent} from "./pages/builder/builder.component";

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
