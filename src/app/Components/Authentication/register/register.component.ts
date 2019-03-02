import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SplashService} from '../../Views/splash/Service/splash.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../../Services/Authentication/authentication.service';
import {TitleCasePipe} from '@angular/common';

@Component({
  selector: 'account-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerFG: FormGroup;
  formInvalids;
  submitted = false;
  school: number;
  hideTitle = false;
  titlecase = 'titlecase';
  private sub: any;
  @ViewChild('schoolFinder') schoolFinder: ElementRef;

  constructor(private formBuilder: FormBuilder,
              private splashService: SplashService,
              private auth: AuthenticationService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.school = +params.school; // (+) converts string 'school' to number
    });
    this.registerFG = this.formBuilder.group({
      school: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9]{3,}')]],
      password: ['', [Validators.required, Validators.pattern(
        '(?=^.{8,100}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;\'?/>.<,])(?!.*\\s).*$')]],
      confirm: ['', Validators.required],
      first_name: ['', [Validators.required, Validators.pattern('[a-zA-Z\',. -]+')]],
      last_name: ['', [Validators.required, Validators.pattern('[a-zA-Z\',. -]+')]]
    });
    this.formInvalids = {
      email: {
        control: this.registerFG.controls.email,
        message: ''
      },
      first_name: {
        control: this.registerFG.controls.first_name,
        message: ''
      },
      last_name: {
        control: this.registerFG.controls.last_name,
        message: ''
      },
      password: {
        control: this.registerFG.controls.password,
        message: ''
      },
      confirm: {
        control: this.registerFG.controls.confirm,
        message: ''
      }
    };
  }

  setHideTitle($event) {
    this.hideTitle = $event;
  }

  isNumber(num: number) {
    return !isNaN(num);
  }

  updateSchool($event) {
    this.school = $event;
  }

  lengthTooLong(maxLength: number): string {
    return 'Max length is ' + maxLength + ' characters';
  }

  handleInvalids() {
    // Check controls
    const controls = this.registerFG.controls;
    if (controls.email.invalid) {
      if (controls.email.errors.required) {
        this.formInvalids.email.message = 'Required';
      } else if (controls.first_name.errors.pattern) {
        this.formInvalids.first_name.message = 'Invalid characters detected';
      }
    }
    if (controls.first_name.invalid) {
      if (controls.first_name.errors.required) {
        this.formInvalids.first_name.message = 'Required';
      } else if (controls.first_name.errors.pattern) {
        this.formInvalids.first_name.message = 'Invalid characters detected';
      }
    }
    if (controls.first_name.invalid) {
      if (controls.first_name.errors.required) {
        this.formInvalids.first_name.message = 'Required';
      } else if (controls.first_name.errors.pattern) {
        this.formInvalids.first_name.message = 'Invalid characters detected';
      }
    }
    if (controls.password.invalid) {
      if (controls.password.errors.required) {
        this.formInvalids.password.message = 'Required';
      } else if (controls.password.errors.pattern) {
        this.formInvalids.password.message =
          'Password requires be at least 8 characters long, '
        + 'and include 1 upper-case, 1 lower-case, and 1 special character (!@#$%^&*()_+}{":;\'?/>.<,)';
      }
    }
    if (controls.confirm.invalid) {
      if (controls.password.errors.required) {
        this.formInvalids.confirm.message = 'Required';
      }
    }
  }

  register(): void {
    console.log('submitting');
    this.submitted = true;
    if (this.registerFG.invalid) {
      this.handleInvalids();
      console.log('invalid');
      console.log(this.registerFG.controls);
    } else {
      const values = this.registerFG.value;
      values.email += '@buffalo.edu';
      if (values.password !== values.confirm) {

      }
      // this.auth.register().subscribe((result) => {
//
  //    });
    }
  }

}
