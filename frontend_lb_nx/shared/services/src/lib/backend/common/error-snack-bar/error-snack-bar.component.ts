import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material/snack-bar";

@Component({
  selector: 'frontend-lb-nx-error-snack-bar',
  templateUrl: './error-snack-bar.component.html',
  styleUrls: ['./error-snack-bar.component.scss']
})
export class ErrorSnackBarComponent {

  constructor(private snackBarRef: MatSnackBarRef<ErrorSnackBarComponent>, @Inject(MAT_SNACK_BAR_DATA) public data: ErrorBarData) {

  }

  click(): void{
    this.snackBarRef.dismissWithAction();
  }
}

export class ErrorBarData{
  constructor(public message: string, public actionString: string) {
  }
}
