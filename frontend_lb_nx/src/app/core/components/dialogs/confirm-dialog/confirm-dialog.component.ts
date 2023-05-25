import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'frontend-lb-nx-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {


  constructor(@Inject(MAT_DIALOG_DATA) public data: {displayString: string},  public dialogRef: MatDialogRef<ConfirmDialogComponent>) {

  }


  onNoClick(): void {
    this.dialogRef.close();
  }



}
