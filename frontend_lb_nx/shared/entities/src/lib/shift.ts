import {OrgEvent} from "./orgEvent";
import {User} from "./user";
import {ShiftType} from "./shiftType";

export interface Shift{
    id?: string,
    description?: string,
    headcount: number,
    starttime: Date,
    endtime: Date,
    orgEvent?: OrgEvent,
    users?: User[],
    type: ShiftType
}

export function insertShiftWithDate(shifts: Shift[],shift: Shift): Shift[] {
    const cloneShifts = [...shifts]
    const index = cloneShifts.findIndex(item => item.starttime > shift.starttime);

    if (index === -1 ||index >= cloneShifts.length) {
        // If the entity's start date is the latest, add it at the end
        cloneShifts.push(shift);
    } else {
        // Insert the entity at the appropriate index
        cloneShifts.splice(index, 0, shift);
    }

    return cloneShifts;
}

/*export class Shift{
    id?: string="";
    description?: string="";
    headcount =0;
    starttime: Date=new Date();
    endtime: Date= new Date();
    orgEvent: OrgEvent;
    users?: User[]=[];
    shiftType: ShiftType;
}

 */

