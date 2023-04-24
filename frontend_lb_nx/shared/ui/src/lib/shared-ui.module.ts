import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleFormDialogComponent } from './single-form-dialog/single-form-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ShiftTableComponent } from './shift-table/shift-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { EventOverviewComponent } from './event-overview/event-overview.component';
import {MatDatetimepickerModule} from "@mat-datetimepicker/core";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MAT_DATE_LOCALE} from "@angular/material/core";

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
  ],
  declarations: [
    SingleFormDialogComponent,
    ShiftTableComponent,
    EventOverviewComponent,
  ],
  exports: [
    SingleFormDialogComponent,
    ShiftTableComponent,
    EventOverviewComponent,
  ],
})
export class SharedUiModule {}
