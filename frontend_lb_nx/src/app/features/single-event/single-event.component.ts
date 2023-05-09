import {Component, LOCALE_ID, OnInit} from '@angular/core';
import { SingleEventStore } from './single-event.store';
import {ActivatedRoute} from "@angular/router";
import {InSiteAnimations} from "@frontend-lb-nx/shared/ui";
import {registerLocaleData} from "@angular/common";
import localeDe from '@angular/common/locales/de';
import {of} from "rxjs";

@Component({
  selector: 'frontend-lb-nx-single-event',
  templateUrl: './single-event.component.html',
  styleUrls: ['./single-event.component.scss'],
  animations: [InSiteAnimations.inOutAnimation],
  providers: [SingleEventStore,   { provide: LOCALE_ID, useValue: 'de-DE' }],
})
export class SingleEventComponent implements OnInit{

  // import componentstore into constructor and get the id from the route
    constructor(protected readonly store: SingleEventStore, private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.store.fetchEvent(params['id']);
        });
    }


    ngOnInit() {
        registerLocaleData(localeDe);
    }


    protected readonly of = of;
}
