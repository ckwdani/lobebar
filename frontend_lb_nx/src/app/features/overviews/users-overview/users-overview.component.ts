import { Component } from '@angular/core';
import {DoneExtraWorkTypes, ShiftType, User} from "@frontend-lb-nx/shared/entities";
import {UsersOverviewStore} from "./users-overview.store";
import {loadUser} from "@frontend-lb-nx/shared/services";
import {Observable} from "rxjs";
import {
  ImportantDeleteDialogComponent
} from "../../../core/components/dialogs/important-delete-dialog/important-delete-dialog.component";
import {map} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'frontend-lb-nx-users-overview',
  templateUrl: './users-overview.component.html',
  styleUrls: ['./users-overview.component.scss'],
})
export class UsersOverviewComponent {
  displayedColumns: string[] = ['position', 'name', 'email', 'telefonnr', 'fullname', 'punkte', 'balance','approved' ,'delete'];
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
}
