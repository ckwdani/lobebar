import {Component, Input, OnInit} from '@angular/core';
import {Achievement, genSelectedAchievement, User} from "@frontend-lb-nx/shared/entities";
import {Observable, of, Subscription, switchMap} from "rxjs";
import {Store} from "@ngrx/store";
import {selectSelectedAchievment} from "@frontend-lb-nx/shared/services";

@Component({
  selector: 'frontend-lb-nx-user-badge',
  templateUrl: './user-badge.component.html',
  styleUrls: ['./user-badge.component.scss'],
})
export class UserBadgeComponent{
  @Input() user?: User
  $selAchievement = this.store.select(selectSelectedAchievment)

  constructor(private store: Store) {
  }

  protected readonly of = of;
  protected readonly genSelectedAchievement = genSelectedAchievement;
}
