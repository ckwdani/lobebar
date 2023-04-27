import { Component } from '@angular/core';
import {OrgEvent, OrgEventClass} from "@frontend-lb-nx/shared/entities";
import {Store} from "@ngrx/store";
import {OrgEventBackendService, selectSuccess, selectToken} from "@frontend-lb-nx/shared/services";
import {filter} from "rxjs";
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
  constructor(private orgEventService: OrgEventBackendService, private store: Store) {
  }

  submitted=false
  model : OrgEventClass = new OrgEventClass();//{
  //   id: '',
  //   name:"",
  //   start: new Date(),
  //   end: new Date(),
  //   shifts: [],
  // }
  checkAndBuildEvent(){
    this.submitted=true
    console.log(this.model)
  }
  sendOrgEvent(orgEvent: OrgEvent){
    this.add(orgEvent)
  }

  add(orgEvent: OrgEvent){
    this.orgEventService.add(orgEvent).subscribe(next => next.id)
  }
}
