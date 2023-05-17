import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as fromOwnUser from "./own-user.reducer";

export const selectOwnUserState = createFeatureSelector<fromOwnUser.OwnUserState>(
    fromOwnUser.ownUserFeatureKey
);

export const selectOwnUser = createSelector(
    selectOwnUserState,
    (state: fromOwnUser.OwnUserState)=>state.ownUser
);

export const selectAchievements = createSelector(
    selectOwnUserState,
    (state: fromOwnUser.OwnUserState) => state.ownUser?.achievements
);

export const selectSelectedAchievment = createSelector(
    selectOwnUserState,
    (state: fromOwnUser.OwnUserState) => state.ownUser?.selectedAchievement
);