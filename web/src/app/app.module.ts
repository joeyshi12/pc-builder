import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentListingComponent } from './components/component-listing/component-listing.component';
import { BuildListingComponent } from './components/build-listing/build-listing.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { BuilderComponent } from './components/builder/builder.component';
import {AgGridModule} from "ag-grid-angular";
import { StoreModule } from '@ngrx/store';
import * as PcBuildReducer from './pc-build/pc-build.reducer';
import { PcBuildService } from './pc-build/pc-build.service';
import { PcComponentService } from './pc-component/pc-component.service';
import { UserService } from './user/user.service';

@NgModule({ declarations: [
        AppComponent,
        ComponentListingComponent,
        BuildListingComponent,
        UserProfileComponent,
        BuilderComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        AgGridModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature(PcBuildReducer.stateName, PcBuildReducer.reducer)], providers: [
        PcBuildService,
        PcComponentService,
        UserService,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
