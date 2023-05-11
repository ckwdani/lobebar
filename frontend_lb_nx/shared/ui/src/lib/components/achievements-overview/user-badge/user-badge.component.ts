import {Component, Input, OnInit} from '@angular/core';
import {Achievement, genSelectedAchievement, User} from "@frontend-lb-nx/shared/entities";
import {Observable, switchMap} from "rxjs";

@Component({
  selector: 'frontend-lb-nx-user-badge',
  templateUrl: './user-badge.component.html',
  styleUrls: ['./user-badge.component.scss'],
})
export class UserBadgeComponent implements OnInit{
  @Input() user?: User;
  achievement?: Achievement

  ngOnInit(): void {
    this.achievement=genSelectedAchievement(this.user?.selectedAchievement?.achievementCode, this.user?.selectedAchievement?.extraString)
  }
}
