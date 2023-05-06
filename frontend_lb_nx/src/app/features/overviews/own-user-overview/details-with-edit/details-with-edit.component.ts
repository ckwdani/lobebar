import {Component, Input} from '@angular/core';
import {Dialog} from "@angular/cdk/dialog";
import {SingleFormDialogComponent} from "@frontend-lb-nx/shared/ui";
import {User} from "@frontend-lb-nx/shared/entities";
import {Store} from "@ngrx/store";
import {selectUser} from "@frontend-lb-nx/shared/services";

//pass the types for the dialog
enum DetailType{
  nameType="Namen",
  firstnameType="Vornamen",
  lastnameType="Nachnamen",
  titelType="Titel",
  emailType="Email",
  handyNrType="Handynummer",
  passwordType="asswort",
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
  @Input() user?: User;

  constructor(public dialog: Dialog){
  }
  //open dialog and pass data and width
    openDialog(input: keyof User, type: string): void {
    const dialogRef = this.dialog.open<string>(SingleFormDialogComponent, {
      width: '250px',
      data: {previous: input, type: type, current: ""},
    });

    //get the result from the dialog
    dialogRef.closed.subscribe(result => {
      console.log('The dialog was closed');
      let newUser = Object.assign({}, this.user);
      if(this.user != undefined){
        (newUser as any)[input] = result;
      }

      console.log(newUser)
    });
  }
}

