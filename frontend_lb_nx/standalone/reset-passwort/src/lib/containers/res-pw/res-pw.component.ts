import { Component } from '@angular/core';

@Component({
  selector: 'frontend-lb-nx-res-pw',
  templateUrl: './res-pw.component.html',
  styleUrls: ['./res-pw.component.scss'],
})
export class ResPwComponent {
  email = '';
  successMessage = '';
  errorMessage = '';

  constructor() {}

  submitForm() {
    /*
    this.passwordResetService.resetPassword(this.email)
        .subscribe(
            () => {
              this.successMessage = 'Password reset link sent successfully.';
              this.errorMessage = '';
            },
            (error) => {
              this.successMessage = '';
              this.errorMessage = 'An error occurred while sending the reset link.';
              console.error(error);
            }
        );

     */
  }
}
