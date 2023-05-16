import {Component, Input} from '@angular/core';
import {Achievement} from "@frontend-lb-nx/shared/entities";

@Component({
  selector: 'frontend-lb-nx-single-achievement',
  templateUrl: './single-achievement.component.html',
  styleUrls: ['./single-achievement.component.scss'],
})
export class SingleAchievementComponent {
  @Input() achievement?: Achievement;
  @Input() displayTitle = true;
  @Input() widthAndHeight = "w-12 h-12"

}
