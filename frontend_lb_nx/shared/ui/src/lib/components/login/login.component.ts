import { Component, OnInit } from '@angular/core';
import {User} from "@frontend-lb-nx/shared/entities";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {
  loadTokenFromLocal,
  login,
  logout, selectAuthError,
  selectAuthState, selectIsAccepted,
  selectIsLoading, selectLoggedIn,
  selectToken, selectUser, selectUserLoaded
} from "@frontend-lb-nx/shared/services";
import {combineLatest, filter, tap} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

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
  $user = this.store.select(selectUser);
  $userApproved = this.store.select(selectIsAccepted);
  $error = this.store.select(selectAuthError).pipe( filter(x => (x?.status??0) == 401)).subscribe({next: () => this.loginstate.error = "Falsche daten!"});


  constructor(private router: Router, private store: Store) {
    this.loginstate = new LoginComponenState();
    this.store.dispatch(logout());
    combineLatest([this.$loading, this.$userLoaded, this.$loggedIn, this.$user]).pipe(filter(([loading, userLoaded, loggedIn, user]) => !loading && userLoaded&& (user??0 !== 0) && loggedIn )).subscribe(([,userLoaded,,user]) => {
      if((user?.roles.length?? -1) > 0) {
        this.router.navigate(['/']);
      }else{
        console.log("logout in login component");
        this.loginstate.error = "Noch unbestätitgter Account!";
          this.store.dispatch(logout());
      }
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
    approved: false,
    username: '',
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    titel: '',
    hygienepass: false,
    telephone: "",
    roles: [],
  };


}
