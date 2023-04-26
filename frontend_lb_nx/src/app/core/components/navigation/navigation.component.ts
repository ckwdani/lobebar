import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {Store} from "@ngrx/store";
import {loadTokenFromLocal, selectLoggedIn, selectSuccess, selectUserLoaded} from "@frontend-lb-nx/shared/services";

@Component({
  selector: 'frontend-lb-nx-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  $isLoggedIn = this.store.select(selectLoggedIn).pipe(first());
  $userLoaded = this.store.select(selectUserLoaded).pipe(first());

  constructor(private breakpointObserver: BreakpointObserver, private store:Store) {

  }

  ngAfterViewInit(): void {
    combineLatest([this.$isLoggedIn, this.$userLoaded]).subscribe(([isLoggedIn, userLoaded]) => {
      if(!isLoggedIn){
        this.store.dispatch(loadTokenFromLocal());
      }
    });
  }

}
