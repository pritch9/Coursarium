import { Component, OnInit } from '@angular/core';
import {TestHTTPService} from '../../Services/TestHTTP/test-http.service';

@Component({
  selector: 'splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {

  output: string;

  constructor() { }

  ngOnInit() {
  }

}
