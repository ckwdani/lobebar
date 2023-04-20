import {OrgEvent} from "./orgEvent";
import {User} from "./user";
import {ShiftType} from "./shiftType";

export interface Shift{
    id?: string,
    description?: string,
    headcount: number,
    starttime: Date,
    endtime: Date,
    orgEvent: OrgEvent,
    users?: User[],
    shiftType: ShiftType
}
