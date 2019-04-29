import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-component-test',
  templateUrl: './component-test.component.html',
  styleUrls: ['./component-test.component.scss']
})
export class ComponentTestComponent implements OnInit {

  inputText: any = '';

  constructor() { }

  ngOnInit() {
  }

  input($event) {
    this.inputText = $($event.target).val();
  }

  hash() {
  }

}
