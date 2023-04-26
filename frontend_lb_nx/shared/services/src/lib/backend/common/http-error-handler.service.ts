import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarRef} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AuthState} from "../states/auth/auth.reducer";
import {loginRequired, logout} from "../states/auth/auth.actions";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerService {

  constructor(private snackBar: MatSnackBar, private router: Router, private store: Store) { }

  handleHttpError(error: HttpErrorResponse, routeToLogin: boolean = true): HttpErrorResponse{
    return error;
  }
  //   switch (error.status) {
  //     case 0: this.snackBar.openFromComponent(ErrorBarComponent, {data:  new ErrorBarData('' +
  //           '<h3>Oh Oh! Es sieht so aus als ob keine Verbindung zum Internet besteht.</h3>' +
  //           'Stellen Sie sicher dass sie mit dem Internet verbunden sind und versuchen sie es noch einmal.', 'Ok')}); return error;break;
  //     case 200: return error;
  //     case 403: this.router.navigate(['']); return error; break;
  //     case 401: this.store.dispatch(logout());
  //       return error; // delete the localstorage and route to login
  //     default: this.snackBar.openFromComponent(ErrorBarComponent, {data:  new ErrorBarData('' +
  //           '<h3>Oh Oh! Ein Serverfehler ist Aufgetreten.</h3>' +
  //           'Laden sie die Seite neu. Falls das Problem bestehen bleibt, wenden Sie sich bitte an den Administrator.', 'Ok')}); return error;
  //   }
  // }
}


// @Component({
//   // eslint-disable-next-line @angular-eslint/component-selector
//   selector: 'app-error-bar',
//   templateUrl: '<div class="mainFlex">\n' +
//       '  <span [innerHTML]="data.message"></span>\n' +
//       '  <button (click)="click()" mat-button color="warn" id="actionButton">{{data.actionString}}</button>\n' +
//       '</div>\n' +
//       '\n',
//   // styleUrls: ['.mainFlex{\n' +
//   // '  display: flex;\n' +
//   // '  justify-content: space-between;\n' +
//   // '}\n' +
//   // '\n' +
//   // '#actionButton {\n' +
//   // '  min-width: 20%;\n' +
//   // '  padding-left: 20px;\n' +
//   // '}\n']
// })
// export class ErrorBarComponent  {
//
//   constructor(private snackBarRef: MatSnackBarRef<ErrorBarComponent>, @Inject(MAT_SNACK_BAR_DATA) public data: ErrorBarData) { }
//
//
//
//   click(): void{
//     this.snackBarRef.dismissWithAction();
//   }
// }
//
// export class ErrorBarData{
//   constructor(public message: string, public actionString: string) {
//   }
// }
