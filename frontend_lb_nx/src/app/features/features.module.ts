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
import {MatTableModule} from "@angular/material/table";

@NgModule({
  declarations: [
    DashboardComponent,
    OwnUserOverviewComponent,
    DetailsWithEditComponent,
    UsersOverviewComponent,
  ],
  exports: [DashboardComponent, OwnUserOverviewComponent],
  imports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    DialogModule,
    CommonModule,
    MatTableModule,
  ],
})
export class FeaturesModule {}
