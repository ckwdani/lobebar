import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {BaseCommunicatorService} from "../common/base-communicator.service";
import {BACKENDPATHS} from "../BACKENDPATHS";
import {OrgEvent} from "@frontend-lb-nx/shared/entities";


@Injectable({
  providedIn: 'root'
})
export class OrgEventBackendService extends BaseCommunicatorService<OrgEvent>{


  public getAll(): Observable<OrgEvent[]>{
    return super.getList('').pipe(map(orgEvents => orgEvents.map(orgEvent=>this.mapOrgEvent(orgEvent))))

  }

  public getTimed(unixstart?: number, unixend?: number): Observable<OrgEvent[]>{
    return super.getList(BACKENDPATHS.getOrgEventTimed+'/'+unixstart+'/'+unixend).pipe(map(orgEvents => orgEvents.map(orgEvent=>this.mapOrgEvent(orgEvent))))

  }

  public getById(id: string): Observable<OrgEvent> {
    return super.get(BACKENDPATHS.getSingleOrgEvent+'/'+id)
        .pipe(
            map(orgEvent=>this.mapOrgEvent(orgEvent)),
            map(orgEvent => this.deserOrgEventDate(orgEvent)
            )
        )
    //return super.getById(id).pipe(map(orgEvent=>this.mapOrgEvent(orgEvent)));
  }

  public add(orgEvent: OrgEvent):Observable<OrgEvent>{
    return super.post(BACKENDPATHS.addOrgEvent, orgEvent).pipe(map(orgEvent=> this.mapOrgEvent(orgEvent)))
  }

  override delete(id: string): Observable<OrgEvent>{
    return super.delete(BACKENDPATHS.deleteOrgEvent+'/'+id).pipe(map(orgEvent=> this.mapOrgEvent(orgEvent)))
  }

  update(orgEvent: OrgEvent): Observable<OrgEvent>{
    return super.put(BACKENDPATHS.updateOrgEvent+'/'+orgEvent.id, orgEvent).pipe(map(orgEvent=> this.mapOrgEvent(orgEvent)))
  }



  /*
  public getWithQuery(params: string | QueryParams): Observable<OrgEvent[]> {
    return super.getWithQuery(params).pipe(map(orgEvents => orgEvents.map(orgEvent => this.mapOrgEvent(orgEvent))));
  }
   */

  deserOrgEventDate(orgEvent: OrgEvent): OrgEvent {
    orgEvent.start = this.deserializeDate(orgEvent.start as unknown as string);
    orgEvent.end = this.deserializeDate(orgEvent.end as unknown as string);
    return orgEvent;
  }

  private mapOrgEvent(orgEvent: OrgEvent): OrgEvent {
    orgEvent = this.deserOrgEventDate(orgEvent);
    return { ...orgEvent};
  }

}
