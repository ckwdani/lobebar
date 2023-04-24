import { Component } from '@angular/core';
import {OrgEvent} from "@frontend-lb-nx/shared/entities";

@Component({
  selector: 'frontend-lb-nx-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.scss'],
})
export class EventAddComponent {
  submitted=false
  model : OrgEvent={
    id:"",
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
    console.log(orgEvent)
  }
}
