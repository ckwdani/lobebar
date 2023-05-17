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
  selectOwnUser,
  selectOwnUserState,
  selectUser,
  updateSelectedAchievement
} from "@frontend-lb-nx/shared/services";
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
  $userObs = this.store.select(selectOwnUser)
  achievementsLoaded?: AchievementBackend
  //@ViewChildren('myDiv') myDivList: QueryList<ElementRef>|undefined;
  myDivState = 'start';
  selectedAchievment?: Partial<Achievement>

  achievements: Achievement[] = [];
  constructor(private store: Store) {
    //TODO: handle this in a more robust way,
    this.$userObs.subscribe(next=> {
      this.achievementsLoaded=next?.achievements
      this.selectedAchievment = next?.selectedAchievement
      this.genAchievements();
    })
  }

  genAchievements(){
    if(this.achievementsLoaded!=undefined){
      const shiftsScore = this.achievementsLoaded?.shiftsScore ?? 0;
      const negativeBalance = this.achievementsLoaded?.negativeBalance ?? 0;
      const shiftsStreak = this.achievementsLoaded?.shiftStreak?? 0;
      this.achievements.push(new AchievementMitglied())
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
      if(this.selectedAchievment?.extraString!=undefined&& this.selectedAchievment?.extraString!='0'){
        this.achievements.forEach(a => a.achievementCode==this.selectedAchievment?.achievementCode ? (a.selected=true , a.extraString=this.selectedAchievment.extraString) : a.selected=false)
      }else{
        this.achievements.forEach(a => a.achievementCode==this.selectedAchievment?.achievementCode ? a.selected=true : a.selected=false)
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
      this.store.dispatch(updateSelectedAchievement({achievement: elem}))
      this.achievements = []
      this.myDivState ="start";
    }
  }
}
