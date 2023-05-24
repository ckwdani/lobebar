import {OrgEvent, ShiftType, User} from "@frontend-lb-nx/shared/entities";

export interface SnackType{
    id?: string,
    name?: string,
    value?: number,
    showInBooking: boolean,
}
