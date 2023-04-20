import {OrgEvent} from "./orgEvent";
import {User} from "./user";

export interface Shift{
    id?: string,
    description?: string,
    headcount: number,
    starttime: Date,
    endtime: Date,
    orgEvent: OrgEvent,
    users?: User[],
}
