import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prof-admin',
  templateUrl: './prof-admin.component.html',
  styleUrls: ['./prof-admin.component.scss']
})
export class ProfAdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  showDrop(drop) {
    $(drop).addClass('open');
    var height = $(drop).children().length * 50;
    $(drop).animate({'height': height + 'px'}, 200, 'easeInOutCubic');
  }

  hideDrop(drop) {
    $(drop).animate({'height': '50px'}, 200, 'easeInOutCubic');
    $(drop).removeClass('open');
  }

}
