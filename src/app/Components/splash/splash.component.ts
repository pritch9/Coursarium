import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {

  showing = false;

  currentUser = {
    name: 'Will'
  };

  constructor() { }

  ngOnInit() {
  }

  showDD(event: any) {
    console.log('show');
    $(event.target).find('.menu').addClass('show');
    this.showing = true;
  }

  hideDD(event: any) {
    console.log('hide?');
    if (this.showing) {
      $('.menu.show').removeClass('show');
      this.showing = false;
    }
  }

  logOut() {
    console.log('Log out: ' + this.currentUser.name);
  }

}
