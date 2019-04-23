import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../Services/Authentication/Authentication/authentication.service';
import {Router} from '@angular/router';
import {CurrentUserService} from '../../../Services/Users/CurrentUser/current-user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  submitted = false;
  @ViewChild('error') error: ElementRef;
  @ViewChild('email') email: ElementRef;
  @ViewChild('password') password: ElementRef;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthenticationService,
              private router: Router,
              private currentUserService: CurrentUserService) {
  }

  highlightInvalids(): void {
    if(this.formGroup.invalid) {
      if (this.formGroup.controls.email.invalid) {
        $(this.email.nativeElement).addClass('invalid');
        setTimeout(() => {
          $(this.email.nativeElement).removeClass('invalid');
        }, 4000);
      }
      if (this.formGroup.controls.password.invalid) {
        $(this.password.nativeElement).addClass('invalid');
        setTimeout(() => {
          $(this.password.nativeElement).removeClass('invalid');
        }, 4000);
      }
    }
  }

  submit() {
    console.log('submitting');
    this.submitted = true;
    if (this.formGroup.invalid) {
      this.highlightInvalids();
    } else {
      this.authService.login(this.formGroup.value.email, this.formGroup.value.password)
        .subscribe((result) => {
          console.log('Result: ' + JSON.stringify(result));
          if (result.code) {
            $(this.error.nativeElement).html('Incorrect email/password!');
          } else {
            // Logging in
            console.log('Storing data');
            localStorage.setItem('sid', result.session_id);
            localStorage.setItem('user_id', result.user_id);
            this.currentUserService.findCurrentUser();
            console.log('redirecting');
            this.router.navigate(['/']).catch(err => console.log(err));
          }
        });
    }
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  forgotPassword() {
    // Show forgot password popup
    //
  }

  submitForgotPassword() {
    // Submit the forgotten password
    // if okay, show success
    // if not, show error message 'invalid email address'
  }

}
