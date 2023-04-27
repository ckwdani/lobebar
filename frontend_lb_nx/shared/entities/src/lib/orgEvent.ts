import {Shift} from "./shift";
import {DateAdapter} from "@angular/material/core";

export interface OrgEvent{
    id?: string,
    name: string,
    start: Date,
    end: Date,
    shifts: Shift[],
}

export class OrgEventClass implements OrgEvent{
    id?: string="";
    name = "";
    start: Date= new Date();
    end: Date= new Date();
    shifts: Shift[]=[];

}
