import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleFormDialogComponent } from './components/single-form-dialog/single-form-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ShiftTableComponent } from './components/shift-table/shift-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { EventOverviewComponent } from './components/event-overview/event-overview.component';
import { MatDatetimepickerModule } from '@mat-datetimepicker/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { LoginComponent } from './components/login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedServicesModule } from '@frontend-lb-nx/shared/services';
import { StoreModule } from '@ngrx/store';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RegisterComponent } from './components/register/register.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {SimpleTableComponent} from "./components/simpleTable/simple-table.component";
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatIconModule,
    MatDatetimepickerModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatProgressSpinnerModule,
    StoreModule.forRoot({}),
    SharedServicesModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatPaginatorModule,
  ],
  declarations: [
    SingleFormDialogComponent,
    SimpleTableComponent,
    ShiftTableComponent,
    LoginComponent,
    EventOverviewComponent,
    RegisterComponent,
  ],
  exports: [
    SingleFormDialogComponent,
    ShiftTableComponent,
    LoginComponent,
    SimpleTableComponent,
    EventOverviewComponent,
    RegisterComponent,
  ],
})
export class SharedUiModule {}
