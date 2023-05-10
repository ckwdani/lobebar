import {EnvironmentInjector, inject, Injectable, Injector} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {first, Observable} from 'rxjs';
import {selectUserRole} from "@frontend-lb-nx/shared/services";
import {Store} from "@ngrx/store";
import {environment} from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
  constructor(private store: Store, private router: Router) {
  }
  $roleUser = this.store.select(selectUserRole).pipe(first())
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let role: Array<string>|undefined
    this.$roleUser.subscribe(next=>{
      role=next
      if(role?.includes("ROLE_ADMIN")){
        return true;
      }
      console.log(route.routeConfig?.path)
      if(environment.production){
        return new Observable();
      }
      switch (route.routeConfig?.path) {
        case "users_overview":
          this.router.navigate(['user_overview']);
          return false;
        case "event_add":
          this.router.navigate(['event_overview']);
          return false;
        case "shift_add":
          this.router.navigate(['event_overview']);
          return false;
        case "shift_types":
          this.router.navigate(['dashboard']);
          return false;
        default:
          this.router.navigate(['']);
          return false;
      }
    })

    return new Observable<any>((observer)=>{
      observer.next()
    })
  }

}
