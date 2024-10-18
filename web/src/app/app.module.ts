import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentListingComponent } from './ui/component-listing/component-listing.component';
import { BuildListingComponent } from './ui/build-listing/build-listing.component';
import { BuilderComponent } from './ui/builder/builder.component';
import { AgGridModule } from "ag-grid-angular";
import { StoreModule } from '@ngrx/store';
import * as PcBuildReducer from './data/pc-build/pc-build.reducer';
import * as UserReducer from './data/user/user.reducer';
import { PcBuildService } from './data/pc-build/pc-build.service';
import { PcComponentService } from './data/pc-component/pc-component.service';
import { UserService } from './data/user/user.service';
import { DialogComponent } from './ui/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ComponentListingComponent,
    BuildListingComponent,
    BuilderComponent,
    DialogComponent
  ],
  bootstrap: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature(PcBuildReducer.stateName, PcBuildReducer.pcBuildStateReducer),
    StoreModule.forFeature(UserReducer.stateName, UserReducer.reducer)
  ],
  providers: [
    PcBuildService,
    PcComponentService,
    UserService,
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class AppModule { }
