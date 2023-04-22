import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CalendarView} from "angular-calendar";
import {CalendarDatePipe} from "angular-calendar/modules/common/calendar-date/calendar-date.pipe";

@Component({
  selector: 'frontend-lb-nx-calendar-header',
  templateUrl: './calender-header.component.html',
  styleUrls: ['./calender-header.component.scss'],
})

export class CalendarHeaderComponent{
  @Input() view = CalendarView.Month;

  @Input() viewDate: Date = new Date(Date.now());

  @Input() locale= 'de';

  @Output() viewDateChange = new EventEmitter<Date>();

  CalendarView = CalendarView;
}

