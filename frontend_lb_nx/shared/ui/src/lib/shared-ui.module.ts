import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleFormDialogComponent } from './single-form-dialog/single-form-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ShiftTableComponent } from './shift-table/shift-table.component';
import {MatTableModule} from "@angular/material/table";

@NgModule({
  imports: [CommonModule, MatInputModule, FormsModule, MatTableModule],
  declarations: [SingleFormDialogComponent, ShiftTableComponent],
  exports: [SingleFormDialogComponent, ShiftTableComponent],
})
export class SharedUiModule {}
