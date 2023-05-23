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
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BACKENDPATHS} from "../../../../../services/src/lib/backend/BACKENDPATHS";

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
  registerState= new RegisterComponentState();
  $success = this.store.select(selectSuccess);

  datenschutzLink = BACKENDPATHS.datenSchutz;

  acceptTerms = false;

  //VALIDATORS
  fcusername = new FormControl(this.registerState.user.username, [Validators.required, Validators.minLength(3)])
  fcemail = new FormControl(this.registerState.user.email, [Validators.required, Validators.email])
  fcfirstname = new FormControl(this.registerState.user.firstname, [Validators.required, Validators.minLength(2)])
  fclastname = new FormControl(this.registerState.user.lastname, [Validators.required, Validators.minLength(2)])
  fctelephone = new FormControl(this.registerState.user.telephone, [Validators.required, Validators.pattern('[- +()0-9]+')])


  constructor(private router: Router, private store: Store, private breakpointObserver: BreakpointObserver, private fb: FormBuilder) {
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
    return this.fcusername.valid && this.fcemail.valid && this.fcfirstname.valid && this.fclastname.valid && this.fctelephone.valid && this.passwordMatch
    //return this.registerState.user.username !== '' && this.registerState.user.email !== '' && this.registerState.user.password !== '' && this.registerState.user.firstname !== '' && this.registerState.user.lastname !== '' && this.registerState.user.telephone !== "" && this.passwordMatch;
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
    isApproved: false,
    username: '',
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    titel: '',
    hygienepass: false,
    telephone: "+49",
    achievements:undefined,
    roles: [],
    xPScore: 0,
    balance: 0,
  };
  secondPassword = '';
  hideSecondPassword = true;
  isLoggedIn = false;
  roleAquired = false;
}
