import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import {MatDatetimepickerModule} from "@mat-datetimepicker/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { DoneExOverviewComponent } from './components/overviewlists-and-tables/done-ex-overview/done-ex-overview.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSortModule} from "@angular/material/sort";
import {SharedUiModule} from "@frontend-lb-nx/shared/ui";

@NgModule({
  declarations: [
    NavigationComponent,

      DoneExOverviewComponent,
  ],
    exports: [
        NavigationComponent,

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
