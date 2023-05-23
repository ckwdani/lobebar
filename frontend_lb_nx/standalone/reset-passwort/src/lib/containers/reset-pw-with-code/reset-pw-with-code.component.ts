import { Component } from '@angular/core';
import {animate, style, trigger, transition} from "@angular/animations";
import {FormControl, Validators} from "@angular/forms";
import {ResetPasswortService} from "../../services/reset-passwort.service";
import {ActivatedRoute, Router} from "@angular/router";
import {of, switchMap, tap} from "rxjs";


@Component({
  selector: 'frontend-lb-nx-reset-pw-with-code',
  templateUrl: './reset-pw-with-code.component.html',
  styleUrls: ['./reset-pw-with-code.component.scss'],
  animations: [ trigger(
      'inOutAnimation',
      [
        transition(
            ':enter',
            [
              style({ opacity: 0 }),
              animate('0.3s ease-out',
                  style({ opacity: 1 }))
            ]
        ),
        transition(
            ':leave',
            [
              style({ opacity: 1 }),
              animate('0.3s ease-in',
                  style({ opacity: 0 }))
            ]
        )
      ]
  )]
})
export class ResetPwWithCodeComponent {
  passwort = '';
  passwordRepeat = '';

  showPassword = false;
  showPasswordRepeat = false;

  loading = true;
  success = false;

  successMessage = '';
  errorMessage = '';

  hideAll = true;

  code = '';


  constructor(private passwordResetService: ResetPasswortService, private route: ActivatedRoute, private router: Router) {
    // get code from
    this.route.params.pipe(switchMap((params) =>{
        return this.passwordResetService.checkCode(params['code']).pipe(tap(next => this.hideAll = !next), switchMap(next => of(params["code"])));
    })).subscribe(params => {
      this.loading = false;
      this.code = params;
    });
  }

  passwordMatch(){
    return this.passwort === this.passwordRepeat;
  }
  submitForm() {
    this.passwordResetService.resetPassword(this.code, this.passwort)
        .subscribe(
            {
              next: () => {
                this.success = true;
                this.loading = false;
                this.errorMessage = '';
                //wait 2 seconds and then redirect to login
                setTimeout(() => {
                    this.router.navigate([this.passwordResetService.backendData.routeSuccess]);
                }, 2000)
              },
              error: (error) => {
                this.loading = false;
                this.success = false;
                if(error.status === 410){
                  this.errorMessage = 'Der Link ist ungültig oder abgelaufen.';
                }
                if(error.status === 404){
                      this.errorMessage = 'Der Link ist ungültig oder abgelaufen.';
                }
                else {
                      this.errorMessage = 'Es ist ein unbestimmter Fehler aufgetreten.' + error.message;
                }
              }
            }
        );
  }



}
