import { Injectable } from '@angular/core';
import {OrgEvent} from "@frontend-lb-nx/shared/entities";
import {HttpClient} from "@angular/common/http";
import {
  DefaultDataService,
  HttpUrlGenerator, QueryParams
} from "@ngrx/data";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OrgEventBackendService extends DefaultDataService<OrgEvent>{
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('OrgEvent', http, httpUrlGenerator)
  }

  override getAll(): Observable<OrgEvent[]>{
    return super.getAll().pipe(map(orgEvents=> orgEvents.map(orgEvent=>this.mapOrgEvent(orgEvent))))
  }

  override getById(id: string): Observable<OrgEvent> {
    return super.getById(id).pipe(map(orgEvent=>this.mapOrgEvent(orgEvent)));
  }

  override getWithQuery(params: string | QueryParams): Observable<OrgEvent[]> {
    return super.getWithQuery(params).pipe(map(orgEvents => orgEvents.map(orgEvent => this.mapOrgEvent(orgEvent))));
  }

  private mapOrgEvent(orgEvent: OrgEvent): OrgEvent {
    return { ...orgEvent};
  }

}
