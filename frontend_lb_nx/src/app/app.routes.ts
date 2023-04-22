import { Route } from '@angular/router';
import {DashboardComponent} from "./features/dashboard/dashboard.component";
import {OwnUserOverviewComponent} from "./features/own-user-overview/own-user-overview.component";
import {UsersOverviewComponent} from "./features/users-overview/users-overview.component";
import {ShiftTableComponent} from "@frontend-lb-nx/shared/ui";
import {EventOverviewComponent} from "./features/event-overview/event-overview.component";
import {CalendarComponent} from "./features/calendar/calendar.component";

export const appRoutes: Route[] = [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'user_overview', component: OwnUserOverviewComponent},
    {path: 'users_overview', component: UsersOverviewComponent},
    {path: 'event_overview', component: EventOverviewComponent},
    {path: 'calendar', component: CalendarComponent}
];
