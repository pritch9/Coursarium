import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'school-finder',
  templateUrl: './school-finder.component.html',
  styleUrls: ['./school-finder.component.scss']
})
export class SchoolFinderComponent implements OnInit {

  searchText: string;

  constructor() { }

  ngOnInit() {
  }

}
