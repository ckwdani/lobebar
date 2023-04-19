import { Component } from '@angular/core';
import {Dialog} from "@angular/cdk/dialog";
import {SingleFormDialogComponent} from "@frontend-lb-nx/shared/ui";

//pass the types for the dialog
enum DetailType{
  nameType="Name",
  emailType="Email",
  handyNrType="Handynummer",
  passwordType="Password",
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
  email="asd@osadassa.de"
  handynr="01231312123"
  password="********"

  constructor(public dialog: Dialog){}
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

