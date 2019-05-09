import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SplashService} from '../../Views/splash/Service/splash.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../../Services/Authentication/Authentication/authentication.service';
import {SchoolFinderService} from '../../Form Fields/school-finder/Service/school-finder.service';

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
  @ViewChild('schoolFinder') schoolFinder: ElementRef;
  @ViewChild('error') error: ElementRef;

  constructor(private formBuilder: FormBuilder,
              private splashService: SplashService,
              private auth: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router,
              private schoolFinderService: SchoolFinderService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.school = params.school;
      if (this.school) {
        this.hideTitle = true;
      }
    });
    this.schoolFinderService.getExpanded().subscribe((expand) => {
      this.hideTitle = expand;
    });
    this.schoolFinderService.getSchoolInfo().subscribe((info) => {
      this.school = info.id;
    });

    this.registerFG = this.formBuilder.group({
      school: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9]{3,}')]],
      password: ['', [Validators.required, Validators.pattern(
        '(?=^.{8,100}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;\'?/>.<,])(?!.*\\s).*$')]],
      confirm: ['', Validators.required],
      first_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$')]],
      last_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$')]]
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

  isNumber(num: number) {
    return !isNaN(num);
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
    if (controls.last_name.invalid) {
      if (controls.last_name.errors.required) {
        this.formInvalids.last_name.message = 'Required';
      } else if (controls.last_name.errors.pattern) {
        this.formInvalids.last_name.message = 'Invalid characters detected';
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
      if (controls.confirm.errors.required) {
        this.formInvalids.confirm.message = 'Required';
      }
    }
  }

  register(): void {
    this.submitted = true;
    if (this.registerFG.invalid) {
      this.handleInvalids();
    } else {
      const values = this.registerFG.value;
      if (values.password !== values.confirm) {
        console.log('invalid passwords');
      } else {
        this.auth.register(values.school, values.email + '@buffalo.edu', values.password, values.first_name, values.last_name)
          .subscribe((res) => {
            console.log('Result: ' + res);
            if (res.code) {
              // Error:
              switch (res.code) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                default:
                  console.log('error: ' + res.code);
                  break;
              }
            }
            this.router.navigate(['/']).catch(() => this.displayMessage('Unexpected error!  This is on our end, please try again later'));
          });
      }
    }
  }

  displayMessage(msg: string): void {
    $(this.error).text(msg).addClass('display');
  }
}
