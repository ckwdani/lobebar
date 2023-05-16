import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Snack, SnackType} from "@frontend-lb-nx/shared/entities";
import {BACKENDPATHS} from "../BACKENDPATHS";
import {BaseCommunicatorService} from "../common/base-communicator.service";

@Injectable({
  providedIn: 'root'
})
export class SnackService extends BaseCommunicatorService<Snack>{

  public snackUsed(snack_typeId: string, userId? : string): Observable<SnackType>{
    return super.post(BACKENDPATHS.snackUsed + '/' + snack_typeId +'/' + userId, []);
  }

  public getOwnSnacks(unixstart?: number, unixend?: number): Observable<Snack[]>{
    return super.getList(BACKENDPATHS.getOwnSnacks+'/'+unixstart+'/'+unixend);
  }

  public getUsedSnacks(unixstart?: number, unixend?: number, userId?: string){
    return super.getList(BACKENDPATHS.getUsedSnacks+'/'+unixstart+'/'+unixend+'/'+userId)
  }

  public countUsedSnacks(unixstart?: number, unixend?: number, userId?: string){
    return super.getList(BACKENDPATHS.countUsedSnacks+'/'+unixstart+'/'+unixend+'/'+userId)
  }
}
