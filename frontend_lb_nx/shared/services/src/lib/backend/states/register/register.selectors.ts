import {createAction, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromRegister from './register.reducer';

export const selectRegisterState = createFeatureSelector<fromRegister.RegisterState>(
  fromRegister.registerFeatureKey
);

export const selectSuccess = createSelector(
    selectRegisterState,
    (state: fromRegister.RegisterState)=>state.success
)

