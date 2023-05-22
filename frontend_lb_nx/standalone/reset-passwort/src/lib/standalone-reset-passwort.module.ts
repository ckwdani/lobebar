import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResPwComponent } from './containers/res-pw/res-pw.component';
import {Route, RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";


export const resetPwRoutes: Route[] = [
  { path: 'reset-password', component: ResPwComponent}
]

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, MatCardModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  declarations: [ResPwComponent],
})
export class StandaloneResetPasswortModule {}
