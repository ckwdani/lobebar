import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {
  selectLoggedIn,
  selectOutstandingShifts,
  selectOwnShifts, selectShiftsLoading,
  selectUser,
  selectUserLoaded
} from "@frontend-lb-nx/shared/services";
import {BreakpointObserver} from "@angular/cdk/layout";
import {Store} from "@ngrx/store";
import {tap} from "rxjs";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {map} from "rxjs/operators";

@Component({
  selector: 'frontend-lb-nx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit{
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatPaginator, {static: true}) sort: MatPaginator | undefined;

  @ViewChild(MatPaginator) paginator2?: MatPaginator;
  @ViewChild(MatPaginator, {static: true}) sort2: MatPaginator | undefined;

  $userNameObs= this.store.select(selectUser)
  $outStandingShiftsObs = this.store.select(selectOutstandingShifts)
      //.pipe(tap(user => console.log(user)));
  $ownShiftsObs= this.store.select(selectOwnShifts).pipe()
  $nearestShiftObs = this.store.select(selectOwnShifts).pipe(map(shifts => shifts[0]))

  $shiftsLoaded = this.store.select(selectShiftsLoading)
  $displayOwnShifts = this.$ownShiftsObs
  $displayOutStandingShiftsObs = this.$outStandingShiftsObs
  tooltipOwnShift = "Gehe zum Event: "

  constructor(private store:Store) {
  }

  ngAfterViewInit(): void {
    this.$displayOwnShifts=this.$ownShiftsObs
    this.$displayOutStandingShiftsObs=this.$outStandingShiftsObs
    if(this.paginator!==undefined){
      this.sort = this.paginator
    }
    this.onPageChange({pageIndex: 0, pageSize: this.paginator?.pageSize??5, length: 0})
    if(this.paginator2!==undefined){
      this.sort2 = this.paginator2
    }
    this.onPageChange2({pageIndex: 0, pageSize: this.paginator2?.pageSize??5, length: 0})
  }

  ngOnInit(): void {
    this.$displayOwnShifts=this.$ownShiftsObs
    this.$displayOutStandingShiftsObs=this.$outStandingShiftsObs
  }

  onPageChange($event: PageEvent) {
    const startIndex = $event.pageIndex * $event.pageSize;
    const endIndex = startIndex + $event.pageSize;
    this.$displayOwnShifts = this.$ownShiftsObs?.pipe(map(shifts => shifts.slice(startIndex, endIndex)));
  }

  onPageChange2($event: PageEvent) {
    const startIndex = $event.pageIndex * $event.pageSize;
    const endIndex = startIndex + $event.pageSize;
    this.$displayOutStandingShiftsObs = this.$outStandingShiftsObs?.pipe(map(shifts => shifts.slice(startIndex, endIndex)));
  }

}
