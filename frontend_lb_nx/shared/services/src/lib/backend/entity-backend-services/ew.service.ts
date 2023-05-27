import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {DoneExtraWork, DoneExtraWorkTypes, OrgEvent} from "@frontend-lb-nx/shared/entities";
import {BACKENDPATHS} from "../BACKENDPATHS";
import {BaseCommunicatorService} from "../common/base-communicator.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EWService extends BaseCommunicatorService<DoneExtraWork>{

  public doneEw(ew_typeId: string, amount?: number, userId? : string): Observable<DoneExtraWork[]>{
    return super.post(BACKENDPATHS.doEw + '/' + ew_typeId + '/' + amount +'/' + userId, {}) as any as Observable<DoneExtraWork[]>;
  }

  public getOwnews(unixstart?: number, unixend?: number): Observable<DoneExtraWork[]>{
    return super.getList(BACKENDPATHS.getOwnDone +'/'+unixstart+'/'+unixend).pipe(map(ews=> ews.map(ew=>this.mapew(ew))));
  }

  public getUserews(unixstart?: number, unixend?: number, userId?: string){
    return super.getList(BACKENDPATHS.getDoneEW+'/'+unixstart+'/'+unixend+'/'+userId).pipe(map(ews=> ews.map(ew=>this.mapew(ew))))
  }

  // public countUsedews(unixstart?: number, unixend?: number, userId?: string){
  //   return super.getList(BACKENDPATHS.countUsedews+'/'+unixstart+'/'+unixend+'/'+userId).pipe(map(ews=> ews.map(ew=>this.mapew(ew))))
  // }

  deserewDate(ew: DoneExtraWork): DoneExtraWork {
    ew.date = this.deserializeDate(ew.date as unknown as string);
    return ew;
  }

  private mapew(ew: DoneExtraWork): DoneExtraWork {
    ew = this.deserewDate(ew);
    return { ...ew};
  }
}
