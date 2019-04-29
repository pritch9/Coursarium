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
  rpFormGroup: FormGroup;
  submitted = false;
  resetPasswordEmail = '';
  rpSlides;
  rpError;
  lError;
  @ViewChild('email') email: ElementRef;
  @ViewChild('password') password: ElementRef;
  @ViewChild('rp') resetPasswordRef: ElementRef;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthenticationService,
              private router: Router,
              private currentUserService: CurrentUserService) {
  }

  highlightInvalids(): void {
    if(this.formGroup.invalid) {
      if (this.formGroup.controls.email.invalid) {
        this.lError = 'Please enter your email address';
        $(this.email.nativeElement).addClass('invalid');
        setTimeout(() => {
          $(this.email.nativeElement).removeClass('invalid');
        }, 4000);
      }
      if (this.formGroup.controls.password.invalid) {
        this.lError = 'Please enter your password';
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
            this.lError = 'Incorrect email/password!';
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
    this.rpFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.rpSlides = $(this.resetPasswordRef.nativeElement).find('.container');
  }

  hideResetPassword() {
    $(this.resetPasswordRef.nativeElement).fadeOut("fast", () => {
      $(this.rpSlides[0]).addClass('show');
      $(this.rpSlides[1]).removeClass('show');
      $(this.rpSlides[2]).removeClass('show');
      this.resetPasswordEmail = '';
      this.rpFormGroup.controls.email.setValue('');
    });
  }

  forgotPassword() {
    $(this.resetPasswordRef.nativeElement).fadeIn("fast");
  }

  submitForgotPassword() {
    // Submit the forgotten password
    // if okay, show success
    // if not, show error message 'invalid email address'

    if(this.rpFormGroup.invalid) {
      if (this.rpFormGroup.controls.email.errors.required) {
        this.rpError = 'Please enter an email address';
      }
      if (this.rpFormGroup.controls.email.errors.email) {
        this.rpError = 'Please enter a valid email address';
      }
    } else {
      $(this.rpSlides[0]).removeClass('show');
      $(this.rpSlides[1]).addClass('show');
      this.authService.forgotPassword(this.rpFormGroup.value.email).subscribe(response => {
        $(this.rpSlides[1]).removeClass('show');
        if(!response.error) {
          // Success
          this.resetPasswordEmail = this.rpFormGroup.value.email;
          $(this.rpSlides[2]).addClass('show');
        } else {
          $(this.rpSlides[0]).addClass('show');
          this.rpError = 'Server error, please try again later';
        }
      });
    }
  }

}
