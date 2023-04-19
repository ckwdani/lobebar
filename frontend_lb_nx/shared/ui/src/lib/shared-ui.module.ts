import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleFormDialogComponent } from './single-form-dialog/single-form-dialog.component';
import {MatInputModule} from "@angular/material/input";

@NgModule({
  imports: [CommonModule, MatInputModule],
  declarations: [SingleFormDialogComponent],
  exports: [SingleFormDialogComponent],
})
export class SharedUiModule {}
