import { Component } from '@angular/core';
import {OrgEvent, OrgEventClass} from "@frontend-lb-nx/shared/entities";
import {Store} from "@ngrx/store";
import {OrgEventBackendService, selectSuccess, selectToken} from "@frontend-lb-nx/shared/services";
import {filter, Observable, of} from "rxjs";
import {HttpHeaders} from "@ngrx/data/src/dataservices/interfaces";
import { EventAddStore } from './event-add-store.store';
import {addOrgEvent} from "../../../../shared/services/src/lib/backend/states/orgEvent/orgEvent.actions";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";


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

  formBuilder: FormBuilder = new FormBuilder();

  myForm = this.formBuilder.group({
    date: ['', Validators.required],
    afterDate: ['', Validators.required],
  }, {
    validators: DateValidator.dateAfter('date', 'afterDate')
  });

  checkAndBuildEvent(){
    this.componentStore.setEvent(this.model);
  }
  sendOrgEvent(){
    // this.componentStore.setLoading(true);
    const copyModel= Object.assign({}, this.model)
    this.componentStore.sendEvent(copyModel);
    // this.store.dispatch(addOrgEvent({orgEvent: copyModel}))
  }


  protected readonly of = of;
}

export class DateValidator {
  static dateAfter(dateControlName: string, afterDateControlName: string) {
    return (control: AbstractControl) => {
      const date = control.get(dateControlName)?.value;
      const afterDate = control.get(afterDateControlName)?.value;

      if (date && afterDate && new Date(date) >= new Date(afterDate)) {
        return { dateAfter: true };
      }

      return null;
    };
  }
}
