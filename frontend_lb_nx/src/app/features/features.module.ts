// import { LOCALE_ID, NgModule } from '@angular/core';
// import { CommonModule, registerLocaleData } from '@angular/common';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { OwnUserOverviewComponent } from './overviews/own-user-overview/own-user-overview.component';
// import { DetailsWithEditComponent } from './overviews/own-user-overview/details-with-edit/details-with-edit.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { DialogModule } from '@angular/cdk/dialog';
// import { UsersOverviewComponent } from './overviews/users-overview/users-overview.component';
// import { MatTableModule } from '@angular/material/table';
// import { EventsOverviewComponent } from './overviews/events-overview/events-overview.component';
// import { MatTabsModule } from '@angular/material/tabs';
// import { SharedUiModule } from '@frontend-lb-nx/shared/ui';
// import { CalendarComponent } from './calendar/calendar.component';
// import {
//   CalendarCommonModule,
//   CalendarMonthModule,
//   DateAdapter,
// } from 'angular-calendar';
// import { CalendarHeaderComponent } from './calendar/calendar-header/calender-header.component';
// import { PointsComponent } from './points/points.component';
// import { EventAddComponent } from './event-add/event-add.component';
// import { RouterLink } from '@angular/router';
// import { MatInputModule } from '@angular/material/input';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatDatetimepickerModule } from '@mat-datetimepicker/core';
// import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { EventsOverviewStore } from './overviews/events-overview/events-overview.store';
// import { SharedServicesModule } from '@frontend-lb-nx/shared/services';
// import { EventAddStore } from './event-add/event-add-store.store';
// import { ShiftType_DoneEW_AddComponentDialog } from '../core/components/dialogs/shift-type-done-ew-add/shift-type_-done-e-w_-add-component-dialog.component';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { ShiftTypesOverviewComponent } from './overviews/shift-types-overview/shift-types-overview.component';
// import { UsersOverviewStore } from './overviews/users-overview/users-overview.store';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatExpansionModule } from '@angular/material/expansion';
// import { SingleEventComponent } from './single-event/single-event.component';
// import { SingleEventStore } from './single-event/single-event.store';
// import { MatDividerModule } from '@angular/material/divider';
// import { MatTooltipModule } from '@angular/material/tooltip';
// import { MatListModule } from '@angular/material/list';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatSortModule } from '@angular/material/sort';
// import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { SnacksBookerComponent } from './overviews/snacks-booker/snacks-booker.component';
// import { SnacksBookerStore } from './overviews/snacks-booker/snacks-booker.store';
// import { SnacksBookerTableComponent } from './overviews/snacks-booker/snacks-booker-table/snacks-booker-table.component';
// import {SharedDirectivesModule} from "@frontend-lb-nx/shared/directives";
// import {MatCheckboxModule} from "@angular/material/checkbox";
// import {CoreModule} from "../core/core.module";
// import {
//     SnackUseOverviewComponent
// } from "../core/components/overviewlists-and-tables/snack-use-overview/snack-use-overview.component";
// import {AdminBookWorkSnacksComponent} from "./admin-book-work-snacks/admin-book-work-snacks.component";
// import {SnacksUserStore} from "./admin-book-work-snacks/admin-book-work-snacks-store.store";

// Register the German locale data

import {DashboardComponent} from "./dashboard/dashboard.component";
import {OwnUserOverviewComponent} from "./overviews/own-user-overview/own-user-overview.component";
import {DetailsWithEditComponent} from "./overviews/own-user-overview/details-with-edit/details-with-edit.component";
import {UsersOverviewComponent} from "./overviews/users-overview/users-overview.component";
import {EventsOverviewComponent} from "./overviews/events-overview/events-overview.component";
import {CalendarComponent} from "./calendar/calendar.component";
import {CalendarHeaderComponent} from "./calendar/calendar-header/calender-header.component";
import {PointsComponent} from "./points/points.component";
import {EventAddComponent} from "./event-add/event-add.component";
import {
    ShiftType_DoneEW_AddComponentDialog
} from "../../../shared/ui/src/lib/components/dialogs/shift-type-done-ew-add/shift-type_-done-e-w_-add-component-dialog.component";
import {ShiftTypesOverviewComponent} from "./overviews/shift-types-overview/shift-types-overview.component";
import {SingleEventComponent} from "./single-event/single-event.component";
import {
    SnackUseOverviewComponent
} from "../core/components/overviewlists-and-tables/snack-use-overview/snack-use-overview.component";
import {SnacksBookerComponent} from "./overviews/snacks-booker/snacks-booker.component";
import {AdminBookWorkSnacksComponent} from "./admin-book-work-snacks/admin-book-work-snacks.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {DialogModule} from "@angular/cdk/dialog";
import {CommonModule} from "@angular/common";
import {MatTableModule} from "@angular/material/table";
import {MatTabsModule} from "@angular/material/tabs";
import {CalendarCommonModule, CalendarMonthModule} from "angular-calendar";
import {RouterLink} from "@angular/router";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedServicesModule} from "@frontend-lb-nx/shared/services";
import {MatDatetimepickerModule} from "@mat-datetimepicker/core";
import {SharedUiModule} from "@frontend-lb-nx/shared/ui";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDividerModule} from "@angular/material/divider";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatListModule} from "@angular/material/list";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {SharedDirectivesModule} from "@frontend-lb-nx/shared/directives";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {CoreModule} from "../core/core.module";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {EventsOverviewStore} from "./overviews/events-overview/events-overview.store";
import {UsersOverviewStore} from "./overviews/users-overview/users-overview.store";
import {SingleEventStore} from "./single-event/single-event.store";
import {SnacksUserStore} from "../core/components/overviewlists-and-tables/snack-use-overview/admin-book-work-snacks-store.store";
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {NgModule} from "@angular/core";
import {SnacksBookerTableComponent} from "./overviews/snacks-booker/snacks-booker-table/snacks-booker-table.component";

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
    SnackUseOverviewComponent,
    SnacksBookerComponent,
    AdminBookWorkSnacksComponent,
      SnacksBookerTableComponent,

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
        MatTooltipModule,
        MatListModule,
        MatPaginatorModule,
        MatSortModule,
        SharedDirectivesModule,
        MatCheckboxModule,
        CoreModule,
        MatProgressBarModule
    ],
  providers: [
    EventsOverviewStore,
    UsersOverviewStore,
    SingleEventStore,
      SnacksUserStore,
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
    //
    // // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // // here, due to limitations of our example generation script.
    // {
    //     provide: DateAdapter,
    //     useClass: MomentDateAdapter,
    //     deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    // },
    // {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    // {provide: MAT_DATE_LOCALE, useValue: 'de-DE'},
    // {provide: MAT_DATE_FORMATS, useValue: 'de-DE'},
    // { provide: DateAdapter, useClass: GermanDateProvider, deps: [MAT_DATE_LOCALE] },

    //   { provide: LOCALE_ID, useValue: 'de' }
    // // ShiftTypeAddStore
  ],
})
export class FeaturesModule {}
