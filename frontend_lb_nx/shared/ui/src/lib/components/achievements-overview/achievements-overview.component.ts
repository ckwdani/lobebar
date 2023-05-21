import {Component, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {
  Achievement,
  AchievementBackend, AchievementMitglied,
  AchievementSchichtenAnzahl,
  AchievementStreak,
  Shift
} from "@frontend-lb-nx/shared/entities";
import {Store} from "@ngrx/store";
import {
  selectOwnUser, selectOwnUserLoading,
  selectOwnUserState,
  selectUser,
  updateSelectedAchievement
} from "@frontend-lb-nx/shared/services";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {of} from "rxjs";
import {map} from "rxjs/operators";
import {InSiteAnimations} from "@frontend-lb-nx/shared/ui";

@Component({
  selector: 'frontend-lb-nx-achievements-overview',
  templateUrl: './achievements-overview.component.html',
  styleUrls: ['./achievements-overview.component.scss'],
  animations:  [
      InSiteAnimations.inOutAnimationSequential,
    trigger('divAnimation', [
      state('start', style({
        opacity: '1',
      })),
      state('end', style({
        opacity: '0.2',
      })),
      transition('start <=> end', [
        animate('500ms')
      ])
    ])
  ]
})
export class AchievementsOverviewComponent {
  $userObs = this.store.select(selectOwnUser)
  myDivState = 'start';

  $loading = this.store.select(selectOwnUserLoading)


  $achievements = this.$userObs.pipe(map(user => {
    const achievementsLoaded = user?.achievements;
    const selectedAchievment = user?.selectedAchievement;

    const shiftsScore = achievementsLoaded?.shiftsScore ?? 0;
    const negativeBalance = achievementsLoaded?.negativeBalance ?? 0;
    const shiftsStreak = achievementsLoaded?.shiftStreak?? 0;

    const returnAchievements: Achievement[] = [];


    returnAchievements.push(new AchievementMitglied())
    if(shiftsStreak>0){
      returnAchievements.push(new AchievementStreak(false,true, shiftsStreak.toString()))
    }else{
      returnAchievements.push(new AchievementStreak(false,false, undefined))
    }
    if(shiftsScore>0){
      returnAchievements.push(new AchievementSchichtenAnzahl(false,true, shiftsScore.toString()))
    }else{
      returnAchievements.push(new AchievementSchichtenAnzahl(false,false, undefined))
    }
    if(selectedAchievment?.extraString!=undefined&& selectedAchievment?.extraString!='0'){
      returnAchievements.forEach(a => a.achievementCode==selectedAchievment?.achievementCode ? (a.selected=true , a.extraString=selectedAchievment.extraString) : a.selected=false)
    }else{
      returnAchievements.forEach(a => a.achievementCode==selectedAchievment?.achievementCode ? a.selected=true : a.selected=false)
    }
    return returnAchievements;
  }))


  achievements: Achievement[] = [];
  constructor(private store: Store) {

  }





    toggleAnimationState() {
    this.myDivState = this.myDivState === 'start' ? 'end' : 'start';
  }

  selectAchievement(elem: Achievement) {
    if(elem.achieved && this.myDivState==="end"){
      this.achievements.forEach(a =>{
        a!=elem ? a.selected=false : a.selected=true
      })
      this.store.dispatch(updateSelectedAchievement({achievement: elem}))
      this.achievements = []
      this.myDivState ="start";
    }
  }
}
