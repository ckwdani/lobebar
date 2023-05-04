import {AfterViewInit, Component} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {asapScheduler, combineLatest, filter, first, Observable, observeOn} from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {Store} from "@ngrx/store";
import {
  loadOrgEvents, loadOutstandingShifts, loadOwnShifts,
  loadTokenFromLocal,
  selectLoggedIn,
  selectOrgEvents,
  selectSuccess, selectUser,
  selectUserLoaded
} from "@frontend-lb-nx/shared/services";
import {loadShiftTypes} from "../../../../../shared/services/src/lib/backend/states/shift-types/shift-type.actions";
import * as AuthActions from "../../../../../shared/services/src/lib/backend/states/auth/auth.actions";

@Component({
  selector: 'frontend-lb-nx-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements AfterViewInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  $isLoggedIn = this.store.select(selectLoggedIn).pipe(first());
  $isLoggedInAll = this.store.select(selectLoggedIn);
  $userLoaded = this.store.select(selectUserLoaded).pipe(first());
  $shiftTypesLoaded = this.store.select(selectSuccess).pipe(first());
  $loggedInUser = this.store.select(selectUser);

  constructor(private breakpointObserver: BreakpointObserver, private store:Store) {

  }

  ngAfterViewInit(): void {

    combineLatest([this.$isLoggedIn, this.$userLoaded, this.$shiftTypesLoaded, this.$isLoggedInAll]).subscribe(([isLoggedIn, userLoaded, shiftTypesLoaded,isLoggedInAll]) => {
      console.log(isLoggedInAll, shiftTypesLoaded)
      if(!isLoggedIn){
        this.store.dispatch(loadTokenFromLocal());
      }
      if(isLoggedInAll && !shiftTypesLoaded){
        // where do we want to load this all
        this.store.dispatch(loadShiftTypes());
        this.store.dispatch(loadOutstandingShifts());
        this.store.dispatch(loadOwnShifts());
        this.store.dispatch(loadOrgEvents());
      }
    });
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
