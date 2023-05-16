import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {InSiteAnimations} from "@frontend-lb-nx/shared/ui";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'frontend-lb-nx-start-end-date-input',
  templateUrl: './start-end-date-input.component.html',
  styleUrls: ['./start-end-date-input.component.scss'],
  animations: [InSiteAnimations.getInOutAnimationWithLEngth(500)]
})
export class StartEndDateInputComponent implements OnChanges{

  startDateEdited = false;
  endDateEdited = false;

  @Input() startDate!: Date;
  @Output() startDateChange = new EventEmitter<Date>();
  @Input() EndDate!: Date;
    @Output() EndDateChange = new EventEmitter<Date>();

  @Input() myForm!:  FormGroup<{date: FormControl<string | null>,
                      afterDate: FormControl<string | null>}>;


  constructor(private ref: ChangeDetectorRef) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.ref.detectChanges()
  }

  changeDate(event: any, start: boolean) {

    const date = event as Date;
    console.log(date.getTime())
    if (start) {
      // set the end date to the same as the start date plus 1 hour
      if(!this.startEndValid(date, this.EndDate)){
        // flag for displaying a warning
        this.endDateEdited = true;
        // edit the counter date, so that the constraints are met
        this.EndDate = new Date(date.getTime() + 60 * 60 * 1000);
      }else{
        this.endDateEdited = false;
      }
    }
    else {
      if(!this.startEndValid(this.startDate, date)){
        // flag for displaying a warning
        this.startDateEdited = true;
        // edit the counter date, so that the constraints are met
        this.startDate = new Date(date.getTime() - 60 * 60 * 1000);
      }else{
        this.startDateEdited = false;
      }
    }
    this.emitDates();
  }

  changeTime(event: any, start: boolean) {
    const time = event as Date;

    if (start) {
      this.startDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate(), time.getHours(), time.getMinutes());
      // after the change, call the change Date method, as it handles the event to public
      this.changeDate(this.startDate, true);
    }
    else {
      this.EndDate = new Date(this.EndDate.getFullYear(), this.EndDate.getMonth(), this.EndDate.getDate(), time.getHours(), time.getMinutes());
      // after the change, call the change Date method, as it handles the event to public
      this.changeDate(this.EndDate, false);
    }


  }

  startEndValid(start: Date, end: Date){
    return start.getTime() < end.getTime();
  }


  emitDates(){
    this.startDateChange.emit(this.startDate);
    this.EndDateChange.emit(this.EndDate);
  }
}
