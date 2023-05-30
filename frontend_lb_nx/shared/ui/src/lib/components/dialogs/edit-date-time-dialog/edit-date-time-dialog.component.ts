import {Component, Inject, Input, LOCALE_ID} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {DateAfterConstantDateValidator} from "@frontend-lb-nx/shared/services";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'frontend-lb-nx-edit-date-time-dialog',
  templateUrl: './edit-date-time-dialog.component.html',
  styleUrls: ['./edit-date-time-dialog.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'de-DE' }]
})
export class EditDateTimeDialogComponent {

  startDate: Date = this.data.startDate;
  editableEndDate: Date = this.data.currentDate;


  dateBeforeStartErrorString = "dateBeforeStart";
  dateBeforeCurrentErrorString = "dateBeforeCurrent";

  form = new FormControl(this.editableEndDate, [
      Validators.required,
    DateAfterConstantDateValidator.dateAfter(this.startDate, this.dateBeforeStartErrorString),
    DateAfterConstantDateValidator.dateAfter(this.editableEndDate, this.dateBeforeCurrentErrorString)]);



  constructor(@Inject(MAT_DIALOG_DATA) public data: {startDate: Date, currentDate: Date, displayString?: string, validators?: [], errorcode?: number},  public dialogRef: MatDialogRef<EditDateTimeDialogComponent>) {
  }

  changeDate(event: any) {

    const date = event as Date;
    this.editableEndDate = date;
  }

  changeTime(event: any) {
    const time = event as Date;
    this.editableEndDate = new Date(this.editableEndDate.getFullYear(), this.editableEndDate.getMonth(), this.editableEndDate.getDate(), time.getHours(), time.getMinutes());

  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.editableEndDate);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
