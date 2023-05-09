import { Component } from '@angular/core';
import {Achievement, Shift} from "@frontend-lb-nx/shared/entities";

@Component({
  selector: 'frontend-lb-nx-achievements-overview',
  templateUrl: './achievements-overview.component.html',
  styleUrls: ['./achievements-overview.component.scss'],
})
export class AchievementsOverviewComponent {
  achievements: Achievement[] = [{title: "Mitglied", description: "Mitglied von EmilsEcke", imageUrl: "assets/emilsecke_logo.png", achieved: true},
    {title: "Mitglied", description: "Mitglied von EmilsEcke", imageUrl: "assets/emilsecke_logo.png", achieved: false}];

}
