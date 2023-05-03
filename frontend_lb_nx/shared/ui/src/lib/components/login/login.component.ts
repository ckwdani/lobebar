import { Component, OnInit } from '@angular/core';
import {User} from "@frontend-lb-nx/shared/entities";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {
  loadTokenFromLocal,
  login,
  logout,
  selectAuthState,
  selectIsLoading, selectLoggedIn,
  selectToken, selectUserLoaded
} from "@frontend-lb-nx/shared/services";
import {combineLatest, filter, tap} from "rxjs";

@Component({
  selector: 'frontend-lb-nx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {

  loginstate: LoginComponenState;


  $loading = this.store.select(selectIsLoading);

  $userLoaded = this.store.select(selectUserLoaded);
  $loggedIn = this.store.select(selectLoggedIn);

  constructor(private router: Router, private store: Store) {
    this.loginstate = new LoginComponenState();
    this.store.dispatch(logout());
    combineLatest([this.$loading, this.$userLoaded, this.$loggedIn]).pipe(filter(([loading, userLoaded, loggedIn]) => !loading && userLoaded && loggedIn)).subscribe(() => {
        this.router.navigate(['/']);
    });

  }


  authenticate(){
    this.store.dispatch(login({username: this.loginstate.user.email, password: this.loginstate.user.password}))
  }

}

/**
 * the state for this component.
 * Saved in an extra class, so it looks better
 */
class LoginComponenState {
  hidePassword = true;
  error?: string;
  public isLoading = false;

  user: User = {
    username: '',
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    titel: '',
    hygienepass: false,
    telephone: 0,
    roles: []
  };


}
