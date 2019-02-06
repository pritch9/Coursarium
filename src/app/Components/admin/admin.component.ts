import { Component, OnInit } from '@angular/core';
import {TestHTTPService} from '../../Services/TestHTTP/test-http.service';
import {errorHandler} from '@angular/platform-browser/src/browser';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  httpConnect: any;

  constructor(private httpTest: TestHTTPService) { }

  ngOnInit() {
    this.httpTest.testServer().subscribe(output => this.httpConnect = output);
  }

}
