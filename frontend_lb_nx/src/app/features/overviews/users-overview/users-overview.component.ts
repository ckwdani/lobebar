import { Component } from '@angular/core';
import {DoneExtraWorkTypes, ShiftType, User, UserFunctions, UserRoles} from "@frontend-lb-nx/shared/entities";
import {UsersOverviewStore} from "./users-overview.store";
import {loadUser} from "@frontend-lb-nx/shared/services";
import {Observable} from "rxjs";
import {
  ImportantDeleteDialogComponent
} from "../../../core/components/dialogs/important-delete-dialog/important-delete-dialog.component";
import {map} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {
  ShiftType_DoneEW_AddComponentDialog
} from "../../../core/components/dialogs/shift-type-done-ew-add/shift-type_-done-e-w_-add-component-dialog.component";
import {
  DropdownMenuDialogComponent
} from "../../../core/components/dialogs/dropdown-menu-dialog/dropdown-menu-dialog.component";

@Component({
  selector: 'frontend-lb-nx-users-overview',
  templateUrl: './users-overview.component.html',
  styleUrls: ['./users-overview.component.scss'],
})
export class UsersOverviewComponent {
  displayedColumns: string[] = ['position', 'name', 'email', 'telefonnr', 'fullname', 'punkte', 'balance','approved', 'role' ,'delete'];
  $usersLoading = this.usersOverviewStore.selectLoading$;
  readonly users$= this.usersOverviewStore.selectUsers$;
  //$deletingError = this.usersOverviewStore.selectDeletingError$;

  constructor(private usersOverviewStore: UsersOverviewStore, public dialog: MatDialog) {
    this.usersOverviewStore.loadUsers();
  }

  deleteUser(user: User, isError = false) {

    const dialogRef = this.dialog.open(ImportantDeleteDialogComponent, {data: {name: user.username, isError: isError}});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // type.name = result;
        this.usersOverviewStore.deleteUser(user)
        //this.$deletingError.pipe(map((loading,) => loading.adding)).subscribe({next: (value) => this.loadingEWT = value})
      }
    });


  }

  approveUser(user: User) {
    this.usersOverviewStore.approveUser(user)
  }

  genHighestRole(valueUserRole: number) {
    for(const key in UserRoles){
      if(UserRoles[key as keyof typeof UserRoles]===valueUserRole){
        return key
      }
      return key
    }
    return undefined
  }

  openDialog(currentRole: string, user: User): void {
    const dialogRef = this.dialog.open(DropdownMenuDialogComponent, {data: {
      displayString: "Rolle von "+user.username+" ändern.",
        currentRole: UserFunctions.getRole(user),
        choices: [UserRoles]}});

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        const uppercaseRole = "ROLE_"+result.toUpperCase()
        user.roles.concat(uppercaseRole)
        this.usersOverviewStore.updateUser(user)

      }
      console.log('The dialog was closed');
    });
  }

  protected readonly UserRoles = UserRoles;
  protected readonly UserFunctions = UserFunctions;
}
