import { Component, OnInit } from '@angular/core';
import {User} from "@frontend-lb-nx/shared/entities";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {loadTokenFromLocal, login, logout, selectAuthState, selectToken} from "@frontend-lb-nx/shared/services";
import {tap} from "rxjs";

@Component({
  selector: 'frontend-lb-nx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginstate: LoginComponenState;

  $st = this.store.select(selectAuthState).pipe(tap(token => console.log(token))).subscribe(newxt => console.log(newxt));
  constructor(private router: Router, private store: Store) {
    this.loginstate = new LoginComponenState();
    this.store.dispatch(logout());
  }

  ngOnInit() {

  }

  authenticate(){
    this.store.dispatch(login({username: this.loginstate.user.email, password: this.loginstate.user.password}))
  }

  /*


  ngOnInit(): void {
    const route = this.loginfacade.getCurrentRoleAndRoute();
    if (route !== false){
      this.router.navigate([route]);
    } else {
      this.loginfacade.logout();
    }

  }

  authenticate(): void{
    this.loginstate.error = undefined;
    this.loginstate.isLoggingIn = true;
    this.loginfacade.authenticate(this.loginstate.user).subscribe(
      res => {
        this.loginstate.isLoggedIn = res;
        this.loginfacade.getRole().subscribe(role => {
          this.loginstate.isLoggingIn = false;
          this.loginstate.roleAquired = role;
          setTimeout(() => {
            this.router.navigate([this.loginfacade.routingPathAfterLogin()]);
          }, 700);
        });
      },
      error => {
        this.loginstate.isLoggingIn = false;
        if (error.status === 401){
          this.loginstate.error = 'Die eingegebenen Zugangsdaten sind nicht Korrekt. Bitte versuchen Sie es erneut.';
        }else {
          this.loginstate.error = 'Es ist ein Fehler aufgetreten. Stellen sie sicher dass sie mit dem Internet verbunden sind und versuchen Sie es erneut. Sollte das Problem bestehen, wenden sie sich an den Administrator.';
        }
      }
    );
  }

   */




}

/**
 * the state for this component.
 * Saved in an extra class, so it looks better
 */
class LoginComponenState {
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
