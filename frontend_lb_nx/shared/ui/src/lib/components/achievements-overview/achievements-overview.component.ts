import { Component } from '@angular/core';
import {Achievement, Shift} from "@frontend-lb-nx/shared/entities";

@Component({
  selector: 'frontend-lb-nx-achievements-overview',
  templateUrl: './achievements-overview.component.html',
  styleUrls: ['./achievements-overview.component.scss'],
})
export class AchievementsOverviewComponent {
  achievements: Achievement[] = [{title: "Mitglied", description: "Mitglied von EmilsEcke", imageUrl: "assets/emilsecke_logo.png", achieved: true},
    {title: "asd", description: "Schichten übernommen.", imageUrl: "assets/trophy-48.png", achieved: true, extraString: "5"},
    {title: "asd", description: "Stern", imageUrl: "assets/stern-64.png", achieved: true, extraString: "1"}
  ];

}
