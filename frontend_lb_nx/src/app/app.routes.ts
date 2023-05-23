import {Route, Router} from '@angular/router';
import {DashboardComponent} from "./features/dashboard/dashboard.component";
import {OwnUserOverviewComponent} from "./features/overviews/own-user-overview/own-user-overview.component";
import {UsersOverviewComponent} from "./features/overviews/users-overview/users-overview.component";
import {RegisterComponent, ShiftTableComponent} from "@frontend-lb-nx/shared/ui";
import {EventsOverviewComponent} from "./features/overviews/events-overview/events-overview.component";
import {CalendarComponent} from "./features/calendar/calendar.component";
import {PointsComponent} from "./features/points/points.component";
import {EventAddComponent} from "./features/event-add/event-add.component";
import {LoginComponent} from "../../shared/ui/src/lib/components/login/login.component";
import {ShiftType_DoneEW_AddComponentDialog} from "./core/components/dialogs/shift-type-done-ew-add/shift-type_-done-e-w_-add-component-dialog.component";
import {ShiftTypesOverviewComponent} from "./features/overviews/shift-types-overview/shift-types-overview.component";
import {SingleEventComponent} from "./features/single-event/single-event.component";
import {AuthGuard} from "./core/utils/role-guard.guard";
import {Store} from "@ngrx/store";
import {inject} from "@angular/core";

export const appRoutes: Route[] = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'user_overview', component: OwnUserOverviewComponent},
    {path: 'users_overview', component: UsersOverviewComponent, canActivate: [AuthGuard]},
    {path: 'event_overview', component: EventsOverviewComponent},
    {path: 'calendar', component: CalendarComponent},
    {path: 'points', component: PointsComponent},
    {path: 'event_add', component: EventAddComponent, canActivate: [AuthGuard]},
    // {path: 'shift_add', component: ShiftType_DoneEW_AddComponentDialog, canActivate: [AuthGuard]},
    {path: 'shift_types', component: ShiftTypesOverviewComponent, canActivate: [AuthGuard]},
    // reoute to singleEventComponent with id
    {path: 'singleevent/:id', component: SingleEventComponent},
];
