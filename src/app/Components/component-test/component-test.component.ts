import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-component-test',
  templateUrl: './component-test.component.html',
  styleUrls: ['./component-test.component.scss']
})
export class ComponentTestComponent implements OnInit {

  inputText: any = '';
  focused = false;

  constructor() { }

  ngOnInit() {
  }

  focus() {
    this.focused = true;
  }

  blur() {
    this.focused = false;
  }

  input($event) {
    this.inputText = $($event.target).val();
  }

}
