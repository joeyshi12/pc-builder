import { NgModule } from '@angular/core';
import { RouterModule, Routes}  from '@angular/router';
import { BuildListingComponent } from "./ui/build-listing/build-listing.component";
import { ComponentListingComponent } from "./ui/component-listing/component-listing.component";
import { BuilderComponent } from "./ui/builder/builder.component";

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
