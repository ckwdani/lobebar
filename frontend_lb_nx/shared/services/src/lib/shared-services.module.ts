import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromAuth from './backend/states/auth/auth.reducer';
import {StoreModule} from "@ngrx/store";

import {BaseCommunicatorService} from "./backend/common/base-communicator.service";
import {AuthService} from "./backend/entity-backend-services/auth.service";
import {AuthEffects} from "./backend/states/auth/auth.effects";
import {EffectsModule} from "@ngrx/effects";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
      CommonModule,
    HttpClientModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer),
      EffectsModule.forFeature([AuthEffects])
  ],
  providers: [BaseCommunicatorService, AuthService, AuthEffects,{ provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig}],
})
export class SharedServicesModule {}


