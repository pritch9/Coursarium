import {Component, OnInit} from '@angular/core';
import {UserInfo} from '../../../Models/User/userinfo';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  user?: UserInfo;

  constructor() {
  }

  ngOnInit() {
  }

}
