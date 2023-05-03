import { Route } from '@angular/router';
import {DashboardComponent} from "./features/dashboard/dashboard.component";
import {OwnUserOverviewComponent} from "./features/overviews/own-user-overview/own-user-overview.component";
import {UsersOverviewComponent} from "./features/overviews/users-overview/users-overview.component";
import {RegisterComponent, ShiftTableComponent} from "@frontend-lb-nx/shared/ui";
import {EventsOverviewComponent} from "./features/overviews/events-overview/events-overview.component";
import {CalendarComponent} from "./features/calendar/calendar.component";
import {PointsComponent} from "./features/points/points.component";
import {EventAddComponent} from "./features/event-add/event-add.component";
import {LoginComponent} from "../../shared/ui/src/lib/components/login/login.component";
import {ShiftType_DoneEW_AddComponentDialog} from "./core/components/shift-type-done-ew-add/shift-type_-done-e-w_-add-component-dialog.component";
import {ShiftTypesOverviewComponent} from "./features/overviews/shift-types-overview/shift-types-overview.component";

export const appRoutes: Route[] = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'user_overview', component: OwnUserOverviewComponent},
    {path: 'users_overview', component: UsersOverviewComponent},
    {path: 'event_overview', component: EventsOverviewComponent},
    {path: 'calendar', component: CalendarComponent},
    {path: 'points', component: PointsComponent},
    {path: 'event_add', component: EventAddComponent},
    {path: 'shift_add', component: ShiftType_DoneEW_AddComponentDialog},
    {path: 'shift_types', component: ShiftTypesOverviewComponent}
];
