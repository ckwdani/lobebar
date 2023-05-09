import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OwnUserOverviewComponent } from './overviews/own-user-overview/own-user-overview.component';
import { DetailsWithEditComponent } from './overviews/own-user-overview/details-with-edit/details-with-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogModule } from '@angular/cdk/dialog';
import { UsersOverviewComponent } from './overviews/users-overview/users-overview.component';
import { MatTableModule } from '@angular/material/table';
import { EventsOverviewComponent } from './overviews/events-overview/events-overview.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedUiModule } from '@frontend-lb-nx/shared/ui';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarCommonModule, CalendarMonthModule } from 'angular-calendar';
import { CalendarHeaderComponent } from './calendar/calendar-header/calender-header.component';
import { PointsComponent } from './points/points.component';
import { EventAddComponent } from './event-add/event-add.component';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDatetimepickerModule } from '@mat-datetimepicker/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventsOverviewStore } from './overviews/events-overview/events-overview.store';
import { SharedServicesModule } from '@frontend-lb-nx/shared/services';
import { EventAddStore } from './event-add/event-add-store.store';
import { ShiftType_DoneEW_AddComponentDialog } from '../core/components/dialogs/shift-type-done-ew-add/shift-type_-done-e-w_-add-component-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ShiftTypesOverviewComponent } from './overviews/shift-types-overview/shift-types-overview.component';
import { UsersOverviewStore } from './overviews/users-overview/users-overview.store';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { SingleEventComponent } from './single-event/single-event.component';
import { SingleEventStore } from './single-event/single-event.store';
import {MatDividerModule} from "@angular/material/divider";

@NgModule({
  declarations: [
    DashboardComponent,
    OwnUserOverviewComponent,
    DetailsWithEditComponent,
    UsersOverviewComponent,
    EventsOverviewComponent,
    CalendarComponent,
    CalendarHeaderComponent,
    PointsComponent,
    EventAddComponent,
    ShiftType_DoneEW_AddComponentDialog,
    ShiftTypesOverviewComponent,
    SingleEventComponent,
  ],
  exports: [DashboardComponent, OwnUserOverviewComponent],
    imports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        DialogModule,
        CommonModule,
        MatTableModule,
        MatTabsModule,
        CalendarMonthModule,
        CalendarCommonModule,
        RouterLink,
        MatDialogModule,
        MatInputModule,
        MatDatepickerModule,
        MatDatetimepickerModule,
        FormsModule,
        SharedServicesModule,
        SharedUiModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
        MatExpansionModule,
        MatDividerModule,
    ],
  providers: [
    EventsOverviewStore,
    UsersOverviewStore,
    SingleEventStore,
    // ShiftTypeAddStore
  ],
})
export class FeaturesModule {}
