import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {

  school: number;

  currentUser = {
    name: 'Will'
  };

  constructor() { }

  ngOnInit() {

  }

  updateSchool($event) {
    this.school = $event;
  }

  showDD(event: any) {
    console.log('show');
    $(event.target).find('.menu').addClass('show');
  }

  hideDD(event: any) {
    $('.menu.show').removeClass('show');
  }

  showRegister() {
    $('account-register #parent').addClass('show');
  }

  logOut() {
    console.log('Log out: ' + this.currentUser.name);
  }

}
