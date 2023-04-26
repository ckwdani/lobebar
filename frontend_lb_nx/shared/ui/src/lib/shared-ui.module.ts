import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleFormDialogComponent } from './single-form-dialog/single-form-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ShiftTableComponent } from './shift-table/shift-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { EventOverviewComponent } from './event-overview/event-overview.component';
import { MatDatetimepickerModule } from '@mat-datetimepicker/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedServicesModule } from '@frontend-lb-nx/shared/services';
import { StoreModule } from '@ngrx/store';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RegisterComponent } from './register/register.component';
import {MatCheckboxModule} from "@angular/material/checkbox";

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
  ],
  declarations: [
    SingleFormDialogComponent,
    ShiftTableComponent,
    LoginComponent,
    EventOverviewComponent,
    RegisterComponent,
  ],
  exports: [
    SingleFormDialogComponent,
    ShiftTableComponent,
    LoginComponent,
    EventOverviewComponent,
    RegisterComponent,
  ],
})
export class SharedUiModule {}
