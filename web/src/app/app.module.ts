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
import { PcBuildService } from './data/pc-build/pc-build.service';
import { PcComponentService } from './data/pc-component/pc-component.service';
import { UserService } from './data/user/user.service';
import { DialogComponent } from './ui/dialog/dialog.component';
import { pcBuildStateReducer } from './data/pc-build/pc-build.reducer';
import { userStateReducer } from './data/user/user.reducer';
import { pcBuildStateKey, userStateKey } from './data/app.state';
import { EffectsModule } from '@ngrx/effects';
import { PcBuildStateEffects } from './data/pc-build/pc-build.effects';
import { UserStateEffects } from './data/user/user.effects';
import { PcBuildComponent } from './ui/pc-build/pc-build.component';

@NgModule({
  declarations: [
    AppComponent,
    ComponentListingComponent,
    BuildListingComponent,
    PcBuildComponent,
    BuilderComponent,
    DialogComponent,
  ],
  bootstrap: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature(pcBuildStateKey, pcBuildStateReducer),
    StoreModule.forFeature(userStateKey, userStateReducer),
    EffectsModule.forRoot({}),
    EffectsModule.forFeature(PcBuildStateEffects),
    EffectsModule.forFeature(UserStateEffects)
  ],
  providers: [
    PcBuildService,
    PcComponentService,
    UserService,
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class AppModule { }
