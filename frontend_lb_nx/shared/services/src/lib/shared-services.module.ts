import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromAuth from './backend/states/auth/auth.reducer';
import {StoreModule} from "@ngrx/store";

import {BaseCommunicatorService} from "./backend/common/base-communicator.service";
import {AuthService} from "./backend/entity-backend-services/auth.service";
import {AuthEffects} from "./backend/states/auth/auth.effects";
import {EffectsModule} from "@ngrx/effects";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import * as fromRegister from './backend/states/register/register.reducer';
import { RegisterEffects } from './backend/states/register/register.effects';
import {DefaultDataServiceConfig} from "@ngrx/data";
import {BACKENDPATHS} from "./backend/BACKENDPATHS";

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: BACKENDPATHS.baseApiUrl,
  timeout: 3000, // request timeout

}

@NgModule({
  imports: [
      CommonModule,
    HttpClientModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer),
      EffectsModule.forFeature([AuthEffects, RegisterEffects]),
      StoreModule.forFeature(fromRegister.registerFeatureKey, fromRegister.registerReducer)
  ],
  providers: [BaseCommunicatorService, AuthService, AuthEffects,{ provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig}],
})
export class SharedServicesModule {}


