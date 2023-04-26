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

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
          map(result => result.matches),
          shareReplay()
      );
  registerState: RegisterComponentState;

  $success = this.store.select(selectSuccess);

  constructor(private router: Router, private store: Store, private breakpointObserver: BreakpointObserver) {
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

  get valid(){
    return this.registerState.user.username !== '' && this.registerState.user.email !== '' && this.registerState.user.password !== '' && this.registerState.user.firstname !== '' && this.registerState.user.lastname !== '' && this.registerState.user.telephone !== 0 && this.passwordMatch;
  }

  get passwordMatch(){
    return this.registerState.user.password === this.registerState.secondPassword;
  }
}

class RegisterComponentState {
  hidePassword = true;
  error?: string;
  public isLoading = false;
  isLoggingIn = false;
  user: User = {
    username: '',
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    titel: '',
    hygienepass: false,
    telephone: +49,
    roles: []
  };
  secondPassword = '';
  hideSecondPassword = true;
  isLoggedIn = false;
  roleAquired = false;
}
