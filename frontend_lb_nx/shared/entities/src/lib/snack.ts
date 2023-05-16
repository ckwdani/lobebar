import {OrgEvent, ShiftType, User} from "@frontend-lb-nx/shared/entities";
import {SnackType} from "./snackType";

export interface Snack{
    id?: string,
    user?: User,
    snackType: SnackType,
    date: Date,

}