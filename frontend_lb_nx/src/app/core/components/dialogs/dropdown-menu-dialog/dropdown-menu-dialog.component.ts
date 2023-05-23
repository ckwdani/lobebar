import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {updateUser} from "@frontend-lb-nx/shared/services";
import {UsersOverviewStore} from "../../../../features/overviews/users-overview/users-overview.store";
import {UserRoles, userRolesMap} from "@frontend-lb-nx/shared/entities";

@Component({
  selector: 'frontend-lb-nx-dropdown-menu-dialog',
  templateUrl: './dropdown-menu-dialog.component.html',
  styleUrls: ['./dropdown-menu-dialog.component.css']
})
export class DropdownMenuDialogComponent {
  displayString = this.data.displayString??"Name";
  selected= '';

  constructor(private usersOverviewStore: UsersOverviewStore, @Inject(MAT_DIALOG_DATA) public data: {name: string, choices: string[], currentRole: string, displayString?: string, validators?: [], errorcode?: number},  public dialogRef: MatDialogRef<DropdownMenuDialogComponent>,) {
  this.selected=data.currentRole
  }

  getErrorMessage(code: number) {
    switch (code) {
      case 409: return 'Name existiert bereits!';
      default: return 'Fehler! Probiere es erneut!';
    }
  }

  onSubmit() {
    this.dialogRef.close(this.selected);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getMinusesCount(elem: string): string{
    const mapRoles = userRolesMap
    const num = UserRoles.ADMIN- <number>Array.from(mapRoles.keys()).find(key => mapRoles.get(key) === elem);
    return '-'.repeat(num)
  }

  protected readonly userRolesMap = userRolesMap;
  protected readonly Array = Array;
}
