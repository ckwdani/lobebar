import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OwnUserOverviewComponent } from './own-user-overview/own-user-overview.component';
import { DetailsWithEditComponent } from './own-user-overview/details-with-edit/details-with-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogModule } from '@angular/cdk/dialog';
import { UsersOverviewComponent } from './users-overview/users-overview.component';
import { MatTableModule } from '@angular/material/table';
import { EventOverviewComponent } from './event-overview/event-overview.component';
import {MatTabsModule} from "@angular/material/tabs";
import {SharedUiModule} from "@frontend-lb-nx/shared/ui";

@NgModule({
  declarations: [
    DashboardComponent,
    OwnUserOverviewComponent,
    DetailsWithEditComponent,
    UsersOverviewComponent,
    EventOverviewComponent,
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
    SharedUiModule,
  ],
})
export class FeaturesModule {}
