import {Component, Inject, Input} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {
  ShiftTypeBackendService
} from "../../../../../../shared/services/src/lib/backend/entity-backend-services/shifts-type-backend.service";
import {Store} from "@ngrx/store";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'frontend-lb-nx-edit-string-dialog',
  templateUrl: './edit-string-dialog.component.html',
  styleUrls: ['./edit-string-dialog.component.scss'],
})
export class EditStringDialogComponent {


  displayString = this.data.displayString??"Name";
  startValue = this.data.name;



  fcname = new FormControl(this.data.name, [Validators.required, Validators.minLength(3)])

  constructor(private  shiftTypeService: ShiftTypeBackendService, private store: Store, @Inject(MAT_DIALOG_DATA) public data: {name: string, displayString?: string, errorcode?: number},  public dialogRef: MatDialogRef<EditStringDialogComponent>,) {
    console.log(data)
  }

  getErrorMessage(code: number) {
    switch (code) {
        case 409: return 'Name existiert bereits!';
        default: return 'Fehler! Probiere es erneut!';
    }
  }

  onSubmit() {
    if (this.fcname.valid) {
      this.dialogRef.close(this.data.name);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
