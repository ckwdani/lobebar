import {Shift} from "./shift";
import {DateAdapter} from "@angular/material/core";

export interface OrgEvent{
    id?: string,
    name: string,
    start: Date,
    end: Date,
    shifts: Shift[],
}
