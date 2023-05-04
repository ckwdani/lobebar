import { Component } from '@angular/core';
import {User} from "@frontend-lb-nx/shared/entities";
import {UsersOverviewStore} from "./users-overview.store";
import {loadUser} from "@frontend-lb-nx/shared/services";
import {Observable} from "rxjs";


@Component({
  selector: 'frontend-lb-nx-users-overview',
  templateUrl: './users-overview.component.html',
  styleUrls: ['./users-overview.component.scss'],
})
export class UsersOverviewComponent {
  displayedColumns: string[] = ['position', 'name', 'email', 'telefonnr', 'fullname', 'punkte', 'change'];
  readonly users$= this.usersOverviewStore.selectUsers$;

  constructor(private usersOverviewStore: UsersOverviewStore) {
    this.usersOverviewStore.loadUsers();
  }
}
