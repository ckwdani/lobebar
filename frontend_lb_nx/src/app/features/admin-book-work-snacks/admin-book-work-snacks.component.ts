import {Component, ElementRef, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {
  selectEWTypes,
  selectSnackTypes
} from "../../../../shared/services/src/lib/backend/states/shift-types/shift-type.selectors";
import {UsersOverviewStore} from "../overviews/users-overview/users-overview.store";
import {filter, Observable, of} from "rxjs";
import {User} from "@frontend-lb-nx/shared/entities";
import {map} from "rxjs/operators";
import {MatSelect} from "@angular/material/select";
import {InSiteAnimations} from "@frontend-lb-nx/shared/ui";

@Component({
  selector: 'frontend-lb-nx-admin-book-work-snacks',
  templateUrl: './admin-book-work-snacks.component.html',
  styleUrls: ['./admin-book-work-snacks.component.scss'],
  animations: [InSiteAnimations.sequentialFadeIn],
})
export class AdminBookWorkSnacksComponent {

  $users = this.usersStore.selectUsers$
  $snackTypes = this.store.select(selectSnackTypes)
  $extraWorkTypes = this.store.select(selectEWTypes)

  $filteredUsers = this.$users

  $clickedUser: Observable<User>|undefined

  constructor(private store: Store, private usersStore: UsersOverviewStore) {
    this.usersStore.loadUsers()
  }

  onKey(event: Event) {
    const {target} = event
    if(target){
      const searchString = (target as HTMLTextAreaElement).value
      this.$filteredUsers = this.filterUsersByAnyString(searchString, this.$users)
    }
  }

  getStringAttributes(user: User){
    const attr =Object.values(user)
    //remove id
    attr.shift()
    return attr.filter(attr=> typeof attr==="string")
  }

  private filterUsersByAnyString(value: string, users$: Observable<User[]>): Observable<User[]> {
    const filterValue = value.toLowerCase();
    return users$.pipe(
        map($users => $users.filter(user =>
            Object.values(user).some(attr =>
            typeof attr === 'string' && attr.toLowerCase().includes(filterValue)
            )
        ))
    );
  }



  clickUser(user: User) {
    this.$clickedUser=of(user)
  }

  clickIfOneUser() {
    if(this.$filteredUsers.pipe(map($users => $users.length==1))){
      this.$clickedUser = this.$filteredUsers.pipe(map($users=>$users[0]))
    }
  }

  protected readonly Object = Object;
  protected readonly of = of;
}
