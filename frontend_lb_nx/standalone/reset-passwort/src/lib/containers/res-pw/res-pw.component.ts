import { Component } from '@angular/core';
import {ResetPasswortService} from "../../services/reset-passwort.service";
import {FormControl, Validators} from "@angular/forms";
import {Subject, tap} from "rxjs";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'frontend-lb-nx-res-pw',
  templateUrl: './res-pw.component.html',
  styleUrls: ['./res-pw.component.scss'],
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
export class ResPwComponent {
  email = '';

  loading = false;
  success = false;

  successMessage = '';
  errorMessage = '';
  fcemail = new FormControl(this.email, [Validators.required, Validators.email])



  constructor(private passwordResetService: ResetPasswortService) {
  }

  submitForm() {
    this.passwordResetService.sendMail(this.email)
        .subscribe(
            {
                next: () => {
                    this.success = true;
                    this.loading = false;
                    this.errorMessage = '';
                },
                error: (error) => {
                    this.loading = false;
                    this.success = false;
                    if(error.status === 404){
                        this.errorMessage = 'Diese Email ist nicht registriert.';
                    }
                    this.errorMessage = 'Es ist ein unbestimmter Fehler aufgetreten.' + error.message;
                }
            }
        );
  }


}
