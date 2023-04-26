import { Component } from '@angular/core';
import {User} from "@frontend-lb-nx/shared/entities";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";

@Component({
  selector: 'frontend-lb-nx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerState: RegisterComponentState;

  constructor(private router: Router, private store: Store) {
    this.registerState = new RegisterComponentState();
  }

  register(){
    console.log()
  }
}

class RegisterComponentState {
  hidePassword = true;
  error?: string;
  public isLoading = false;
  isLoggingIn = false;
  user: User = {
    name: '',
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    titel: '',
    hygienepass: false,
    telephone: 0,
    roles: []
  };
  isLoggedIn = false;
  roleAquired = false;
}
