import { Component, Inject } from '@angular/core';
import {Dialog, DialogRef, DIALOG_DATA} from "@angular/cdk/dialog";

export interface DialogData {
  previous: string|undefined;
  type: string;
  current: string|undefined;
}

@Component({
  selector: 'frontend-lb-nx-single-form-dialog',
  templateUrl: './single-form-dialog.component.html',
  styleUrls: ['./single-form-dialog.component.scss'],
})
export class SingleFormDialogComponent {
  //res variable for passing
  res=""
  constructor(public dialogRef: DialogRef<string>, @Inject(DIALOG_DATA) public data: DialogData){}
}
