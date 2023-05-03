import { Route } from '@angular/router';
import {DashboardComponent} from "./features/dashboard/dashboard.component";
import {OwnUserOverviewComponent} from "./features/own-user-overview/own-user-overview.component";
import {UsersOverviewComponent} from "./features/users-overview/users-overview.component";
import {RegisterComponent, ShiftTableComponent} from "@frontend-lb-nx/shared/ui";
import {EventsOverviewComponent} from "./features/events-overview/events-overview.component";
import {CalendarComponent} from "./features/calendar/calendar.component";
import {PointsComponent} from "./features/points/points.component";
import {EventAddComponent} from "./features/event-add/event-add.component";
import {LoginComponent} from "../../shared/ui/src/lib/components/login/login.component";
import {ShiftTypeAddComponent} from "./features/shift-types-overview/shift-type-add/shift-type-add.component";
import {ShiftTypesOverviewComponent} from "./features/shift-types-overview/shift-types-overview.component";

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
    {path: 'shift_add', component: ShiftTypeAddComponent},
    {path: 'shift_types', component: ShiftTypesOverviewComponent}
];
