import {Component, LOCALE_ID, OnInit} from '@angular/core';
import { SingleEventStore } from './single-event.store';
import {ActivatedRoute} from "@angular/router";
import {InSiteAnimations} from "@frontend-lb-nx/shared/ui";
import {registerLocaleData} from "@angular/common";
import localeDe from '@angular/common/locales/de';
import {filter, of, take} from "rxjs";
import {map} from "rxjs/operators";
import {EditStringDialogComponent} from "../../core/components/dialogs/edit-string-dialog/edit-string-dialog.component";
import {EditName} from "../../../../shared/services/src/lib/backend/states/shift-types/shift-type.actions";
import {DoneExtraWorkTypes, SnackType} from "@frontend-lb-nx/shared/entities";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'frontend-lb-nx-single-event',
  templateUrl: './single-event.component.html',
  styleUrls: ['./single-event.component.scss'],
  animations: [InSiteAnimations.inOutAnimation],
  providers: [SingleEventStore,   { provide: LOCALE_ID, useValue: 'de-DE' }],
})
export class SingleEventComponent implements OnInit{

  // import componentstore into constructor and get the id from the route
    constructor(protected readonly store: SingleEventStore, private route: ActivatedRoute, public dialog: MatDialog) {
        this.route.params.subscribe(params => {
            this.store.fetchEvent(params['id']);
        });
    }


    shifts$ = this.store.vm$.pipe(map(next => next.event?.shifts??[]));


    missbiggerZero$ = this.store.selectMissingPersons$.pipe(map(next => next > 0));



    ngOnInit() {
        registerLocaleData(localeDe);
    }


    updateName() {
        this.store.vm$.pipe(
            take(1),
            map(next => next.event?.name),
            filter(next => next !== undefined)
        ).subscribe(next => {
            const dialogRef = this.dialog.open(EditStringDialogComponent, {data: {name: next,displaySting: "Event Titel bearbeiten", errorcode: undefined}});
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.store.updateName(result);
                }
            });
        });

    }





    protected readonly of = of;
    protected readonly Date = Date;
}
