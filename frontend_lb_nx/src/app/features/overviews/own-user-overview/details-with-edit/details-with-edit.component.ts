import { Component } from '@angular/core';
import {Dialog} from "@angular/cdk/dialog";
import {SingleFormDialogComponent} from "@frontend-lb-nx/shared/ui";
import {User} from "@frontend-lb-nx/shared/entities";
import {Store} from "@ngrx/store";
import {selectUser} from "@frontend-lb-nx/shared/services";

//pass the types for the dialog
enum DetailType{
  nameType="Willst du deinen Namen ändern?",
  firstnameType="Willst du deinen Vornamen ändern?",
  lastnameType="Willst du deinen Nachnamen ändern?",
  titelType="Willst du deinen Titel ändern?",
  emailType="Willst du deine Email ändern?",
  handyNrType="Willst du deine Handynummer ändern?",
  passwordType="Willst du dein Passwort ändern?",
}

@Component({
  selector: 'frontend-lb-nx-details-with-edit',
  templateUrl: './details-with-edit.component.html',
  styleUrls: ['./details-with-edit.component.scss'],
})


export class DetailsWithEditComponent {
  res: string | undefined;
  detailType=DetailType

  name="asdasdsad"
  $userObs= this.store.select(selectUser)

  constructor(public dialog: Dialog, private store: Store){
  }
  //open dialog and pass data and width
  openDialog(input: string, type: string): void {
    const dialogRef = this.dialog.open<string>(SingleFormDialogComponent, {
      width: '250px',
      data: {previous: input, type: type, current: ""},
    });

    //get the result from the dialog
    dialogRef.closed.subscribe(result => {
      console.log('The dialog was closed');
      this.res = result;
      console.log(this.res)
    });
  }
}

