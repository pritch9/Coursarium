import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-component-test',
  templateUrl: './component-test.component.html',
  styleUrls: ['./component-test.component.scss']
})
export class ComponentTestComponent implements OnInit {

  group: FormGroup;
  searchText = '';

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.group = this.formBuilder.group({
      school: ['', Validators.required]
    });
  }

  click() {
    console.log(this.group);
  }

}
