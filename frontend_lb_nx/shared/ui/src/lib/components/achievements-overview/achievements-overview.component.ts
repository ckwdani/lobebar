import { Component } from '@angular/core';
import {
  Achievement,
  AchievementBackend,
  AchievementSchichtenAnzahl,
  AchievementStreak,
  Shift
} from "@frontend-lb-nx/shared/entities";
import {Store} from "@ngrx/store";
import {selectUser} from "@frontend-lb-nx/shared/services";

@Component({
  selector: 'frontend-lb-nx-achievements-overview',
  templateUrl: './achievements-overview.component.html',
  styleUrls: ['./achievements-overview.component.scss'],
})
export class AchievementsOverviewComponent {
  $userObs = this.store.select(selectUser)
  achievementsLoaded?: AchievementBackend

  achievements: Achievement[] = [{title: "Mitglied", description: "Mitglied von EmilsEcke", imageUrl: "assets/emilsecke_logo.png", achieved: true},
  ];
  constructor(private store: Store) {
    this.$userObs.subscribe(next=> {
      this.achievementsLoaded=next?.achievements
      this.genAchievements();
    })
  }

  genAchievements(){
    if(this.achievementsLoaded!=undefined){
      const shiftsScore = this.achievementsLoaded?.shiftsScore ?? 0;
      const negativeBalance = this.achievementsLoaded?.negativeBalance ?? 0;
      const shiftsStreak = this.achievementsLoaded?.shiftStreak?? 0;
      if(shiftsStreak>0){
        this.achievements.push(new AchievementStreak(true, shiftsStreak.toString()))
      }else{
        this.achievements.push(new AchievementStreak(false, undefined))
      }
      if(shiftsScore>0){
        this.achievements.push(new AchievementSchichtenAnzahl(true, shiftsScore.toString()))
      }else{
        this.achievements.push(new AchievementSchichtenAnzahl(false, undefined))
      }
    }
    }
}
