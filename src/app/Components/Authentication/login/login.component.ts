import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../Services/Authentication/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthenticationService,
              private router: Router) {
  }

  highlightInvalids() {
    console.log('Form is invalid!');
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
            console.log('[Error] Code: ' + result.code);
          } else {
            // Logging in
            console.log('Storing data');
            localStorage.setItem('sid', result.session_id);
            localStorage.setItem('user_id', result.user_id);
            console.log('redirecting');
            const ignore = this.router.navigate(['/home']);
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

}
