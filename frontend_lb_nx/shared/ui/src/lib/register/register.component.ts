import { Component } from '@angular/core';
import {User} from "@frontend-lb-nx/shared/entities";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {
  allLoaded, register, selectSuccess, selectUserLoaded
} from "@frontend-lb-nx/shared/services";
import {combineLatest} from "rxjs/internal/operators/combineLatest";
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map, shareReplay} from "rxjs/operators";

@Component({
  selector: 'frontend-lb-nx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerState: RegisterComponentState;

  $success = this.store.select(selectSuccess);

  constructor(private router: Router, private store: Store) {
    this.registerState = new RegisterComponentState();
  }

  register(){
    this.store.dispatch(register({user: this.registerState.user}));
    this.$success.subscribe(
        (next)=> {
          if(next){
            this.router.navigate(['/login'])
          }
        }
    )
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
    telephone: +49,
    roles: []
  };
  isLoggedIn = false;
  roleAquired = false;
}
