import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterLink } from '@angular/router';
import { EditStringDialogComponent } from './components/dialogs/edit-string-dialog/edit-string-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  ImportantDeleteDialogComponent
} from "./components/dialogs/important-delete-dialog/important-delete-dialog.component";


@NgModule({
  declarations: [
    NavigationComponent,
    EditStringDialogComponent,
    ImportantDeleteDialogComponent,
  ],
  exports: [NavigationComponent, EditStringDialogComponent, ImportantDeleteDialogComponent],
  imports: [
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    RouterLink,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
})
export class CoreModule {}
