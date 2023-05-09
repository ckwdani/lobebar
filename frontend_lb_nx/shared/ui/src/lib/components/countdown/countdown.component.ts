import {Component, Input, OnInit} from '@angular/core';
import {interval, Observable, of} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'frontend-lb-nx-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit {

  @Input() targetDate: Date = new Date(Date.now());

  countdown$: Observable<Countdown> = of({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  countDownSmallerThanOneDay$ = this.countdown$.pipe(map(next => next.days < 1));

  ngOnInit() {
    if(!this.isPast()){
      // Calculate the countdown
      this.countdown$ = interval(1000).pipe(
          map(() => this.calculateCountdown())
      );
    }
  }

  // check wheter the date is in the past
    isPast(): boolean {
        const now = new Date();
        const targetDate = new Date(this.targetDate)
        const timeDifference = targetDate.getTime() - now.getTime();
        return timeDifference < 0;
    }

  calculateCountdown(): Countdown {
    const now = new Date();
    const targetDate = new Date(this.targetDate)
    const timeDifference = targetDate.getTime() - now.getTime();

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }
}

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
