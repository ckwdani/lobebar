import { Component } from '@angular/core';
import {ResetPasswortService} from "../../services/reset-passwort.service";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'frontend-lb-nx-res-pw',
  templateUrl: './res-pw.component.html',
  styleUrls: ['./res-pw.component.scss'],
})
export class ResPwComponent {
  email = '';
  successMessage = '';
  errorMessage = '';
  fcemail = new FormControl(this.email, [Validators.required, Validators.email])

  constructor(private passwordResetService: ResetPasswortService) {}

  submitForm() {
    this.passwordResetService.resetPassword(this.email)
        .subscribe(
            () => {
              this.successMessage = 'Password reset link sent successfully.';
              this.errorMessage = '';
            },
            (error) => {
              this.successMessage = '';
              this.errorMessage = 'An error occurred while sending the reset link.'+error.statusText;
              console.error(error);
            }
        );
  }
}
