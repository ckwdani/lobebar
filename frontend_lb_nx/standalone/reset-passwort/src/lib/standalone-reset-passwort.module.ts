import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ResPwComponent } from './containers/res-pw/res-pw.component';
import { ResetPwWithCodeComponent } from './containers/reset-pw-with-code/reset-pw-with-code.component';
import {SuccessCheckComponent} from "./containers/success-check/success-check.component";
import {PasswordResetExtra, ResetPasswortService} from './services/reset-passwort.service';
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";

export const resetPwRoutes: Route[] = [
  { path: '', component: ResPwComponent },
  { path: ':code', component: ResetPwWithCodeComponent },
];



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressBarModule,
  ],
  declarations: [
    ResPwComponent,
    ResetPwWithCodeComponent,
    SuccessCheckComponent,
  ],
})
export class StandaloneResetPasswortModule {
  static forRoot(
    memberData: PasswordResetExtra
  ): ModuleWithProviders<StandaloneResetPasswortModule> {
    return {
      ngModule: StandaloneResetPasswortModule,
      providers: [
        ResetPasswortService,
        { provide: 'pw-reset-extra', useValue: memberData },
      ],
    };
  }
}
