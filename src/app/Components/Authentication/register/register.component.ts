import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'account-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerFG: FormGroup;
  submitted = false;
  @Input() school: number;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerFG = this.formBuilder.group({
      school: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirm: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required]
    });
  }

  updateSchool($event) {
    this.school = $event;
  }

  register(): void {

  }

}
