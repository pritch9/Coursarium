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
    this.submitted = true;
    if (this.formGroup.invalid) {
      this.highlightInvalids();
    } else {
      this.authService.login(this.formGroup.value.email, this.formGroup.value.password)
        .subscribe((result) => {
          if (result.error) {
            console.log('[Error] Code: ' + result.error);
          } else {
            // Logging in
            localStorage.setItem('sid', result.session_id);
            localStorage.setItem('user_id', result.user_id);
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
