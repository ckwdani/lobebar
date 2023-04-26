import { Component } from '@angular/core';
import {OrgEvent} from "@frontend-lb-nx/shared/entities";
import {EntityActionOptions, EntityCollectionService, EntityServices} from "@ngrx/data";
import {Store} from "@ngrx/store";
import {selectSuccess, selectToken} from "@frontend-lb-nx/shared/services";
import {filter} from "rxjs";
import {HttpHeaders} from "@ngrx/data/src/dataservices/interfaces";


@Component({
  selector: 'frontend-lb-nx-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.scss'],
})

export class EventAddComponent {
  orgEventsService: EntityCollectionService<OrgEvent>;
  //$success = this.store.select(selectToken).subscribe(next=>next) ;
  //headers =  new HttpHeaders().set('Authorization', this.$success.toString() )


  private httpOptions = {
    headers: {'Content-Type': 'application/json'},
  };

  private headers = {'Content-Type': 'application/json', "Authorization": 'Bearer '};
  $sel = this.store.select(selectToken).pipe(filter(token => token != null)).subscribe(next => {
    this.headers = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + next};
  });

  constructor(entityServices: EntityServices, private store: Store) {
    this.orgEventsService = entityServices.getEntityCollectionService('OrgEvent')
  }
  submitted=false
  model : OrgEvent={
    id: '',
    name:"",
    start: new Date(),
    end: new Date(),
    shifts: [],
  }
  checkAndBuildEvent(){
    this.submitted=true
    console.log(this.model)
  }
  sendOrgEvent(orgEvent: OrgEvent){
    this.add(orgEvent)
  }

  add(orgEvent: OrgEvent){
    this.orgEventsService.add(orgEvent, {httpOptions: {httpHeaders: this.headers}});
  }
}
