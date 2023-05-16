import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import * as fromAuth from './backend/states/auth/auth.reducer';
import {StoreModule} from "@ngrx/store";

import {BaseCommunicatorService} from "./backend/common/base-communicator.service";
import {AuthService} from "./backend/entity-backend-services/auth.service";
import {AuthEffects} from "./backend/states/auth/auth.effects";
import {EffectsModule} from "@ngrx/effects";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import * as fromRegister from './backend/states/register/register.reducer';
import { RegisterEffects } from './backend/states/register/register.effects';
import * as fromOrgEvent from './backend/states/orgEvent/orgEvent.reducer';

import {DefaultDataServiceConfig} from "@ngrx/data";
import {BACKENDPATHS} from "./backend/BACKENDPATHS";
import * as fromShift from './backend/states/shift/shift.reducer';
import * as fromShiftType from './backend/states/shift-types/shift-type.reducer';
import { ShiftTypeEffects } from './backend/states/shift-types/shift-type.effects';
import {OrgEventEffects} from "./backend/states/orgEvent/orgEvent.effects";
import {ShiftEffects} from "./backend/states/shift/shift.effects";
import * as fromOwnUser from './backend/states/own-user/own-user.reducer';



@NgModule({
  imports: [
      CommonModule,
    HttpClientModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer),
      EffectsModule.forFeature([AuthEffects, RegisterEffects, ShiftTypeEffects, OrgEventEffects, ShiftEffects]),
      StoreModule.forFeature(fromRegister.registerFeatureKey, fromRegister.registerReducer),
      StoreModule.forFeature(fromShiftType.shiftTypeFeatureKey, fromShiftType.reducer),
    StoreModule.forFeature(fromOrgEvent.orgEventFeatureKey, fromOrgEvent.reducer),
      StoreModule.forFeature(fromShift.shiftFeatureKey, fromShift.reducer),
      StoreModule.forFeature(fromOwnUser.ownUserFeatureKey, fromOwnUser.reducer),
  ],
  providers: [BaseCommunicatorService, AuthService, AuthEffects, DatePipe],
})
export class SharedServicesModule {}


