import {Shift} from "./shift";

export interface OrgEvent{
    id?: string,
    name: string,
    start: Date,
    end: Date,
    shifts: Shift[],
}
