import { Component } from '@angular/core';
import {User} from "@frontend-lb-nx/shared/entities";


const ELEMENT_DATA: User[] = [
  {id: "asdasdas", username: 'Hydrogen', roles:  [], password: 'H', email:"xassda@assadl.de",
  firstname: "Guenther", lastname: "Fischer", titel: "Master Of Splines", hygienepass: true, telephone: 213123313},
  {id: "asdasdas", username: 'Hydrogen', roles:  [], password: 'H', email:"casdax@assadl.de",
    firstname: "ASDASD", lastname: "asasdasd", titel: "Master Of Splines", hygienepass: true, telephone: 213343},
  {id: "asdasdas", username: 'Hydrogen', roles:  [], password: 'H', email:"hdfgd@assadl.de",
    firstname: "adssadsa", lastname: "asdasd", titel: "Master Of Splines", hygienepass: true, telephone: 133123313},
  {id: "asdasdas", username: 'Hydrogen', roles:  [], password: 'H', email:"asadsx@assadl.de",
    firstname: "ascasca", lastname: "xasdas", titel: "Master Of Splines", hygienepass: true, telephone: 41123313},
  {id: "asdasdas", username: 'Hydrogen', roles:  [], password: 'H', email:"casda@assadl.de",
    firstname: "Guenther", lastname: "Fischer", titel: "Master Of Splines", hygienepass: true, telephone: 623313},

];

@Component({
  selector: 'frontend-lb-nx-users-overview',
  templateUrl: './users-overview.component.html',
  styleUrls: ['./users-overview.component.scss'],
})
export class UsersOverviewComponent {
  displayedColumns: string[] = ['position', 'name', 'email', 'telefonnr', 'fullname', 'punkte', 'change'];
  dataSource = ELEMENT_DATA;


}
