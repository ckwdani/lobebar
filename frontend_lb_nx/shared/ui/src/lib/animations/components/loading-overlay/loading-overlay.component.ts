import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss']
})
export class LoadingOverlayComponent implements OnInit {

  @Input() isContainer = false;
  @Input() withRadius = false;
  @Input() withNavigation = true;
  constructor() { }

  ngOnInit(): void {
  }

}
