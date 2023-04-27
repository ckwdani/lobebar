import { Action, createReducer, on } from '@ngrx/store';
import * as RegisterActions from './register.actions';

export const registerFeatureKey = 'register';

export interface RegisterState {
    isLoading: boolean;
    success: boolean;
    error?: number;
}

export const initialRegisterState: RegisterState = {
    isLoading: false,
    success: false,
};

export const registerReducer = createReducer(
    initialRegisterState,
    on(RegisterActions.register, state=>({...state, isLoading: true})),
        on(RegisterActions.registerSuccessfull, (state, {user}) => ({...state, user, isLoading: false, success: true})),
      on(RegisterActions.registerError, (state, {error}) => ({...state, error, success: false})),

);
