import { Route } from '@angular/router';
import {DashboardComponent} from "./features/dashboard/dashboard.component";
import {OwnUserOverviewComponent} from "./features/own-user-overview/own-user-overview.component";
import {UsersOverviewComponent} from "./features/users-overview/users-overview.component";

export const appRoutes: Route[] = [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'user_overview', component: OwnUserOverviewComponent},
    {path: 'users_overview', component: UsersOverviewComponent},
];
