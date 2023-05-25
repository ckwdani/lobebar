import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterLink } from '@angular/router';
import { EditStringDialogComponent } from './components/dialogs/edit-string-dialog/edit-string-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ImportantDeleteDialogComponent } from './components/dialogs/important-delete-dialog/important-delete-dialog.component';
import { Store } from '@ngrx/store';
import { NumberInputDialogComponent } from './components/dialogs/number-input-dialog/number-input-dialog.component';
import { EditDateTimeDialogComponent } from './components/dialogs/edit-date-time-dialog/edit-date-time-dialog.component';
import {MatDatetimepickerModule} from "@mat-datetimepicker/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatTooltipModule} from "@angular/material/tooltip";
import { DropdownMenuDialogComponent } from './components/dialogs/dropdown-menu-dialog/dropdown-menu-dialog.component';
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { DoneExOverviewComponent } from './components/overviewlists-and-tables/done-ex-overview/done-ex-overview.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSortModule} from "@angular/material/sort";
import {SharedUiModule} from "@frontend-lb-nx/shared/ui";
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    NavigationComponent,
    EditStringDialogComponent,
    ImportantDeleteDialogComponent,
    NumberInputDialogComponent,
    EditDateTimeDialogComponent,
    DropdownMenuDialogComponent,
    DoneExOverviewComponent,
    ConfirmDialogComponent,
  ],
    exports: [
        NavigationComponent,
        EditStringDialogComponent,
        ImportantDeleteDialogComponent,
        DoneExOverviewComponent,
    ],
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
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatDatetimepickerModule,
        MatTooltipModule,
        MatSelectModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatSortModule,
        SharedUiModule,

    ],
  providers: [Router, Store],
})
export class CoreModule {}
