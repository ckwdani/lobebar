import {Shift} from "./shift";

export interface OrgEvent{
    id?: string,
    name: string,
    start: Date,
    end: Date,
    shifts?: Shift[],
}

export class OrgEventClass implements OrgEvent{
    id?: string="";
    name = "";
    start: Date= new Date();
    end: Date= new Date();
    shifts?: Shift[]= undefined;


    static getMissingPersons(event: OrgEvent): number {
       return event.shifts?.map((shift) => {
            const persons = shift.users?.length ?? 0;
            return  shift.headcount - persons;
        }).reduce((acc, missing) => acc + missing, 0) ?? 0;
    }


    static userShiftsCount(event: OrgEvent, userId: string): number {
        return event.shifts?.filter((shift) => shift.users?.map((u) => u.id).includes(userId)).length ?? 0;
    }


}
