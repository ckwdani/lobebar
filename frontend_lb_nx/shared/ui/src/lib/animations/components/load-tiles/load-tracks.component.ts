import { Component, OnInit } from '@angular/core';
import {InSiteAnimations} from "../../InSiteAnimations";


@Component({
  selector: 'frontend-lb-nx-load-tracks',
  templateUrl: './load-tracks.component.html',
  styleUrls: ['./load-tracks.component.scss'],
  animations: [InSiteAnimations.sequentialFadeIn, InSiteAnimations.inOutAnimation]
})
export class LoadTilesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
