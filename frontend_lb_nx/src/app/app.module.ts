import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FeaturesModule } from './features/features.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
//import {CalendarModule, DateAdapter} from "angular-calendar";
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {
  MatNativeDatetimeModule,
} from '@mat-datetimepicker/core';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {EntityDataModule} from "@ngrx/data";
import {entityConfig} from "../../shared/entities/src/lib/entity-metadata";
import {provideEntityDataConfig} from "@ngrx/data/src/provide-entity-data";
import {GermanDateProvider} from "./core/utils/GermanDateAdapter";

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatNativeDateModule,
    MatNativeDatetimeModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    StoreModule.forRoot({}),
    FeaturesModule,
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
  ],
  providers: [


  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
