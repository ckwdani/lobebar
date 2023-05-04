import { Component } from '@angular/core';
import {User} from "@frontend-lb-nx/shared/entities";


@Component({
  selector: 'frontend-lb-nx-users-overview',
  templateUrl: './users-overview.component.html',
  styleUrls: ['./users-overview.component.scss'],
})
export class UsersOverviewComponent {
  displayedColumns: string[] = ['position', 'name', 'email', 'telefonnr', 'fullname', 'punkte', 'change'];
  dataSource = [];


}
