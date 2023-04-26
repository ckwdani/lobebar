import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'frontend-lb-nx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend-lb-nx';
  isLogin = false;

  constructor(protected router: Router, private route: ActivatedRoute){
    router.events.subscribe(
        event => {
          if (router.url === '/login'){
            this.isLogin = true;
          }
          else {
            this.isLogin = false;
          }
        }
    );
  }
}
