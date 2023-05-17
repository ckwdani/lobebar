import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {OrgEvent, Snack, SnackType} from "@frontend-lb-nx/shared/entities";
import {BACKENDPATHS} from "../BACKENDPATHS";
import {BaseCommunicatorService} from "../common/base-communicator.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SnackService extends BaseCommunicatorService<Snack>{

  public snackUsed(snack_typeId: string, amount?: number, userId? : string): Observable<SnackType>{
    return super.post(BACKENDPATHS.snackUsed + '/' + snack_typeId +'/' + userId, []);
  }

  public getOwnSnacks(unixstart?: number, unixend?: number): Observable<Snack[]>{
    return super.getList(BACKENDPATHS.getOwnSnacks+'/'+unixstart+'/'+unixend).pipe(map(snacks=> snacks.map(snack=>this.mapSnack(snack))));
  }

  public getUsedSnacks(unixstart?: number, unixend?: number, userId?: string){
    return super.getList(BACKENDPATHS.getUsedSnacks+'/'+unixstart+'/'+unixend+'/'+userId).pipe(map(snacks=> snacks.map(snack=>this.mapSnack(snack))))
  }

  public countUsedSnacks(unixstart?: number, unixend?: number, userId?: string){
    return super.getList(BACKENDPATHS.countUsedSnacks+'/'+unixstart+'/'+unixend+'/'+userId).pipe(map(snacks=> snacks.map(snack=>this.mapSnack(snack))))
  }

  deserSnackDate(snack: Snack): Snack {
    snack.date = this.deserializeDate(snack.date as unknown as string);
    return snack;
  }

  private mapSnack(snack: Snack): Snack {
    snack = this.deserSnackDate(snack);
    return { ...snack};
  }
}
