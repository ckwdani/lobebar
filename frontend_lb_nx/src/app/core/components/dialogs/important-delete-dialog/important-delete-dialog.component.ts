import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, Validators} from "@angular/forms";
import {Shift} from "@frontend-lb-nx/shared/entities";

@Component({
  selector: 'frontend-lb-nx-important-delete-dialog',
  templateUrl: './important-delete-dialog.component.html',
  styleUrls: ['./important-delete-dialog.component.scss'],
})
export class ImportantDeleteDialogComponent {

  name = "";

  constructor(public dialogRef: MatDialogRef<ImportantDeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {name: string, shift?: Shift, isError?: boolean}, ) {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  nameIsEqual(){
    return this.name === this.data.name;
  }
}
