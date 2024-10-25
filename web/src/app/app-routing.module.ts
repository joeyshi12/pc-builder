import { NgModule } from '@angular/core';
import { RouterModule, Routes}  from '@angular/router';
import { BuildListingComponent } from "./ui/build-listing/build-listing.component";
import { ComponentListingComponent } from "./ui/component-listing/component-listing.component";
import { BuilderComponent } from "./ui/builder/builder.component";
import { PcBuildComponent } from './ui/pc-build/pc-build.component';

const routes: Routes = [
  {
    path: 'builds',
    component: BuildListingComponent
  },
  {
    path: 'builds/:id',
    component: PcBuildComponent
  },
  {
    path: 'components',
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
