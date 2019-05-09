import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {

  school: number;

  constructor() {
  }

  ngOnInit() {

  }

  updateSchool($event) {
    this.school = $event;
  }


}
