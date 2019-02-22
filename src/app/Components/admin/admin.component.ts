import { Component, OnInit } from '@angular/core';
import {TestHTTPService} from '../../Services/TestHTTP/test-http.service';
import {UserInfo} from '../../Models/User/userinfo';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  user?: UserInfo;

  constructor(private httpTest: TestHTTPService) { }

  ngOnInit() {
    console.log('gettng user1');
    this.httpTest.testGetUserByIdSuccess().subscribe(user => {
      this.user = user;
    });
  }

}
