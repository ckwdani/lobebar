import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {filter, first, Observable} from 'rxjs';
import {selectOwnUser} from "@frontend-lb-nx/shared/services";
import {Store} from "@ngrx/store";
import {environment} from "../../../../../src/environments/environment";
import {UserFunctions, UserRoles} from "@frontend-lb-nx/shared/entities";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
  constructor(private store: Store, private router: Router) {
  }
  $user = this.store.select(selectOwnUser).pipe(first())
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let userRoleEnum: UserRoles
    this.$user.pipe(filter(user=> user!=undefined)).subscribe(user=>{
      userRoleEnum=UserFunctions.getRole(user!)

      //ADMIN CAN ROUTE ANYWHERE
      if(userRoleEnum ==UserRoles.ADMIN){
        return true;
      }

      //MODERATOR CAN ROUTE ANYWHERE EXCEPT THE USERS OVERVIEW
      if(userRoleEnum == UserRoles.MODERATOR){
        if(route.routeConfig?.path=="users_overview"){
          this.router.navigate(['user_overview'])
          return false
        }
        return true;
      }

      //ORGANIZER CANT ROUTE TO USERS OVERVIEW AND ALSO CANT ADD SHIFTTYPES/EXTRAWORK/SNACKS
      if(userRoleEnum==UserRoles.ORGANIZER){
        if(route.routeConfig?.path=="users_overview"){
          this.router.navigate(['user_overview'])
          return false
        }
        if(route.routeConfig?.path=="shift_types"){
          this.router.navigate(['event_overview']);
          return false;
        }
        return true;
      }

      if(!environment.production){
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
          this.router.navigate(['dashboard']);
          return false;
      }
    })

    return new Observable<any>((observer)=>{
      observer.next()
    })
  }

}
