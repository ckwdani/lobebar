import { Component } from '@angular/core';
import {OrgEvent, OrgEventClass} from "@frontend-lb-nx/shared/entities";
import {Store} from "@ngrx/store";
import {OrgEventBackendService, selectSuccess, selectToken} from "@frontend-lb-nx/shared/services";
import {filter, Observable} from "rxjs";
import {HttpHeaders} from "@ngrx/data/src/dataservices/interfaces";
import { EventAddStore } from './event-add-store.store';
import {addOrgEvent} from "../../../../shared/services/src/lib/backend/states/orgEvent/orgEvent.actions";


@Component({
  selector: 'frontend-lb-nx-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.scss'],
  providers: [EventAddStore],
})

export class EventAddComponent {
  //$success = this.store.select(selectToken).subscribe(next=>next) ;
  //headers =  new HttpHeaders().set('Authorization', this.$success.toString() )
  constructor(private orgEventService: OrgEventBackendService, private store: Store, public readonly componentStore: EventAddStore) {
  }


  $shiftTypesLoading = this.componentStore.$shiftTypesLoading;
  eventDefined$ = this.componentStore.eventDefined$;

  model : OrgEventClass = new OrgEventClass();
  $passedEvent: Observable<OrgEvent> = this.componentStore.event$.pipe(filter(event => event !== undefined)) as Observable<OrgEvent>;

  checkAndBuildEvent(){
    this.componentStore.setEvent(this.model);
  }
  sendOrgEvent(){
    const copyModel= Object.assign({}, this.model)
    this.componentStore.sendEvent(copyModel);
    // this.store.dispatch(addOrgEvent({orgEvent: copyModel}))
  }
}
