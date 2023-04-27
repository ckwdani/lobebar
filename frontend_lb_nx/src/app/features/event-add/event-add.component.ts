import { Component } from '@angular/core';
import {OrgEvent, OrgEventClass} from "@frontend-lb-nx/shared/entities";
import {Store} from "@ngrx/store";
import {OrgEventBackendService, selectSuccess, selectToken} from "@frontend-lb-nx/shared/services";
import {filter, Observable} from "rxjs";
import {HttpHeaders} from "@ngrx/data/src/dataservices/interfaces";
import { EventAddStoreStore } from './event-add-store.store';


@Component({
  selector: 'frontend-lb-nx-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.scss'],
  providers: [EventAddStoreStore],
})

export class EventAddComponent {
  //$success = this.store.select(selectToken).subscribe(next=>next) ;
  //headers =  new HttpHeaders().set('Authorization', this.$success.toString() )
  constructor(private orgEventService: OrgEventBackendService, private store: Store, public readonly componentStore: EventAddStoreStore) {
  }


  $shiftTypesLoading = this.componentStore.$shiftTypesLoading;
  eventDefined$ = this.componentStore.eventDefined$;

  model : OrgEventClass = new OrgEventClass();
  $passedEvent: Observable<OrgEvent> = this.componentStore.event$.pipe(filter(event => event !== undefined)) as Observable<OrgEvent>;


  //{
  //   id: '',
  //   name:"",
  //   start: new Date(),
  //   end: new Date(),
  //   shifts: [],
  // }
  checkAndBuildEvent(){
    this.componentStore.setEvent(this.model);
  }
  sendOrgEvent(orgEvent: OrgEvent){
    this.add(orgEvent)
  }

  add(orgEvent: OrgEvent){

  }

  protected readonly filter = filter;
}
