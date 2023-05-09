import { Component } from '@angular/core';
import { SingleEventStore } from './single-event.store';
import {ActivatedRoute} from "@angular/router";
import {InSiteAnimations} from "@frontend-lb-nx/shared/ui";

@Component({
  selector: 'frontend-lb-nx-single-event',
  templateUrl: './single-event.component.html',
  styleUrls: ['./single-event.component.scss'],
  animations: [InSiteAnimations.inOutAnimation],
  providers: [SingleEventStore],
})
export class SingleEventComponent {

  // import componentstore into constructor and get the id from the route
    constructor(protected readonly store: SingleEventStore, private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.store.fetchEvent(params['id']);
        });
    }



}
