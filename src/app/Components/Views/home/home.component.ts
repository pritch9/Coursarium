import {Component, OnInit} from '@angular/core';
import {LogOutService} from '../../../Services/Authentication/LogOut/log-out.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private logoutService: LogOutService) { }


  ngOnInit() {
  }

  logout() {
    this.logoutService.logout();
  }

}
