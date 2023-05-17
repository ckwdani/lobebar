import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {
  ShiftTypeBackendService
} from "../../../../../../shared/services/src/lib/backend/entity-backend-services/shifts-type-backend.service";
import {Store} from "@ngrx/store";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'frontend-lb-nx-number-input-dialog',
  templateUrl: './number-input-dialog.component.html',
  styleUrls: ['./number-input-dialog.component.scss']
})
export class NumberInputDialogComponent {
  displayString = this.data.displayString??"Name";



  fcnumber = new FormControl(this.data.value, this.data.validators??[Validators.required])

  constructor(private store: Store, @Inject(MAT_DIALOG_DATA) public data: {name: string, value: 0, displayString?: string, validators?: [], errorcode?: number},  public dialogRef: MatDialogRef<NumberInputDialogComponent>,) {
  }

  getErrorMessage(code: number) {
    switch (code) {
      case 409: return 'Name existiert bereits!';
      default: return 'Fehler! Probiere es erneut!';
    }
  }

  checkInteger(value: number): boolean{
    return Number.isInteger(value)
  }

  onSubmit() {
    if (this.fcnumber.valid&&this.checkInteger(this.data.value)) {
      this.dialogRef.close(this.fcnumber.value);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
