import {Component, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {
  Achievement,
  AchievementBackend,
  AchievementSchichtenAnzahl,
  AchievementStreak,
  Shift
} from "@frontend-lb-nx/shared/entities";
import {Store} from "@ngrx/store";
import {selectUser} from "@frontend-lb-nx/shared/services";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'frontend-lb-nx-achievements-overview',
  templateUrl: './achievements-overview.component.html',
  styleUrls: ['./achievements-overview.component.scss'],
  animations:  [
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
  $userObs = this.store.select(selectUser)
  achievementsLoaded?: AchievementBackend
  //@ViewChildren('myDiv') myDivList: QueryList<ElementRef>|undefined;
  myDivState = 'start';

  achievements: Achievement[] = [{title: "Mitglied", description: "Mitglied von EmilsEcke", imageUrl: "assets/emilsecke_logo.png", achieved: true, selected: false},
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
        this.achievements.push(new AchievementStreak(false,true, shiftsStreak.toString()))
      }else{
        this.achievements.push(new AchievementStreak(false,false, undefined))
      }
      if(shiftsScore>0){
        this.achievements.push(new AchievementSchichtenAnzahl(false,true, shiftsScore.toString()))
      }else{
        this.achievements.push(new AchievementSchichtenAnzahl(false,false, undefined))
      }
    }
    }

  toggleAnimationState(myDiv: any) {
    this.myDivState = this.myDivState === 'start' ? 'end' : 'start';
  }

  selectAchievement(elem: Achievement) {
    if(elem.achieved && this.myDivState==="end"){
      this.achievements.forEach(a =>{
        a!=elem ? a.selected=false : a.selected=true
      })
      this.myDivState ="start";
    }
  }
}
