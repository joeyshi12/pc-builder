import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentListingComponent } from './pages/component-listing/component-listing.component';
import { BuildListingComponent } from './pages/build-listing/build-listing.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { BuilderComponent } from './pages/builder/builder.component';
import {AgGridModule} from "ag-grid-angular";
import { StoreModule } from '@ngrx/store';
import * as ComputerBuildDraftReducer from './reducers/computer-build-draft.reducer';
import { PcBuilderService } from './services/pc-builder.service';

@NgModule({
  declarations: [
    AppComponent,
    ComponentListingComponent,
    BuildListingComponent,
    UserProfileComponent,
    BuilderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AgGridModule,
    StoreModule.forRoot({
      [ComputerBuildDraftReducer.stateName]: ComputerBuildDraftReducer.reducer
    })
  ],
  providers: [
    PcBuilderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
